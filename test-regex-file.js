import fs from 'fs';
const html = fs.readFileSync('test_dev_html.html', 'utf-8');
const title = "Acer Liquid E700";
const description = "Confira a ficha técnica do Acer Liquid E700";

const replaced = html
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta\s+name=["']description["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta name="description" content="${description}" />`)
      .replace(/<meta\s+property=["']og:title["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta\s+property=["']og:description["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta property="og:description" content="${description}" />`);

const matches = replaced.match(/<title>.*?<\/title>|<meta.*description/gi);
console.log(matches);
