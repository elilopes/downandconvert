const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');

async function test() {
  try {
    console.log("Testing ytSearch...");
    const r = await ytSearch("never gonna give you up");
    console.log("Search success, found:", r.videos.length, "videos. First:", r.videos[0].title);
  } catch (e) {
    console.error("Search failed:", e.message);
  }

  try {
    console.log("\nTesting ytdl-core info...");
    const info = await ytdl.getBasicInfo("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    console.log("Info success:", info.videoDetails.title);
  } catch (e) {
    console.error("Info failed:", e.message);
  }
}
test();
