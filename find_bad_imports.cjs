const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
const badModules = ['fs', 'path', 'child_process', 'crypto', 'os', 'util', 'vite', 'express', 'rollup', 'tsx', 'btch-downloader'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  badModules.forEach(mod => {
    const regex1 = new RegExp(`from\\s+['"]${mod}['"]`, 'g');
    const regex2 = new RegExp(`require\\(['"]${mod}['"]\\)`, 'g');
    if (regex1.test(content) || regex2.test(content)) {
      console.log(`BAD IMPORT FOUND in ${file}: ${mod}`);
    }
  });
});
console.log("Done checking imports.");
