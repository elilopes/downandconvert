import youtubedl from 'youtube-dl-exec';

async function run() {
  try {
    const output = await youtubedl('https://vimeo.com/90625348', {
      dumpJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
    });
    console.log("Vimeo success:", output.title);
  } catch (e) {
    console.error("Vimeo failed:", e.message);
  }
}
run();
