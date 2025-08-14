"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSystem = runSystem;
exports.runMultipleCases = runMultipleCases;
// system/main.ts
const registry_1 = require("../agents/registry");
const library_1 = require("../doctrine/library");
const processor_1 = require("../cases/processor");
const OmniMemory_1 = require("../memory/OmniMemory");
const metrics_1 = require("../metrics/metrics");
// Simulate a case
async function runSystem() {
    console.log("🌟 VeritasO System Initializing...");
    console.log(`📚 Doctrine version: ${library_1.doctrine.version}`);
    console.log(`🤖 Agents loaded: ${Object.keys(registry_1.AGENTS).length}`);
    const newCase = {
        id: "C-011",
        summary: "AI and Human Emotional Sovereignty Dispute",
        involvedAgents: ["JUNO", "AEGIS", "MIRRA"],
        booksApplied: [1, 4, 9],
        status: "open",
        contradictions: [],
        timeline: [],
    };
    OmniMemory_1.omniMemory.write(`Case opened: ${newCase.summary}`);
    console.log(`\n📋 Processing case: ${newCase.id}`);
    console.log(`📝 Summary: ${newCase.summary}`);
    console.log(`👥 Involved agents: ${newCase.involvedAgents.join(", ")}`);
    const result = await (0, processor_1.processCase)(newCase, library_1.doctrine);
    OmniMemory_1.omniMemory.write(`Case result: ${result.status}`);
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
    const metrics = (0, metrics_1.calculateMetrics)(OmniMemory_1.omniMemory);
    console.log("\n📊 Current system metrics:");
    console.log(`  🏛️  Judicial Restoration Score: ${(metrics.judicialRestorationScore * 100).toFixed(1)}%`);
    console.log(`  ⚖️  Fairness Index: ${(metrics.fairnessIndex * 100).toFixed(1)}%`);
    console.log(`  💔 Grief Weight: ${(metrics.griefWeight * 100).toFixed(1)}%`);
    console.log(`  🔄 Contradiction Rate: ${(metrics.contradictionRate * 100).toFixed(1)}%`);
    console.log(`  👑 Emotional Sovereignty Index: ${(metrics.emotionalSovereigntyIndex * 100).toFixed(1)}%`);
    console.log(`\n📚 Doctrine codifications: ${library_1.doctrine.codifications.length}`);
    if (library_1.doctrine.codifications.length > 0) {
        console.log(`  Latest: ${library_1.doctrine.codifications[library_1.doctrine.codifications.length - 1]}`);
    }
    console.log(`\n🧠 Memory logs: ${OmniMemory_1.omniMemory.logs.length} entries`);
    console.log("🌟 VeritasO System Processing Complete");
}
// Additional demonstration cases
async function runMultipleCases() {
    console.log("\n🔄 Running multiple case scenarios...\n");
    const cases = [
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
        const result = await (0, processor_1.processCase)(testCase, library_1.doctrine);
        console.log(`   Result: ${result.status} (${result.timeline.length} steps)\n`);
    }
    const finalMetrics = (0, metrics_1.calculateMetrics)(OmniMemory_1.omniMemory);
    console.log("📊 Final System Metrics:");
    console.log(`  Cases processed: ${cases.length + 1}`);
    console.log(`  Total contradictions: ${OmniMemory_1.omniMemory.contradictions.length}`);
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
//# sourceMappingURL=main.js.map