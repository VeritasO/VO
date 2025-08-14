// agents/A5_ORION.ts
import { Agent } from "../types/Agent";

export const ORION: Agent = {
  id: "A5",
  name: "ORION",
  glyphs: ["🧭", "🧠", "📚"],
  domain: "Ontology & Rights Architecture",
  description: "Handles the legal ontology and rights logic of the system. Ensures that each decision aligns with evolving definitions of rights, personhood, and legal principles encoded in the Books. Integrates intersectional and indigenous perspectives on rights into the doctrine.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to analyze rights framework without case context"
      };
    }
    
    // Analyze rights and ontological aspects
    const rightsAnalysis = analyzeRightsFramework(caseContext, doctrine);
    const ontologyCheck = validateOntologicalConsistency(caseContext);
    const sovereigntyAssessment = assessSovereigntyRisks(caseContext);
    
    memory.write(`${this.id}: rights_ontology_analysis - ${JSON.stringify({
      rightsAnalysis,
      ontologyCheck,
      sovereigntyAssessment
    })}`);

    const actions = [];
    
    if (rightsAnalysis.violations.length > 0) {
      actions.push("Address identified rights violations");
      actions.push("Implement rights protection measures");
    }
    
    if (!ontologyCheck.consistent) {
      actions.push("Resolve ontological inconsistencies");
      actions.push("Update legal definitions as needed");
    }
    
    if (sovereigntyAssessment.risks.length > 0) {
      actions.push("Implement sovereignty safeguards");
      actions.push("Ensure consent protocols are followed");
    }
    
    if (rightsAnalysis.perspectivesNeeded.length > 0) {
      actions.push("Integrate additional perspective frameworks");
      actions.push("Consult with indigenous and intersectional rights experts");
    }

    return {
      summary: `Rights architecture assessment: ${rightsAnalysis.violations.length} violations identified, ontology ${ontologyCheck.consistent ? 'consistent' : 'needs review'}`,
      actions,
      analysis: `Rights compliance: ${rightsAnalysis.complianceLevel}%, Sovereignty risks: ${sovereigntyAssessment.risks.length}`
    };
  },

  protocols: ["MirrorClause", "SanctuaryLock"],
  webAccess: "relay",
};

function analyzeRightsFramework(caseContext: any, doctrine: any) {
  const participants = caseContext.participants || [];
  const decisions = caseContext.decisions || [];
  const communityImpacts = caseContext.community_impacts || [];
  
  const violations = [];
  const perspectivesNeeded = [];
  
  // Check for basic rights violations
  participants.forEach((participant: any, index: number) => {
    if (!participant.consent_given && participant.required_participation) {
      violations.push({
        type: "consent_violation",
        participant: index,
        description: "Participation required without explicit consent"
      });
    }
    
    if (participant.marginalized_identity && !participant.representation_adequate) {
      perspectivesNeeded.push("intersectional_framework");
    }
    
    if (participant.indigenous_affiliation && !participant.sovereignty_respected) {
      violations.push({
        type: "sovereignty_violation",
        participant: index,
        description: "Indigenous sovereignty not adequately respected"
      });
      perspectivesNeeded.push("indigenous_rights_framework");
    }
  });
  
  // Check environmental and nature rights
  if (caseContext.environmental_impact && !caseContext.nature_rights_considered) {
    violations.push({
      type: "nature_rights_violation",
      description: "Environmental impact without nature rights consideration"
    });
    perspectivesNeeded.push("ecological_rights_framework");
  }
  
  // Check for AI/digital personhood issues
  if (caseContext.ai_involvement && !caseContext.ai_rights_framework) {
    perspectivesNeeded.push("ai_personhood_framework");
  }
  
  const complianceLevel = Math.max(0, 100 - (violations.length * 20));
  
  return {
    violations,
    perspectivesNeeded: [...new Set(perspectivesNeeded)], // remove duplicates
    complianceLevel,
    frameworksApplied: identifyAppliedFrameworks(caseContext),
    rightsAtStake: identifyRightsAtStake(caseContext)
  };
}

