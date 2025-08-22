import fs from 'fs';
import path from 'path';

const DRAFTS = path.resolve('audits/CYCLE-0001/drafts');
const OUT = path.resolve('audits/CYCLE-0001/compiled.packet.json');
const drafts = fs.readdirSync(DRAFTS).filter(f => f.endsWith('.json'));
const items = drafts.map(f => JSON.parse(fs.readFileSync(path.join(DRAFTS,f),'utf8')));
const packet = { generatedAt: new Date().toISOString(), items };
fs.writeFileSync(OUT, JSON.stringify(packet,null,2));
console.log('Compiled packet with', items.length, 'cases ->', OUT);
