// Checks the sandboxed capture in a real browser: node tests/capture.mjs (needs `npm i playwright`).
// It serves this folder itself and needs internet for the CDN scripts and the outside resources.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const html = readFileSync(new URL('../index.html', import.meta.url));
const server = createServer((req, res) => { res.setHeader('content-type', 'text/html'); res.end(html); }).listen(0, '127.0.0.1');
const browser = await chromium.launch();
const page = await browser.newPage({ acceptDownloads: true });
const logs = [];
page.on('console', (m) => logs.push(m.text()));
page.on('dialog', (d) => d.dismiss());
await page.goto(`http://127.0.0.1:${server.address().port}/`);

async function capture(code) {
  await page.fill('#codeInput', code);
  await page.click('#btnUpdatePreview');
  await page.waitForTimeout(2500);
  const download = page.waitForEvent('download', { timeout: 20000 }).catch(() => null);
  await page.click('#btnCapture');
  const file = await download;
  return file && readFileSync(await file.path());
}
const isPng = (buf) => buf && buf.subarray(1, 4).toString() === 'PNG';

// The previewed page runs its scripts but can't reach this page.
assert.ok(isPng(await capture('<h1>Hi</h1><script>try { console.log("parent:" + parent.document.title) } catch { console.log("parent:blocked") }</script>')));
assert.ok(logs.includes('parent:blocked'), 'the preview could read the tool page');
assert.equal(await page.getAttribute('#previewIframe', 'sandbox'), 'allow-scripts');

// Outside fonts, images without CORS and broken images don't stop a capture.
assert.ok(isPng(await capture('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"><h1 style="font-family:Lobster">Font</h1>')));
assert.ok(isPng(await capture('<img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png">')));
assert.ok(isPng(await capture('<h1>Broken</h1><img src="https://example.com/missing.png">')));

// A reply that isn't a PNG is refused.
assert.equal(await capture(`<script>addEventListener('message', (e) => { if (e.data?.type === 'htmltopng:capture') { e.stopImmediatePropagation(); parent.postMessage({ type: 'htmltopng:png', id: e.data.id, url: 'javascript:alert(1)' }, '*'); } }, true);</script>`), null);

// Text mode still uses html2canvas on this page.
assert.ok(isPng(await capture('just text')));

await browser.close();
server.close();
console.log('ok: sandboxed capture');
