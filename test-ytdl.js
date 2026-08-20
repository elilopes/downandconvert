import youtubedl from 'youtube-dl-exec';
async function run() {
  try {
    const output = await youtubedl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
      dumpJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true
    });
    console.log(output.title);
  } catch (e) {
    console.error(e);
  }
}
run();
