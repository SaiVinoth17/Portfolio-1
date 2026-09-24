import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('.next/server/app/index.html', 'utf8');
const scripts = [...content.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);

for (const s of scripts) {
  const rel = s.replace(/^\/_next\//, '.next/');
  if (!fs.existsSync(rel)) continue;
  const chunkContent = fs.readFileSync(rel, 'utf8');
  
  // Find key exports, package identifiers, component names
  const keywords = [];
  if (chunkContent.includes('lucide')) keywords.push('lucide-react');
  if (chunkContent.includes('gsap') || chunkContent.includes('ScrollTrigger')) keywords.push('gsap');
  if (chunkContent.includes('framer') || chunkContent.includes('motion')) keywords.push('framer-motion');
  if (chunkContent.includes('lenis')) keywords.push('lenis');
  if (chunkContent.includes('three')) keywords.push('three.js');
  if (chunkContent.includes('react-dom')) keywords.push('react-dom');
  if (chunkContent.includes('AevionAI')) keywords.push('AevionAI');
  if (chunkContent.includes('CommandPalette')) keywords.push('CommandPalette');
  if (chunkContent.includes('DeveloperTerminal')) keywords.push('DeveloperTerminal');
  if (chunkContent.includes('PerformanceDashboard')) keywords.push('PerformanceDashboard');
  if (chunkContent.includes('StudioMetrics')) keywords.push('StudioMetrics');
  if (chunkContent.includes('EasterEggs')) keywords.push('EasterEggs');
  if (chunkContent.includes('Globe')) keywords.push('Globe');
  if (chunkContent.includes('LandingPage') || chunkContent.includes('ScrollGlobe')) keywords.push('ScrollGlobe/LandingPage');
  if (chunkContent.includes('Manifesto')) keywords.push('ManifestoSection');
  if (chunkContent.includes('Founders')) keywords.push('FoundersSection');
  if (chunkContent.includes('SelectedWork')) keywords.push('SelectedWorkSection');
  if (chunkContent.includes('JourneyTimeline')) keywords.push('JourneyTimelineSection');
  if (chunkContent.includes('Capabilities')) keywords.push('CapabilitiesSection');
  
  const size = (chunkContent.length / 1024).toFixed(1);
  console.log(`Chunk: ${path.basename(rel)} (${size} KiB) -> Identifiers: [${keywords.join(', ')}]`);
}