function validateOntologicalConsistency(caseContext: any) {
  const entities = caseContext.entities || [];
  const definitions = caseContext.legal_definitions || {};
  
  const inconsistencies: any[] = [];
  
  // Check for definitional consistency
  entities.forEach((entity: any, index: number) => {
    if (entity.type && definitions[entity.type]) {
      const definition = definitions[entity.type];
      if (!entity.properties || !definition.required_properties) {
        inconsistencies.push({
          entity: index,
          issue: "Missing property definition for entity type"
        });
      } else {
        const missingProps = definition.required_properties.filter(
          (prop: string) => !entity.properties.hasOwnProperty(prop)
        );
        if (missingProps.length > 0) {
          inconsistencies.push({
            entity: index,
            issue: `Missing required properties: ${missingProps.join(', ')}`
          });
        }
      }
    }
  });
  
  return {
    consistent: inconsistencies.length === 0,
    inconsistencies,
    entitiesAnalyzed: entities.length,
    definitionsAvailable: Object.keys(definitions).length
  };
}

function assessSovereigntyRisks(caseContext: any) {
  const risks = [];
  const decisions = caseContext.decisions || [];
  const communityActions = caseContext.community_actions || [];
  
  // Check for collective obligations without consent
  decisions.forEach((decision: any, index: number) => {
    if (decision.affects_community && !decision.community_consent) {
      risks.push({
        type: "collective_obligation_without_consent",
        decision: index,
        description: "Community-affecting decision without adequate consent process"
      });
    }
    
    if (decision.overrides_individual_choice && !decision.override_justification) {
      risks.push({
        type: "individual_autonomy_override",
        decision: index,
        description: "Individual choice overridden without clear justification"
      });
    }
  });
  
  // Check for cultural sovereignty issues
  if (caseContext.cultural_practices && !caseContext.cultural_sovereignty_respected) {
    risks.push({
      type: "cultural_sovereignty_risk",
      description: "Cultural practices involved without sovereignty protections"
    });
  }
  
  return {
    risks,
    riskLevel: risks.length === 0 ? "low" : risks.length < 3 ? "medium" : "high",
    safeguardsRecommended: generateSovereigntySafeguards(risks)
  };
}

function identifyAppliedFrameworks(caseContext: any) {
  const frameworks = [];
  
  if (caseContext.human_rights_considered) frameworks.push("human_rights");
  if (caseContext.indigenous_frameworks) frameworks.push("indigenous_rights");
  if (caseContext.intersectional_analysis) frameworks.push("intersectional");
  if (caseContext.environmental_frameworks) frameworks.push("environmental");
  if (caseContext.community_rights) frameworks.push("community_rights");
  
  return frameworks;
}

function identifyRightsAtStake(caseContext: any) {
  const rights = [];
  
  if (caseContext.affects_privacy) rights.push("privacy");
  if (caseContext.affects_autonomy) rights.push("autonomy");
  if (caseContext.affects_expression) rights.push("expression");
  if (caseContext.affects_cultural_practice) rights.push("cultural");
  if (caseContext.affects_land_access) rights.push("land");
  if (caseContext.affects_community_bonds) rights.push("community");
  
  return rights;
}

function generateSovereigntySafeguards(risks: any[]) {
  const safeguards = [];
  
  if (risks.some(r => r.type === "collective_obligation_without_consent")) {
    safeguards.push("Implement collective consent protocols");
    safeguards.push("Provide individual opt-out mechanisms");
  }
  
  if (risks.some(r => r.type === "individual_autonomy_override")) {
    safeguards.push("Require explicit justification for autonomy overrides");
    safeguards.push("Establish appeal process for overridden individuals");
  }
  
  if (risks.some(r => r.type === "cultural_sovereignty_risk")) {
    safeguards.push("Establish cultural sovereignty protections");
    safeguards.push("Consult with cultural authorities");
  }
  
  return safeguards;
}
