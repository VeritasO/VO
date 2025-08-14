"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCase = processCase;
// cases/processor.ts
const registry_1 = require("../agents/registry");
const OmniMemory_1 = require("../memory/OmniMemory");
async function processCase(caseContext, doctrine) {
    let current = caseContext;
    let contradictions = current.contradictions || [];
    OmniMemory_1.omniMemory.write(`Processing case: ${current.id} - ${current.summary}`);
    for (const aid of current.involvedAgents) {
        const agent = registry_1.AGENTS[aid];
        if (!agent) {
            OmniMemory_1.omniMemory.write(`Warning: Agent ${aid} not found in registry`);
            continue;
        }
        OmniMemory_1.omniMemory.write(`Invoking agent: ${agent.name} (${agent.id})`);
        const response = await agent.act({ caseContext: current, doctrine, memory: OmniMemory_1.omniMemory });
        if (response.contradiction) {
            contradictions.push(response.contradiction);
            current.contradictions = contradictions;
            OmniMemory_1.omniMemory.logContradiction(response.contradiction);
        }
        current.timeline.push(`${agent.name}: ${response.summary}`);
        OmniMemory_1.omniMemory.write(`Agent ${agent.name} response: ${response.summary}`);
        if (contradictions.length)
            break; // Pause on contradiction
    }
    if (contradictions.length && contradictions.some(c => !c.resolved)) {
        current.status = "in_reflection";
        OmniMemory_1.omniMemory.write("Case entering reflection phase due to contradictions");
        await registry_1.AGENTS["MIRRA"].act({ caseContext: current, doctrine, memory: OmniMemory_1.omniMemory });
        // Mark contradictions as resolved after MIRRA reflection
        contradictions.forEach(c => c.resolved = true);
    }
    else {
        current.status = "resolved";
        OmniMemory_1.omniMemory.write("Case resolved successfully");
    }
    return current;
}
//# sourceMappingURL=processor.js.map