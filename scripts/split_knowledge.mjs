import fs from 'fs';
import path from 'path';

const INPUT = path.resolve('knowledge/core_knowledge_package.md');
const OUT_DIR = path.resolve('knowledge/books');

if (!fs.existsSync(INPUT)) {
  console.error('Input file not found:', INPUT);
  process.exit(2);
}
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const raw = fs.readFileSync(INPUT, 'utf8');
const lines = raw.split(/\r?\n/);

// We'll split on top-level numeric headings like "1." "2." etc that start a line.
const sections = [];
let current = { title: 'Preamble', lines: [] };
for (const line of lines) {
  const match = line.match(/^\s*(\d+)\.\s+(.+)$/);
  if (match) {
    // start new section
    if (current.lines.length) sections.push(current);
    current = { title: `${match[1]}. ${match[2]}`, lines: [] };
  } else {
    current.lines.push(line);
  }
}
if (current.lines.length) sections.push(current);

// Write sections to files
const created = [];
for (const sec of sections) {
  // derive filename
  const safe = sec.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0,120);
  const filename = `book_${safe}.md`;
  const outPath = path.join(OUT_DIR, filename);
  const content = `# ${sec.title}\n\n${sec.lines.join('\n')}`;
  fs.writeFileSync(outPath, content, 'utf8');
  created.push({ title: sec.title, file: `knowledge/books/${filename}` });
}

console.log('Wrote', created.length, 'book files:');
for (const c of created) console.log('-', c.file);

// Also write a small manifest
const manifest = { generatedAt: new Date().toISOString(), count: created.length, files: created };
const INDEX_DIR = path.resolve('knowledge/index');
if (!fs.existsSync(INDEX_DIR)) fs.mkdirSync(INDEX_DIR, { recursive: true });
const manifestPath = path.join(INDEX_DIR, 'core_knowledge_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Manifest written to', manifestPath);
