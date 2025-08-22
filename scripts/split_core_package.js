const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../knowledge/core_knowledge_package.md');
const outDir = path.resolve(__dirname, '../knowledge/books');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const text = fs.readFileSync(src, 'utf8');

// Split by top-level numbered sections like "1. ", "2. ", etc.
// Keep the leading number with the section by splitting on a newline followed by digits and dot
const parts = text.split(/\n(?=\d+\.\s)/g);

// First part is preface/title; write as Intro.md
if (parts.length > 0) {
  const intro = parts[0].trim();
  if (intro) {
    fs.writeFileSync(path.join(outDir, '00_Intro_Core_Knowledge_Package.md'), intro + '\n');
  }
}

for (let i = 1; i < parts.length; i++) {
  const part = parts[i].trim();
  // Extract the numeric prefix and the title up to a newline
  const firstLineMatch = part.match(/^([0-9]+)\.\s*(.+)/);
  let num = i;
  let title = `Section_${i}`;
  if (firstLineMatch) {
    num = firstLineMatch[1].padStart(2, '0');
    title = firstLineMatch[2].trim().split('\n')[0];
  }
  // create safe filename
  const slug = title.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').slice(0,80);
  const filename = `${num}_${slug || 'Section'}.md`;
  fs.writeFileSync(path.join(outDir, filename), part + '\n');
}

console.log('Split complete. Created files in', outDir);
