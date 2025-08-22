import fs from 'fs';
import path from 'path';

const BOOK_DIR = path.resolve('knowledge/books');
const INDEX_OUT = path.resolve('knowledge/index/core_knowledge_index.json');

if (!fs.existsSync(BOOK_DIR)) {
  console.error('Books dir not found:', BOOK_DIR);
  process.exit(2);
}
if (!fs.existsSync(path.dirname(INDEX_OUT))) fs.mkdirSync(path.dirname(INDEX_OUT), { recursive: true });

const files = fs.readdirSync(BOOK_DIR).filter(f => f.endsWith('.md')).sort();
const index = [];
for (const f of files) {
  const p = path.join(BOOK_DIR, f);
  const raw = fs.readFileSync(p, 'utf8');
  // extract title and first 200 chars as summary
  const titleMatch = raw.match(/^#\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : f;
  const body = raw.split(/\r?\n/).slice(1).join('\n').trim();
  const summary = body.replace(/\n+/g, ' ').slice(0, 500);
  index.push({ file: `knowledge/books/${f}`, title, summary, length: body.length });
}
fs.writeFileSync(INDEX_OUT, JSON.stringify({ generatedAt: new Date().toISOString(), entries: index }, null, 2));
console.log('Index written to', INDEX_OUT, 'with', index.length, 'entries.');
