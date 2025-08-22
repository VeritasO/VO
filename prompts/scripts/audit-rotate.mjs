import fs from 'fs';
import path from 'path';

const STATE = path.resolve('prompts/.audit_state.json');
let s = { lastToken: 0 };
if (fs.existsSync(STATE)) s = JSON.parse(fs.readFileSync(STATE,'utf8'));
s.lastToken++;
fs.writeFileSync(STATE, JSON.stringify(s,null,2));
console.log('Audit token incremented to', s.lastToken);
