// Regenerates the 1200x630 social images in public/og.
// Usage: npm run build && npm start (in another terminal), then: npm run og
const { chromium } = require('playwright');
const items = [
  { file: 'global', eyebrow: 'Global Access Ecosystem', title: 'Bridging Worlds.', accentLine: 'Expanding Access.', img: 'hero-horizon', accent: '#C7A66D' },
  { file: 'invitation', eyebrow: 'Global Invitation', title: 'Access Begins', accentLine: 'With Connection.', img: 'banquet', accent: '#C7A66D' },
  { file: 'event', eyebrow: 'San Antonio · February 2027', title: 'The Global Invitation', accentLine: 'Real relationships.', img: 'event-golf', accent: '#C7A66D' },
  { file: 'south', eyebrow: 'Global South Access · GSA', title: 'Connecting Markets.', accentLine: 'Unlocking Potential.', img: 'andes-city', accent: '#7FA894' },
  { file: 'digital', eyebrow: 'Global Digital Access · GDA', title: 'Physical Value.', accentLine: 'Digital Infrastructure.', img: 'grid', accent: '#86A9CB' },
  { file: 'capital', eyebrow: 'Global Capital Network · GCN', title: 'Where Capital', accentLine: 'Relationships Begin.', img: 'towers', accent: '#B9C0CC' },
  { file: 'forum', eyebrow: 'Global Forum', title: 'Ideas That', accentLine: 'Cross Borders.', img: 'library', accent: '#D9A595' },
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto(process.env.OG_BASE_URL || 'http://localhost:3000/', { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  for (const it of items) {
    await p.evaluate((it) => {
      document.body.innerHTML = `
      <div style="position:fixed;inset:0;width:1200px;height:630px;background:#101E30;overflow:hidden;font-family:var(--font-manrope);z-index:9999">
        <img src="/images/${it.img}.webp" style="position:absolute;right:0;top:0;width:720px;height:630px;object-fit:cover"/>
        <div style="position:absolute;inset:0;background:linear-gradient(90deg,#101E30 38%,rgba(16,30,48,.82) 60%,rgba(16,30,48,.25) 100%)"></div>
        <div style="position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;color:#fff">
          <svg viewBox="0 0 40 28" width="46" height="32"><circle cx="14" cy="14" r="12" fill="none" stroke="#fff" stroke-width="1.25"/><circle cx="26" cy="14" r="12" fill="none" stroke="#fff" stroke-width="1.25"/><path d="M20 3.6a12 12 0 0 1 0 20.8 12 12 0 0 1 0-20.8Z" fill="#C7A66D"/></svg>
          <span style="font-weight:600;letter-spacing:.32em;font-size:22px">GLOBAL</span>
        </div>
        <div style="position:absolute;left:72px;bottom:140px;right:260px">
          <div style="display:flex;align-items:center;gap:14px;color:${it.accent};font-family:var(--font-inter);font-weight:600;font-size:15px;letter-spacing:.22em;text-transform:uppercase"><span style="width:40px;height:1px;background:${it.accent}"></span>${it.eyebrow}</div>
          <div style="margin-top:26px;color:#fff;font-size:76px;line-height:1;font-weight:500;letter-spacing:-.04em">${it.title}</div>
          <div style="margin-top:6px;color:${it.accent};font-family:var(--font-newsreader);font-style:italic;font-size:72px;line-height:1.08;letter-spacing:-.02em">${it.accentLine}</div>
        </div>
        <div style="position:absolute;left:72px;bottom:58px;color:rgba(255,255,255,.6);font-family:var(--font-inter);font-size:18px;letter-spacing:.04em">globalaccess.live</div>
      </div>`;
    }, it);
    await p.evaluate(() => Promise.all(Array.from(document.images).map(i => i.complete ? 1 : new Promise(r => { i.onload = r; i.onerror = r; }))));
    await p.waitForTimeout(200);
    await p.screenshot({ path: `public/og/${it.file}.jpg`, type: 'jpeg', quality: 86 });
  }
  await b.close();
})();
