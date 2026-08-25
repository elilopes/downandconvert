import youtubedl from 'youtube-dl-exec';
youtubedl('https://www.instagram.com/reel/DXZrHcoDqBm/', {
  dumpJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
  addHeader: ['Cookie: sessionid=12345;']
}).then(output => console.log(output.url || (output.requested_formats && output.requested_formats[0].url))).catch(console.error);
