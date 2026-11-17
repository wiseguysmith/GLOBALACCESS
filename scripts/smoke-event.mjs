import assert from 'node:assert/strict';
const origin=process.env.EVENT_SMOKE_ORIGIN || 'http://127.0.0.1:3000';
const event='/invitation/experiences/the-global-invitation-san-antonio-2027';
const routes=['/', '/invitation',event,...['summit','sponsor','vendor','general','future'].map(k=>`/invitation/inquire/${k}`),'/invitation/event-terms','/invitation/registration/pay','/invitation/registration/return','/south','/digital','/capital'];
for(const path of routes) { const response=await fetch(origin+path); assert.equal(response.status,200,path); const html=await response.text(); assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`one h1: ${path}`); console.log(`PASS 200 + one heading: ${path}`); }
for(const path of ['/invitation/membership','/invitation/apply']) { const response=await fetch(origin+path,{redirect:'manual'}); assert.equal(response.status,301,path); console.log(`PASS 301: ${path}`); }
assert.equal((await fetch(origin+'/invitation/inquire/unknown')).status,404);
for(const path of ['teams','pay','leads']) { const response=await fetch(`${origin}/api/event/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}); assert.equal(response.status,503,`${path} stays closed with absent credentials`); console.log(`PASS fail-closed: ${path}`); }
assert.equal((await fetch(origin+'/api/event/admin',{method:'POST',body:'{}'})).status,401);
assert.equal((await fetch(origin+'/api/event/stripe',{method:'POST',body:'{}'})).status,503);
const html=await(await fetch(origin+event)).text();
assert.ok(html.includes('$10,000')); assert.ok(html.includes('February 3')); assert.ok(html.includes('February 4'));
assert.ok(html.includes('60 golfer beds')); assert.ok(!html.includes('guaranteed $100,000'));
console.log('PASS public copy, admin protection, webhook unavailable, unknown route');
