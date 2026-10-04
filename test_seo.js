const html = `    <title>Down&Convert - baixe mídias da web ou converta áudios/vídeos free, mais USSD e gadgets</title>
    <meta name="description" content="Baixe mídias das redes sociais; converta vários formatos; códigos secretos do celular; notícias de gadgets e invenções; análise de celulares; crop de vídeo. by TechViva!" />
    <meta property="og:title" content="Down&Convert - Conversor de ádios/vídeos online" />
    <meta property="og:description" content="Baixe mídias das redes sociais; converta vários formatos; códigos secretos do celular; notícias de gadgets e invenções; análise de celulares; crop de vídeo. by TechViva!" />
`;

const title = "Acer Liquid E700";
const description = "Confira a ficha técnica do Acer Liquid E700";

const replaced = html
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(/<meta\s+name=["']description["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta name="description" content="${description}" />`)
      .replace(/<meta\s+property=["']og:title["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta\s+property=["']og:description["']\s+content=["'][^"]*["']\s*\/?>/i, `<meta property="og:description" content="${description}" />`);

console.log(replaced);
