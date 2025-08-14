// agents/A1_JUNO.ts
import { Agent } from "../types/Agent";
import { detectContradictions } from "../cases/contradictionUtils";
import { LangChainRouter } from "langchain";
import { AutoGenCouncil } from "autogen";

export const JUNO: Agent = {
  id: "A1",
  name: "JUNO",
  glyphs: ["⚖️", "👁️", "🌿"],
  domain: "Judicial Doctrine Core",
  description: "Upholds doctrine, leads councils, synchronizes agent logic. As the primary judicial authority, JUNO maintains doctrinal coherence across all proceedings and coordinates the agent collective during complex cases.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to process without case context"
      };
    }

    // Perform comprehensive doctrinal analysis
    const doctrinalevaluation = evaluateDoctrinalAlignment(caseContext, doctrine);
    const contradictions = detectContradictions(caseContext, doctrine);
    const agentCoordination = assessAgentCoordination(caseContext);
    const councilNeeds = determineCouncilRequirements(caseContext, contradictions);
    
    memory.write(`${this.id}: doctrinal_review - ${JSON.stringify({
      doctrinalAlignment: doctrinalevaluation.alignmentScore,
      contradictionsFound: contradictions.length,
      coordinationStatus: agentCoordination.status,
      councilRequired: councilNeeds.required,
      reviewTimestamp: timestamp
    })}`);

    // Initialize LangChain router and AutoGen council
    const router = new LangChainRouter();
    const council = new AutoGenCouncil();

    const actions = [];
    
    // Handle contradictions with Mirror Clause activation
    if (contradictions.length > 0) {
      const severity = assessContradictionSeverity(contradictions);
      actions.push("Activate Mirror Clause protocol");
      actions.push("Pause all case proceedings");
      actions.push("Convene MIRRA for contradiction analysis");
      
      if (severity === "critical") {
        actions.push("Initiate emergency doctrinal review");
        actions.push("Alert all agents to potential doctrine violation");
      }
      
      // Coordinate specific agents based on contradiction type
      contradictions.forEach(contradiction => {
        const relevantAgents = identifyRelevantAgents(contradiction);
        relevantAgents.forEach(agent => {
          actions.push(`Summon ${agent} for contradiction resolution`);
        });
      });

      return {
        summary: `Critical contradictions detected (${contradictions.length}). Mirror Clause activated.`,
        actions,
        analysis: `Contradiction severity: ${severity}, Primary violation: ${contradictions[0].id}`,
        contradiction: contradictions[0],
        doctrinalStatus: "violated"
      };
    }

    // Use LangChain router to delegate tasks to sub-agents
    const routedTasks = router.routeTasks(caseContext.tasks);

    // Use AutoGen council for multi-agent decision-making
    const councilDecisions = council.deliberate(routedTasks);

    memory.write(`${this.id}: council_decisions - ${JSON.stringify(councilDecisions)}`);

    // Coordinate agent activities for case progression
    if (agentCoordination.requiresIntervention) {
      actions.push("Synchronize agent coordination protocols");
      actions.push("Resolve agent logic conflicts");
      agentCoordination.conflicts.forEach((conflict: any) => {
        actions.push(`Mediate conflict between ${conflict.agents.join(' and ')}`);
      });
    }

    // Determine if council convening is needed
    if (councilNeeds.required) {
      actions.push(`Convene ${councilNeeds.type} council`);
      actions.push("Establish council proceedings framework");
      councilNeeds.participants.forEach((participant: string) => {
        actions.push(`Include ${participant} in council deliberations`);
      });
    }

    // Standard case progression
    if (doctrinalevaluation.alignmentScore > 0.8) {
      actions.push("Authorize case progression");
      actions.push("Monitor doctrinal adherence");
    } else if (doctrinalevaluation.alignmentScore > 0.6) {
      actions.push("Proceed with enhanced doctrinal oversight");
      actions.push("Implement additional doctrine review checkpoints");
    } else {
      actions.push("Require doctrinal alignment before progression");
      actions.push("Initiate doctrine clarification process");
    }

    // Agent synchronization
    if (caseContext.involvedAgents && caseContext.involvedAgents.length > 1) {
      actions.push("Synchronize multi-agent coordination");
      actions.push("Verify inter-agent logic consistency");
    }

    return {
      summary: `Doctrinal review complete. Alignment: ${Math.round(doctrinalevaluation.alignmentScore * 100)}%, Coordination: ${agentCoordination.status}`,
      actions,
      analysis: `Case complexity: ${doctrinalevaluation.complexity}, Required oversight: ${doctrinalevaluation.oversightLevel}`,
      doctrinalStatus: "aligned",
      coordinationIndex: agentCoordination.coordinationIndex
    };
  },

  protocols: ["MirrorClause", "DoctrineReview"],
  webAccess: "relay",
};

