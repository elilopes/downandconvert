import { createServer } from 'vite';
import fs from 'fs';
async function run() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  const template = fs.readFileSync('index.html', 'utf-8');
  const transformed = await vite.transformIndexHtml('/acer-liquid-e700', template);
  console.log(transformed);
  process.exit(0);
}
run();
