// cases/processor.ts
import { AGENTS } from "../agents/registry";
import { CaseContext } from "./Case";
import { DoctrineLibrary } from "../doctrine/Book";
import { omniMemory } from "../memory/OmniMemory";

export async function processCase(caseContext: CaseContext, doctrine: DoctrineLibrary) {
  let current = caseContext;
  let contradictions = current.contradictions || [];

  omniMemory.write(`Processing case: ${current.id} - ${current.summary}`);

  for (const aid of current.involvedAgents) {
    const agent = AGENTS[aid];
    if (!agent) {
      omniMemory.write(`Warning: Agent ${aid} not found in registry`);
      continue;
    }
    
    omniMemory.write(`Invoking agent: ${agent.name} (${agent.id})`);
    const response = await agent.act({ caseContext: current, doctrine, memory: omniMemory });
    
    if (response.contradiction) {
      contradictions.push(response.contradiction);
      current.contradictions = contradictions;
      omniMemory.logContradiction(response.contradiction);
    }
    
    current.timeline.push(`${agent.name}: ${response.summary}`);
    omniMemory.write(`Agent ${agent.name} response: ${response.summary}`);
    
    if (contradictions.length) break; // Pause on contradiction
  }

  if (contradictions.length && contradictions.some(c => !c.resolved)) {
    current.status = "in_reflection";
    omniMemory.write("Case entering reflection phase due to contradictions");
    await AGENTS["MIRRA"].act({ caseContext: current, doctrine, memory: omniMemory });
    
    // Mark contradictions as resolved after MIRRA reflection
    contradictions.forEach(c => c.resolved = true);
  } else {
    current.status = "resolved";
    omniMemory.write("Case resolved successfully");
  }
  
  return current;
}
