import fs from 'fs';
import path from 'path';

function findHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtml(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = findHtml('.next/server/app');
console.log('Found HTML files:', htmlFiles);

const indexHtml = htmlFiles.find(f => f.endsWith('index.html') || f.endsWith('page.html'));
if (indexHtml) {
  const content = fs.readFileSync(indexHtml, 'utf8');
  const scripts = [...content.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  console.log('Homepage scripts:');
  let totalBytes = 0;
  for (const s of scripts) {
    const rel = s.replace(/^\/_next\//, '.next/');
    let size = 0;
    if (fs.existsSync(rel)) {
      size = fs.statSync(rel).size;
      totalBytes += size;
    }
    console.log(s, `(${(size / 1024).toFixed(1)} KiB)`);
  }
  console.log('Total homepage script payload:', (totalBytes / 1024).toFixed(1), 'KiB');
}