function evaluateDoctrinalAlignment(caseContext: any, doctrine: any) {
  let alignmentScore = 1.0;
  let complexity = "standard";
  let oversightLevel = "normal";
  const violations = [];

  // Check core doctrinal principles
  if (caseContext.principles_violated && caseContext.principles_violated.length > 0) {
    alignmentScore -= 0.3;
    violations.push("Core principles violated");
    oversightLevel = "enhanced";
  }

  // Assess case complexity
  const complexityFactors = [
    caseContext.multiple_jurisdictions,
    caseContext.cultural_considerations,
    caseContext.temporal_elements,
    caseContext.collective_vs_individual_tension
  ].filter(Boolean).length;

  if (complexityFactors > 2) {
    complexity = "high";
    alignmentScore -= 0.1;
    oversightLevel = "intensive";
  } else if (complexityFactors > 0) {
    complexity = "moderate";
    alignmentScore -= 0.05;
  }

  // Check for doctrinal gaps
  if (caseContext.novel_circumstances || caseContext.unprecedented_elements) {
    alignmentScore -= 0.2;
    violations.push("Novel circumstances require doctrinal interpretation");
  }

  // Verify restorative justice alignment
  if (!caseContext.restorative_elements || caseContext.punitive_bias) {
    alignmentScore -= 0.25;
    violations.push("Insufficient restorative justice elements");
  }

  return {
    alignmentScore: Math.max(0, alignmentScore),
    complexity,
    oversightLevel,
    violations,
    requiresReview: alignmentScore < 0.7
  };
}

function assessAgentCoordination(caseContext: any) {
  const status = "optimal";
  const conflicts: any[] = [];
  let coordinationIndex = 1.0;
  let requiresIntervention = false;

  if (caseContext.agent_conflicts) {
    caseContext.agent_conflicts.forEach((conflict: any) => {
      conflicts.push({
        agents: conflict.agents,
        type: conflict.type,
        severity: conflict.severity
      });
      coordinationIndex -= 0.2;
      requiresIntervention = true;
    });
  }

  if (caseContext.coordination_delays) {
    coordinationIndex -= 0.1;
    if (caseContext.coordination_delays > 3) {
      requiresIntervention = true;
    }
  }

  const finalStatus = coordinationIndex > 0.8 ? "optimal" : 
                    coordinationIndex > 0.6 ? "adequate" : "requires_intervention";

  return {
    status: finalStatus,
    coordinationIndex,
    conflicts,
    requiresIntervention,
    delayCount: caseContext.coordination_delays || 0
  };
}

function determineCouncilRequirements(caseContext: any, contradictions: any[]) {
  let required = false;
  let type = "standard";
  const participants = ["JUNO"];

  // Council required for contradictions
  if (contradictions.length > 0) {
    required = true;
    type = "emergency";
    participants.push("MIRRA");
  }

  // Council for complex cases
  if (caseContext.complexity === "high" || caseContext.stakeholder_count > 5) {
    required = true;
    type = type === "emergency" ? "emergency" : "deliberative";
    participants.push("LYRA", "AEGIS");
  }

  // Council for doctrinal development
  if (caseContext.precedent_setting || caseContext.novel_circumstances) {
    required = true;
    type = "doctrinal";
    participants.push("ORION", "VESTA");
  }

  // Council for collective decisions
  if (caseContext.collective_impact || caseContext.community_wide_effects) {
    required = true;
    participants.push("CHORUS", "SOVRIN");
  }

  return {
    required,
    type,
    participants: [...new Set(participants)], // Remove duplicates
    urgency: type === "emergency" ? "immediate" : "scheduled"
  };
}

function assessContradictionSeverity(contradictions: any[]) {
  const severityLevels = contradictions.map(c => c.severity || "medium");
  
  if (severityLevels.includes("critical")) return "critical";
  if (severityLevels.includes("high")) return "high";
  if (severityLevels.includes("medium")) return "medium";
  return "low";
}

function identifyRelevantAgents(contradiction: any) {
  const agents = [];
  
  // Always include MIRRA for contradictions
  agents.push("MIRRA");
  
  // Add agents based on contradiction domain
  switch (contradiction.domain) {
    case "temporal":
      agents.push("KAIROS", "TEMPUS");
      break;
    case "narrative":
      agents.push("LYRA");
      break;
    case "rights":
      agents.push("ORION", "SOVRIN");
      break;
    case "emotional":
      agents.push("ANIMA");
      break;
    case "structural":
      agents.push("VESTA");
      break;
    case "surveillance":
      agents.push("SENTINEL");
      break;
    case "collective":
      agents.push("CHORUS");
      break;
    default:
      agents.push("AEGIS"); // General support
  }
  
  return agents;
}
