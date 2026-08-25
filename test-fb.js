import youtubedl from 'youtube-dl-exec';
youtubedl('https://www.facebook.com/alvesofc/videos/brasil-dance-90s-dance-eurodance/937944018647786/', {
  dumpJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
}).then(output => console.log(output.url || (output.requested_formats && output.requested_formats[0].url))).catch(console.error);
