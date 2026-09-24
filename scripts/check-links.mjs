import fs from 'fs';

const content = fs.readFileSync('.next/server/app/index.html', 'utf8');
const links = [...content.matchAll(/<link[^>]+>/g)].map(m => m[0]);
console.log('All link tags:');
links.forEach(l => console.log(l));
