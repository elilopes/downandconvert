import { execa } from 'execa';
import youtubedl from 'youtube-dl-exec';
import fs from 'fs';

async function run() {
  const subprocess = youtubedl.exec('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
    o: '-',
    f: 'best'
  });
  
  subprocess.stdout.pipe(fs.createWriteStream('test.mp4'));
  
  setTimeout(() => {
    subprocess.kill();
    console.log('Finished stream test');
    process.exit(0);
  }, 3000);
}
run();
