import fs from 'fs';
import path from 'path';

const chunkFiles = ['01baa126fa4dd766.js', '773aaabe63b51d54.js', 'd301321ff45e2923.js'];

for (const file of chunkFiles) {
  const p = path.join('.next', 'static', 'chunks', file);
  if (!fs.existsSync(p)) {
    console.log(file, 'not found');
    continue;
  }
  const content = fs.readFileSync(p, 'utf8');
  console.log('=== FILE:', file, 'Size:', content.length, '===');
  
  // Look for identifiable strings, package names, component names
  const strings = [];
  const re = /"([^"\\]{4,100})"/g;
  let match;
  const counts = {};
  while ((match = re.exec(content)) !== null) {
    const s = match[1];
    if (s.includes('/') || s.includes('Section') || s.includes('Component') || s.includes('three') || s.includes('gsap') || s.includes('lenis') || s.includes('framer') || s.includes('lucide') || s.includes('earth') || s.includes('Hero')) {
      counts[s] = (counts[s] || 0) + 1;
    }
  }
  console.log('Top keywords/paths:', Object.entries(counts).slice(0, 30));
}
