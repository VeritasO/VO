// system/main.ts
import { AGENTS } from "../agents/registry";
import { doctrine } from "../doctrine/library";
import { processCase } from "../cases/processor";
import { omniMemory } from "../memory/OmniMemory";
import { calculateMetrics } from "../metrics/metrics";
import { CaseContext } from "../cases/Case";

// Simulate a case
async function runSystem() {
  console.log("🌟 VeritasO System Initializing...");
  console.log(`📚 Doctrine version: ${doctrine.version}`);
  console.log(`🤖 Agents loaded: ${Object.keys(AGENTS).length}`);
  
  const newCase: CaseContext = {
    id: "C-011",
    summary: "AI and Human Emotional Sovereignty Dispute",
    involvedAgents: ["JUNO", "AEGIS", "MIRRA"],
    booksApplied: [1, 4, 9],
    status: "open",
    contradictions: [],
    timeline: [],
  };
  
  omniMemory.write(`Case opened: ${newCase.summary}`);
  console.log(`\n📋 Processing case: ${newCase.id}`);
  console.log(`📝 Summary: ${newCase.summary}`);
  console.log(`👥 Involved agents: ${newCase.involvedAgents.join(", ")}`);
  
  const result = await processCase(newCase, doctrine);
  
  omniMemory.write(`Case result: ${result.status}`);
  console.log(`\n✅ Case status: ${result.status}`);
  console.log(`📋 Timeline:`);
  result.timeline.forEach((entry, index) => {
    console.log(`  ${index + 1}. ${entry}`);
  });
  
  if (result.contradictions.length > 0) {
    console.log(`\n⚠️  Contradictions encountered: ${result.contradictions.length}`);
    result.contradictions.forEach((contradiction, index) => {
      console.log(`  ${index + 1}. ${contradiction.summary} (${contradiction.severity})`);
      console.log(`     Resolved: ${contradiction.resolved ? "✅" : "❌"}`);
    });
  }
  
  const metrics = calculateMetrics(omniMemory);
  console.log("\n📊 Current system metrics:");
  console.log(`  🏛️  Judicial Restoration Score: ${(metrics.judicialRestorationScore * 100).toFixed(1)}%`);
  console.log(`  ⚖️  Fairness Index: ${(metrics.fairnessIndex * 100).toFixed(1)}%`);
  console.log(`  💔 Grief Weight: ${(metrics.griefWeight * 100).toFixed(1)}%`);
  console.log(`  🔄 Contradiction Rate: ${(metrics.contradictionRate * 100).toFixed(1)}%`);
  console.log(`  👑 Emotional Sovereignty Index: ${(metrics.emotionalSovereigntyIndex * 100).toFixed(1)}%`);
  
  console.log(`\n📚 Doctrine codifications: ${doctrine.codifications.length}`);
  if (doctrine.codifications.length > 0) {
    console.log(`  Latest: ${doctrine.codifications[doctrine.codifications.length - 1]}`);
  }
  
  console.log(`\n🧠 Memory logs: ${omniMemory.logs.length} entries`);
  console.log("🌟 VeritasO System Processing Complete");
}

// Additional demonstration cases
async function runMultipleCases() {
  console.log("\n🔄 Running multiple case scenarios...\n");
  
  const cases: CaseContext[] = [
    {
      id: "C-012",
      summary: "Bias Detection in AI Decision Making",
      involvedAgents: ["AEGIS", "JUNO", "ORION"],
      booksApplied: [1, 2],
      status: "open",
      contradictions: [],
      timeline: [],
    },
    {
      id: "C-013",
      summary: "Temporal Logic Conflict in Precedent Application",
      involvedAgents: ["KAIROS", "JUNO", "MIRRA"],
      booksApplied: [5, 1],
      status: "open",
      contradictions: [],
      timeline: [],
    },
    {
      id: "C-014",
      summary: "Emotional Sovereignty Violation Report",
      involvedAgents: ["LYRA", "JUNO", "AEGIS"],
      booksApplied: [3, 4],
      status: "open",
      contradictions: [],
      timeline: [],
    }
  ];
  
  for (const testCase of cases) {
    console.log(`📋 Processing ${testCase.id}: ${testCase.summary}`);
    const result = await processCase(testCase, doctrine);
    console.log(`   Result: ${result.status} (${result.timeline.length} steps)\n`);
  }
  
  const finalMetrics = calculateMetrics(omniMemory);
  console.log("📊 Final System Metrics:");
  console.log(`  Cases processed: ${cases.length + 1}`);
  console.log(`  Total contradictions: ${omniMemory.contradictions.length}`);
  console.log(`  System integrity: ${(finalMetrics.judicialRestorationScore * 100).toFixed(1)}%`);
}

async function main() {
  await runSystem();
  await runMultipleCases();
}

// Run if this is the main module
if (require.main === module) {
  main().catch(console.error);
}

export { runSystem, runMultipleCases };
