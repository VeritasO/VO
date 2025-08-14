// __tests__/agents.test.ts
import { JUNO } from "../src/agents/A1_JUNO";
import { AEGIS } from "../src/agents/A2_AEGIS";
import { MIRRA } from "../src/agents/A10_MIRRA";
import { doctrine } from "../src/doctrine/library";
import { omniMemory } from "../src/memory/OmniMemory";
import { CaseContext } from "../src/cases/Case";

describe("Agent System", () => {
  beforeEach(() => {
    // Reset memory before each test
    omniMemory.logs.length = 0;
    omniMemory.contradictions.length = 0;
    omniMemory.snapshots.length = 0;
  });

  const mockCase: CaseContext = {
    id: "TEST-001",
    summary: "Test case",
    involvedAgents: ["JUNO"],
    booksApplied: [1],
    status: "open",
    contradictions: [],
    timeline: [],
  };

  test("JUNO agent processes case without contradictions", async () => {
    const response = await JUNO.act({
      caseContext: mockCase,
      doctrine,
      memory: omniMemory,
    });

    expect(response.summary).toContain("Doctrinal review complete");
    expect(response.actions.length).toBeGreaterThan(0); // Just check that actions are provided
    expect(response.contradiction).toBeUndefined();
  });

  test("AEGIS agent performs fairness audit", async () => {
    const response = await AEGIS.act({
      caseContext: mockCase,
      doctrine,
      memory: omniMemory,
    });

    // Agent will perform comprehensive audit regardless
    expect(response.summary).toBeDefined();
    expect(response.actions.length).toBeGreaterThan(0);
    expect(response.summary.length).toBeGreaterThan(0);
  });

  test("MIRRA agent handles contradiction reflection", async () => {
    const caseWithContradiction: CaseContext = {
      ...mockCase,
      contradictions: [{
        id: "X123",
        summary: "Test contradiction",
        severity: "medium",
        agentsInvolved: ["JUNO"],
        doctrinalRefs: [1],
        resolved: false,
      }],
    };

    const initialVersion = doctrine.version;
    const response = await MIRRA.act({
      caseContext: caseWithContradiction,
      doctrine,
      memory: omniMemory,
    });

    expect(response.summary).toContain("reflection complete");
    expect(doctrine.version).not.toBe(initialVersion);
    expect(doctrine.codifications.length).toBeGreaterThan(0);
  });

  test("Agent registry contains all expected agents", () => {
    const { AGENTS } = require("../src/agents/registry");
    
    expect(AGENTS.JUNO).toBeDefined();
    expect(AGENTS.AEGIS).toBeDefined();
    expect(AGENTS.MIRRA).toBeDefined();
    expect(AGENTS.KAIROS).toBeDefined();
    expect(AGENTS.LYRA).toBeDefined();
    expect(AGENTS.ORION).toBeDefined();
  });
});
