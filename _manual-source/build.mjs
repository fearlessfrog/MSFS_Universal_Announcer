import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../manual');
const require = createRequire(import.meta.url);
// Optional bundled-runtime dependency directory; normal installs use npm ci.
const dependencyRoot = process.env.MANUAL_NODE_MODULES;
const dep = name => dependencyRoot ? require(path.join(dependencyRoot, name)) : require(name);
const { marked } = dep('marked');
const { chromium } = dep('playwright');
for (const [name, version] of Object.entries(JSON.parse(await fs.readFile(path.join(here, 'package.json'), 'utf8')).dependencies)) {
  const pkg = dependencyRoot ? require(path.join(dependencyRoot, name, 'package.json')) : require(name + '/package.json');
  if (pkg.version !== version) throw Error(`${name}: expected ${version}, found ${pkg.version}`);
}
const metadata = JSON.parse(await fs.readFile(path.join(here, 'metadata.json'), 'utf8'));
const source = await fs.readFile(path.join(here, 'manual.md'), 'utf8');
const escape = value => String(value).replace(/[&<>\"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sections = source.split(/^<!-- page: ([a-z0-9-]+) \| (.+) -->\r?$/m);
if (sections[0].trim()) throw Error('Manual must start with a page marker.');
const pages = [];
const missing = [];
await fs.mkdir(path.join(out, 'assets'), { recursive: true });
for (let i = 1; i < sections.length; i += 3) {
  const [id, chapter, raw] = sections.slice(i, i + 3);
  let text = raw;
  for (const shot of metadata.screenshots) {
    const token = `<!-- screenshot: ${shot.id} -->`;
    if (!text.includes(token)) continue;
    const input = path.join(here, 'screenshots', shot.file);
    let figure = '';
    try {
      await fs.access(input);
      await fs.copyFile(input, path.join(out, 'assets', shot.file));
      figure = `<figure class="screenshot screenshot--${shot.id}" style="--print-image-width:${Number(shot.printWidthMm) || 165}mm"><img src="assets/${shot.file}" alt="${escape(shot.caption)}"><figcaption>${escape(shot.caption)} <a class="screen-only" href="assets/${shot.file}" target="_blank" rel="noopener">View full size</a></figcaption></figure>`;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      missing.push(shot.file);
    }
    text = text.replace(token, figure);
  }
  if (/<!-- screenshot:/.test(text)) throw Error(`Unknown screenshot in ${id}`);
  let html = marked.parse(text);
  if (pages.length === 0) html = html.replace('<!-- metadata -->', `<p class="edition">App ${escape(metadata.appVersion)} | Revision ${escape(metadata.revision)}${metadata.status ? `<br>${escape(metadata.status)}` : ''}</p>`);
  pages.push({ id, chapter, html });
}
if (new Set(pages.map(p => p.id)).size !== pages.length) throw Error('Duplicate section IDs');
const toc = pages.slice(1).map((p, i) => `<a href="#${p.id}"><span>${escape(p.chapter)}</span><span class="page-number">${i + 2}</span></a>`).join('');
pages[0].html = pages[0].html.replace('<!-- contents -->', `<nav class="contents" aria-label="Contents">${toc}</nav>`);
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Installation, flight steps, sound packs, camera volumes and generated announcements for Universal Announcer."><title>${escape(metadata.title)}</title><link rel="stylesheet" href="assets/manual.css"></head>
<body><a class="skip" href="#getting-started">Skip to getting started</a><header class="screen-bar"><a href="#cover">Universal Announcer</a><nav aria-label="Manual actions"><a href="#contents-title">Contents</a><a href="UniversalAnnouncer-User-Manual.pdf" download>Download PDF</a></nav></header><main>
${pages.map((p, i) => `<section class="sheet ${i === 0 ? 'cover' : ''}" id="${p.id}" aria-label="${escape(p.chapter)}"><div class="eyebrow">${i === 0 ? 'USER MANUAL' : escape(p.chapter)}</div>${p.html}<a class="back" href="#contents-title">Back to contents</a></section>`).join('\n')}
</main><footer class="screen-footer">Universal Announcer ${escape(metadata.appVersion)} | ${escape(metadata.revision)}</footer></body></html>`;
await fs.writeFile(path.join(out, 'index.html'), html);
await fs.copyFile(path.join(here, 'manual.css'), path.join(out, 'assets/manual.css'));
const browser = await chromium.launch({ headless: true });
const checks = { appVersion: metadata.appVersion, revision: metadata.revision, browser: browser.version(), missingScreenshots: missing, sections: pages.length, sourceCommit: metadata.sourceCommit, checks: [] };
try {
  const page = await browser.newPage();
  const remoteRequests = [];
  await page.route(/^https?:/, route => { remoteRequests.push(route.request().url()); return route.abort(); });
  await page.goto(pathToFileURL(path.join(out, 'index.html')).href);
  await page.evaluate(() => document.fonts.ready);
  const problems = await page.evaluate(() => {
    const errors = [];
    for (const a of document.querySelectorAll('a[href^="#"]')) if (!document.getElementById(a.hash.slice(1))) errors.push(`Broken anchor ${a.hash}`);
    for (const image of document.images) if (!image.complete || !image.naturalWidth) errors.push(`Broken image ${image.src}`);
    return errors;
  });
  if (problems.length || remoteRequests.length) throw Error([...problems, ...remoteRequests].join('\n'));
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (overflowing) throw Error(`Horizontal overflow at ${width}px`);
    checks.checks.push(`Offline HTML, anchors, images and width ${width}px: pass`);
  }
  await page.emulateMedia({ media: 'print' });
  const pageHeights = await page.locator('.sheet').evaluateAll(nodes => nodes.map(n => ({ id: n.id, mm: n.getBoundingClientRect().height * 25.4 / 96 })));
  checks.printSectionHeightsMm = pageHeights;
  const oversized = pageHeights.filter(p => p.mm > 260);
  if (oversized.length) throw Error(`Sections exceed printable page height: ${JSON.stringify(oversized)}`);
  if (!process.argv.includes('--check-only')) {
    await page.pdf({ path: path.join(out, 'UniversalAnnouncer-User-Manual.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true, displayHeaderFooter: true,
      headerTemplate: '<span></span>', footerTemplate: `<div style="font-family:Arial;font-size:8px;color:#667078;width:100%;padding:0 19mm;display:flex;justify-content:space-between"><span>UNIVERSAL ANNOUNCER | ${escape(metadata.appVersion)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>` });
  }
  await fs.writeFile(path.join(here, 'build-report.json'), JSON.stringify(checks, null, 2) + '\n');
  console.log(JSON.stringify({ output: out, sections: pages.length, missingScreenshots: missing.length, browser: checks.browser }));
} finally { await browser.close(); }
