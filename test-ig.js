import youtubedl from 'youtube-dl-exec';

async function run() {
  try {
    const output = await youtubedl('https://www.tiktok.com/@tiktok/video/7106594312292453675', {
      dumpJson: true,
      noWarnings: true,
      noCheckCertificate: true,
    });
    console.log("TikTok success:", output.title);
  } catch (e) {
    console.error("TikTok failed:", e.message);
  }
}
run();
