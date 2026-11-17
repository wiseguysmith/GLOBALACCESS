import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { obligations, validateGolfers, teamStatus } from '../src/lib/registration/model.ts';
import { validateLead } from '../src/lib/registration/leads.ts';

async function database() {
  const db = new PGlite();
  await db.exec('create role anon; create role authenticated; create role service_role;');
  await db.exec(await readFile(new URL('../supabase/event-registration.sql', import.meta.url), 'utf8'));
  return db;
}
const golfers = [{name:'Test Captain',email:'captain@example.test'}, {name:'Test Teammate',email:'teammate@example.test'}];
async function reserve(db, key, mode='split') { return (await db.query('select public.reserve_event_team($1,$2,$3::jsonb,$4) as team',[key,mode,JSON.stringify(golfers),'test-policy'])).rows[0].team; }
async function payments(db,team) { return (await db.query('select * from event_payments where team_id=$1 order by player',[team.id])).rows; }
async function apply(db,p,event,state='paid') { return (await db.query('select public.apply_event_payment($1,$2,$3,$4,$5,$6) as status',[event,p.id,`cs_${p.id}`,`pi_${p.id}`,state,p.amount])).rows[0].status; }

test('server prices and input validation match owner offer', () => {
  assert.deepEqual(obligations('full'),[1000000]); assert.deepEqual(obligations('split'),[500000,500000]);
  assert.equal(validateGolfers(golfers),true); assert.equal(validateGolfers([golfers[0],golfers[0]]),false);
  assert.equal(teamStatus([{amount:500000,status:'paid'}],1000000,'HELD_PENDING_PAYMENT'),'PARTIALLY_PAID');
  assert.equal(teamStatus([{amount:1000000,status:'paid'}],1000000,'EXPIRED'),'MANUAL_REVIEW');
});
test('lead category fields, separate sharing consent, no arbitrary options', () => {
  const {errors,output}=validateLead('summit',{name:'Test',email:'test@example.test',phone:'123456789',organization:'Test Co',role:'Founder',title:'CEO',interest:'Private markets',consent:true});
  assert.deepEqual(errors,{}); assert.equal(output.sponsorSharing,false);
  assert.ok(validateLead('sponsor',{name:'Test',email:'test@example.test',organization:'Test',role:'Lead',interest:'invented',edition:'Both',message:'Hi',consent:true}).errors.interest);
});
test('full payment creates one team, exactly two unique included admissions; replay cannot duplicate', async () => {
  const db=await database(); try {
    const team=await reserve(db,'full','full'); const [p]=await payments(db,team);
    assert.equal(await apply(db,p,'evt-full'),'PAID_CONFIRMED');
    assert.equal(await apply(db,p,'evt-full'),'duplicate');
    assert.equal(await apply(db,p,'evt-full-again'),'PAID_CONFIRMED');
    const rows=(await db.query('select * from event_admissions')).rows;
    assert.equal(rows.length,2); assert.ok(rows.every(a=>a.vip && a.summit && a.active));
    assert.equal((await db.query("select * from event_outbox where kind='confirmed'")).rows.length,2);
  } finally { await db.close(); }
});
test('linked halves and ACH settle one team only after all funds clear; old failures cannot regress paid', async () => {
  const db=await database(); try {
    const team=await reserve(db,'split'); const [a,b]=await payments(db,team);
    assert.equal(await apply(db,a,'evt-half'),'PARTIALLY_PAID');
    assert.equal((await db.query('select * from event_admissions')).rows.length,0);
    assert.equal(await apply(db,b,'evt-ach','processing'),'PAYMENT_PROCESSING');
    assert.equal((await db.query('select * from event_admissions')).rows.length,0);
    assert.equal(await apply(db,b,'evt-ach-settled'),'PAID_CONFIRMED');
    assert.equal(await apply(db,b,'evt-old-failure','failed'),'PAID_CONFIRMED');
    assert.equal((await db.query('select * from event_admissions')).rows.length,2);
  } finally { await db.close(); }
});
test('inventory caps all simultaneous holds at 40; retry reuses existing team', async () => {
  const db=await database(); try {
    const first=await reserve(db,'team-0'); assert.equal((await reserve(db,'team-0')).id,first.id);
    const results=await Promise.allSettled(Array.from({length:40},(_,i)=>reserve(db,`team-${i+1}`)));
    assert.equal(results.filter(r=>r.status==='fulfilled').length,39);
    assert.equal(results.filter(r=>r.status==='rejected').length,1);
    assert.equal(Number((await db.query('select count(*) as n from event_teams')).rows[0].n),40);
  } finally { await db.close(); }
});
test('expired partial team stays in inventory and enters review; no accidental release or passes', async () => {
  const db=await database(); try {
    const team=await reserve(db,'partial'); const [a,b]=await payments(db,team);
    await apply(db,a,'evt-paid');
    assert.equal(await apply(db,b,'evt-expired','expired'),'MANUAL_REVIEW');
    await db.query("update event_teams set expires_at=now()-interval '1 hour'");
    await db.query('select public.release_unattached_holds()');
    assert.equal((await db.query('select status from event_teams')).rows[0].status,'MANUAL_REVIEW');
    assert.equal((await db.query('select * from event_admissions')).rows.length,0);
  } finally { await db.close(); }
});
test('mismatched amounts roll back webhook ID and cannot confirm; refunds suspend both admissions', async () => {
  const db=await database(); try {
    const team=await reserve(db,'refund','full'); const [p]=await payments(db,team);
    await assert.rejects(db.query('select public.apply_event_payment($1,$2,$3,$4,$5,$6)',['bad',p.id,'cs_bad','pi_bad','paid',1]));
    assert.equal((await db.query('select * from event_stripe_events')).rows.length,0);
    await apply(db,p,'paid'); assert.equal(await apply(db,p,'refund','refund_pending'),'REFUND_PENDING');
    assert.ok((await db.query('select * from event_admissions')).rows.every(a=>!a.active));
    assert.equal(await apply(db,p,'late-success'),'REFUND_PENDING');
  } finally { await db.close(); }
});
test('lead record and outbox commit together; public roles cannot read or call functions', async () => {
  const db=await database(); try {
    await db.query('select public.save_event_lead($1,$2::jsonb,$3)',['vendor',JSON.stringify({email:'test@example.test',name:'Test'}),'staff@example.test']);
    assert.equal((await db.query('select * from event_leads')).rows.length,1);
    assert.equal((await db.query('select * from event_outbox')).rows.length,2);
    await db.exec('set role anon');
    await assert.rejects(db.query('select * from public.event_teams'));
    await assert.rejects(reserve(db,'unauthorized'));
  } finally { await db.close(); }
});
test('Summit approval creates one restricted order, settles one admission, and cannot be replayed', async () => {
  const db=await database(); try {
    const lead=(await db.query('select public.save_event_lead($1,$2::jsonb,$3) as id',['summit',JSON.stringify({email:'summit@example.test',name:'Summit Test'}),'staff@example.test'])).rows[0].id;
    const approve=async()=>(await db.query('select public.approve_summit_lead($1) as id',[lead])).rows[0].id;
    const order=await approve(); assert.equal(await approve(),order);
    const applySummit=async(event,state)=>(await db.query('select public.apply_summit_payment($1,$2,$3,$4,$5) as status',[event,order,'cs_summit',state,120000])).rows[0].status;
    assert.equal(await applySummit('summit-processing','processing'),'processing');
    assert.equal((await db.query('select admission_id from event_summit_orders')).rows[0].admission_id,null);
    assert.equal(await applySummit('summit-paid','paid'),'paid');
    const admission=(await db.query('select admission_id from event_summit_orders')).rows[0].admission_id;
    assert.ok(admission); assert.equal(await applySummit('summit-paid','paid'),'duplicate');
    assert.equal(await applySummit('summit-paid-again','paid'),'paid');
    assert.equal((await db.query('select admission_id from event_summit_orders')).rows[0].admission_id,admission);
    assert.equal((await db.query("select * from event_outbox where kind='summit_confirmed'")).rows.length,1);
    assert.equal((await db.query('select * from event_admissions')).rows.length,0);
    assert.equal(await applySummit('summit-refund','review'),'review');
    assert.equal(await applySummit('summit-late-success','paid'),'review');
  } finally { await db.close(); }
});
test('unattached unpaid holds release, attached holds stay reserved until processor reconciliation', async () => {
  const db=await database(); try {
    const a=await reserve(db,'unattached'); const b=await reserve(db,'attached');
    await db.query("update event_teams set expires_at=now()-interval '1 hour'");
    await db.query("update event_payments set session_id='cs_attached' where team_id=$1 and player=0",[b.id]);
    await db.query('select public.release_unattached_holds()');
    assert.equal((await db.query('select status from event_teams where id=$1',[a.id])).rows[0].status,'EXPIRED');
    assert.equal((await db.query('select status from event_teams where id=$1',[b.id])).rows[0].status,'HELD_PENDING_PAYMENT');
  } finally { await db.close(); }
});
