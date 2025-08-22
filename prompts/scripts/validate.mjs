import fs from 'fs';
import path from 'path';

const PROMPTS = path.resolve('prompts/agents');
const files = fs.readdirSync(PROMPTS).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
let ok = 0, bad = 0;
for (const f of files) {
  const p = path.join(PROMPTS,f);
  const raw = fs.readFileSync(p,'utf8');
  const issues = [];
  if (!/^version:/m.test(raw)) issues.push('missing version');
  if (!/interop_header:/m.test(raw)) issues.push('missing interop_header');
  if (!/role_task:/m.test(raw)) issues.push('missing role_task');
  if (!/output_format:/m.test(raw) && !/output_format:/m.test(raw)) issues.push('missing output_format');
  if (issues.length) { console.error(f, issues.join('; ')); bad++; } else { ok++; }
}
console.log('Validate: ok=', ok, 'bad=', bad);
