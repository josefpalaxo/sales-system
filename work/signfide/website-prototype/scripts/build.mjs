import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { pages } from '../src/pages.mjs';
import { layout } from '../src/layout.mjs';
import { checkHtml, checkRuntimeSource } from './link-policy.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const out = join(root, 'dist');
  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, 'assets/fonts'), { recursive: true });
  for (const name of ['styles.css', 'app.js', 'favicon.svg']) {
    await cp(join(root, 'src', name), join(out, 'assets', name));
  }
  for (const family of ['newsreader', 'inter']) {
    const base = join(root, 'node_modules/@fontsource-variable', family);
    await cp(join(base, 'files', `${family}-latin-wght-normal.woff2`), join(out, 'assets/fonts', `${family}.woff2`));
    await cp(join(base, 'LICENSE'), join(out, 'assets/fonts', `${family}-LICENSE.txt`));
  }
  for (const [route, page] of Object.entries(pages)) {
    // Every route receives actual HTML; no client-side routing fallback is required.
    const folder = join(out, route);
    await mkdir(folder, { recursive: true });
    await writeFile(join(folder, 'index.html'), layout(route, page));
  }
  await writeFile(join(out, '404.html'), layout('/404', { title: 'Page not found', description: 'Find your way back to Signfide.', content: '<section class="container page-intro"><p>Page not found</p><h1>Let’s get you<br>back on track.</h1><a class="button" href="/">Go to homepage <span aria-hidden="true">↗</span></a></section>' }));
  await cp(join(root, 'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2'), join(out, 'assets/fonts/newsreader-italic.woff2'));
  // Fail the build for accidental external runtime dependencies or absent local assets.
  for (const [route, page] of Object.entries(pages)) {
    const html = await readFile(join(out, route, 'index.html'), 'utf8');
    checkHtml(html, route);
    if (!page.title || !page.description) throw new Error(`Missing metadata: ${route}`);
  }
  checkHtml(await readFile(join(out, '404.html'), 'utf8'), '/404');
  for (const name of ['styles.css', 'app.js']) checkRuntimeSource(await readFile(join(out, 'assets', name), 'utf8'), name);
  console.log(`Built ${Object.keys(pages).length} routes with local fonts and assets → dist/`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
