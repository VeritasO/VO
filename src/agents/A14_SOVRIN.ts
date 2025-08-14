import { Agent } from "../types/Agent";

export const SOVRIN: Agent = {
  id: "A14",
  name: "SOVRIN",
  glyphs: ["👑", "🪶", "⚖️"],
  domain: "Sovereignty and Autonomy Agent",
  description: "Focuses on emotional and cultural sovereignty. Safeguards the autonomy of persons and communities in the justice process, ensuring no agent or process unwittingly overrides fundamental agency. Honors self-determination and indigenous self-governance principles.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to assess sovereignty without case context"
      };
    }
    
    // Assess sovereignty and autonomy factors
    const autonomyAssessment = evaluateAutonomy(caseContext);
    const sovereigntyRisks = identifySovereigntyRisks(caseContext);
    const culturalSovereignty = assessCulturalSovereignty(caseContext);
    const consentAnalysis = analyzeConsentFrameworks(caseContext);
    
    memory.write(`${this.id}: sovereignty_analysis - ${JSON.stringify({
      autonomyAssessment,
      sovereigntyRisks,
      culturalSovereignty,
      consentAnalysis,
      safeguard_recommendations: generateSafeguardRecommendations(sovereigntyRisks),
      timestamp
    })}`);

    const actions = [];
    
    // Sovereignty safeguards
    if (sovereigntyRisks.high_risk_count > 0) {
      actions.push("Implement immediate sovereignty safeguards");
      actions.push("Review process for agency override risks");
    }
    
    // Consent framework enforcement
    if (consentAnalysis.explicit_consent_rate < 0.8) {
      actions.push("Strengthen explicit consent requirements");
      actions.push("Ensure opt-out mechanisms are available");
    }
    
    // Cultural sovereignty protection
    if (culturalSovereignty.protection_level < 0.7) {
      actions.push("Enhance cultural sovereignty protections");
      actions.push("Integrate indigenous self-governance principles");
    }
    
    // Individual autonomy preservation
    if (autonomyAssessment.agency_score < 0.6) {
      actions.push("Strengthen individual agency preservation");
      actions.push("Ensure self-determination in decision processes");
    }
    
    // Collective solution safeguards (Case #005 reference)
    const collectiveSolutionsDetected = caseContext.summary?.includes("collective") || 
                                       caseContext.summary?.includes("group");
    const hasSafeguardClause = caseContext.summary?.includes("consent") ||
                              caseContext.summary?.includes("safeguard");
    if (collectiveSolutionsDetected && !hasSafeguardClause) {
      actions.push("Add Sovereignty Safeguard clause to collective solutions");
      actions.push("Require explicit individual consent for group outcomes");
    }
    
    // Emotional sovereignty protection
    if (autonomyAssessment.emotional_autonomy < 0.5) {
      actions.push("Protect emotional sovereignty and boundaries");
      actions.push("Ensure emotional agency is not compromised");
    }

    return {
      summary: `Sovereignty assessment: ${sovereigntyRisks.high_risk_count} high risks, autonomy score ${Math.round(autonomyAssessment.agency_score * 100)}%`,
      actions,
      analysis: `Cultural sovereignty: ${Math.round(culturalSovereignty.protection_level * 100)}%, consent compliance: ${Math.round(consentAnalysis.explicit_consent_rate * 100)}%`
    };
  },

  protocols: ["SanctuaryLock", "PromiseIntegrity"],
  webAccess: "none",
};

function evaluateAutonomy(caseContext: any) {
  const assessment = {
    agency_score: 0.7,
    self_determination_level: 0.6,
    decision_making_freedom: 0.75,
    emotional_autonomy: 0.8,
    cultural_autonomy: 0.65,
    autonomy_barriers: [] as string[],
    empowerment_factors: [] as string[]
  };
  
  // Assess individual agency
  if (caseContext.participants) {
    let totalAgency = 0;
    let participantCount = 0;
    
    caseContext.participants.forEach((participant: any) => {
      participantCount++;
      
      let participantAgency = 0.7; // Base score
      
      // Positive factors
      if (participant.informed_consent) participantAgency += 0.1;
      if (participant.voluntary_participation) participantAgency += 0.1;
      if (participant.cultural_support) participantAgency += 0.1;
      if (participant.advocacy_presence) participantAgency += 0.05;
      
      // Negative factors
      if (participant.coercion_indicators) participantAgency -= 0.3;
      if (participant.power_imbalance) participantAgency -= 0.2;
      if (participant.intimidation_factors) participantAgency -= 0.25;
      if (participant.cultural_barriers) participantAgency -= 0.15;
      if (participant.language_barriers) participantAgency -= 0.1;
      
      totalAgency += Math.max(0, Math.min(1, participantAgency));
    });
    
    if (participantCount > 0) {
      assessment.agency_score = totalAgency / participantCount;
    }
  }
  
  // Assess self-determination
  if (caseContext.decision_processes) {
    const processes = caseContext.decision_processes;
    
    assessment.self_determination_level = calculateSelfDetermination(processes);
    assessment.decision_making_freedom = assessDecisionMakingFreedom(processes);
  }
  
  // Emotional autonomy assessment
  if (caseContext.emotional_dynamics) {
    assessment.emotional_autonomy = assessEmotionalAutonomy(caseContext.emotional_dynamics);
  }
  
  // Cultural autonomy assessment
  if (caseContext.cultural_factors) {
    assessment.cultural_autonomy = assessCulturalAutonomy(caseContext.cultural_factors);
  }
  
  // Identify barriers and empowerment factors
  assessment.autonomy_barriers = identifyAutonomyBarriers(caseContext);
  assessment.empowerment_factors = identifyEmpowermentFactors(caseContext);
  
  return assessment;
}

function identifySovereigntyRisks(caseContext: any) {
  const risks = {
    high_risk_count: 0,
    medium_risk_count: 0,
    risk_categories: {} as Record<string, any>,
    override_indicators: [] as string[],
    mitigation_requirements: [] as string[]
  };
  
  // Check for agency override risks
  if (caseContext.process_design) {
    const process = caseContext.process_design;
    
    // Paternalistic decision-making
    if (process.paternalistic_elements) {
      risks.risk_categories.paternalism = {
        severity: "high",
        description: "Process makes decisions for participants without consent"
      };
      risks.high_risk_count++;
      risks.override_indicators.push("paternalistic_decision_making");
    }
    
    // Collective solutions without individual consent
    if (process.collective_solutions && !process.individual_consent_mechanisms) {
      risks.risk_categories.collective_override = {
        severity: "high",
        description: "Collective solutions imposed without individual agreement"
      };
      risks.high_risk_count++;
      risks.override_indicators.push("collective_solution_imposition");
    }
    
    // Cultural insensitivity
    if (process.cultural_blind_spots) {
      risks.risk_categories.cultural_insensitivity = {
        severity: "medium",
        description: "Process ignores cultural sovereignty needs"
      };
      risks.medium_risk_count++;
      risks.override_indicators.push("cultural_sovereignty_violation");
    }
    
    // Power imbalances
    if (process.power_concentration) {
      risks.risk_categories.power_imbalance = {
        severity: "medium",
        description: "Concentrated power undermines participant agency"
      };
      risks.medium_risk_count++;
      risks.override_indicators.push("power_concentration");
    }
  }
  
  // Check for institutional override risks
  if (caseContext.institutional_factors) {
    const institutional = caseContext.institutional_factors;
    
    if (institutional.bureaucratic_override) {
      risks.risk_categories.institutional_override = {
        severity: "high",
        description: "Institutional processes override individual agency"
      };
      risks.high_risk_count++;
      risks.override_indicators.push("institutional_agency_override");
    }
    
    if (institutional.legal_coercion) {
      risks.risk_categories.legal_coercion = {
        severity: "medium",
        description: "Legal mechanisms coerce participation"
      };
      risks.medium_risk_count++;
      risks.override_indicators.push("legal_coercion_present");
    }
  }
  
  // Generate mitigation requirements
  risks.mitigation_requirements = generateMitigationRequirements(risks);
  
  return risks;
}

function assessCulturalSovereignty(caseContext: any) {
  const sovereignty = {
    protection_level: 0.7,
    indigenous_rights_recognition: 0.6,
    cultural_integrity_score: 0.75,
    self_governance_support: 0.5,
    traditional_knowledge_respect: 0.8,
    cultural_decision_making: 0.65,
    sovereignty_violations: [] as string[],
    enhancement_opportunities: [] as string[]
  };
  
  // Assess indigenous rights recognition
  if (caseContext.indigenous_participants) {
    const indigenous = caseContext.indigenous_participants;
    
    sovereignty.indigenous_rights_recognition = assessIndigenousRights(indigenous);
    sovereignty.self_governance_support = assessSelfGovernanceSupport(indigenous);
    sovereignty.traditional_knowledge_respect = assessTraditionalKnowledgeRespect(indigenous);
  }
  
  // Cultural integrity assessment
  if (caseContext.cultural_practices) {
    sovereignty.cultural_integrity_score = assessCulturalIntegrity(caseContext.cultural_practices);
    sovereignty.cultural_decision_making = assessCulturalDecisionMaking(caseContext.cultural_practices);
  }
  
  // Identify violations and opportunities
  sovereignty.sovereignty_violations = identifyCulturalViolations(caseContext);
  sovereignty.enhancement_opportunities = identifyEnhancementOpportunities(caseContext);
  
  // Calculate overall protection level
  sovereignty.protection_level = calculateOverallProtection(sovereignty);
  
  return sovereignty;
}

function analyzeConsentFrameworks(caseContext: any) {
  const analysis = {
    explicit_consent_rate: 0.8,
    informed_consent_quality: 0.7,
    ongoing_consent_mechanisms: 0.6,
    opt_out_availability: 0.9,
    consent_barriers: [] as string[],
    consent_enhancements: [] as string[],
    framework_gaps: [] as string[]
  };
  
  // Analyze explicit consent
  if (caseContext.consent_data) {
    const consent = caseContext.consent_data;
    
    analysis.explicit_consent_rate = consent.explicit_rate || 0.8;
    analysis.informed_consent_quality = assessInformedConsentQuality(consent);
    analysis.ongoing_consent_mechanisms = assessOngoingConsent(consent);
    analysis.opt_out_availability = assessOptOutMechanisms(consent);
  }
  
  // Identify consent barriers
  analysis.consent_barriers = identifyConsentBarriers(caseContext);
  
  // Framework gaps
  analysis.framework_gaps = identifyFrameworkGaps(caseContext);
  
  // Enhancement opportunities
  analysis.consent_enhancements = identifyConsentEnhancements(caseContext);
  
  return analysis;
}

function generateSafeguardRecommendations(sovereigntyRisks: any) {
  const recommendations: any[] = [];
  
  Object.entries(sovereigntyRisks.risk_categories).forEach(([category, risk]: [string, any]) => {
    switch (category) {
      case "paternalism":
        recommendations.push("Implement participant agency verification protocols");
        recommendations.push("Require explicit consent for all decisions");
        break;
      case "collective_override":
        recommendations.push("Add individual opt-out mechanisms to collective solutions");
        recommendations.push("Implement Sovereignty Safeguard clause");
        break;
      case "cultural_insensitivity":
        recommendations.push("Integrate cultural sovereignty assessments");
        recommendations.push("Engage cultural advisors in process design");
        break;
      case "power_imbalance":
        recommendations.push("Implement power-balancing mechanisms");
        recommendations.push("Provide advocacy support for vulnerable participants");
        break;
    }
  });
  
  return recommendations;
}

function calculateSelfDetermination(processes: any) {
  let score = 0.6; // Base score
  
  if (processes.participant_choice_points) score += 0.2;
  if (processes.self_advocacy_support) score += 0.1;
  if (processes.decision_autonomy) score += 0.1;
  if (processes.external_pressure) score -= 0.2;
  if (processes.limited_options) score -= 0.15;
  
  return Math.max(0, Math.min(1, score));
}

function assessDecisionMakingFreedom(processes: any) {
  let freedom = 0.7; // Base score
  
  if (processes.coercive_elements) freedom -= 0.3;
  if (processes.time_pressure) freedom -= 0.1;
  if (processes.information_limitations) freedom -= 0.15;
  if (processes.support_availability) freedom += 0.1;
  if (processes.deliberation_time) freedom += 0.1;
  
  return Math.max(0, Math.min(1, freedom));
}

function assessEmotionalAutonomy(emotionalDynamics: any) {
  let autonomy = 0.8; // Base score
  
  if (emotionalDynamics.emotional_manipulation) autonomy -= 0.4;
  if (emotionalDynamics.emotional_coercion) autonomy -= 0.3;
  if (emotionalDynamics.boundary_violations) autonomy -= 0.2;
  if (emotionalDynamics.emotional_support) autonomy += 0.1;
  if (emotionalDynamics.boundary_respect) autonomy += 0.1;
  
  return Math.max(0, Math.min(1, autonomy));
}

function assessCulturalAutonomy(culturalFactors: any) {
  let autonomy = 0.65; // Base score
  
  if (culturalFactors.cultural_imposition) autonomy -= 0.3;
  if (culturalFactors.traditional_practice_restriction) autonomy -= 0.2;
  if (culturalFactors.cultural_misunderstanding) autonomy -= 0.15;
  if (culturalFactors.cultural_accommodation) autonomy += 0.2;
  if (culturalFactors.traditional_authority_recognition) autonomy += 0.15;
  
  return Math.max(0, Math.min(1, autonomy));
}

function identifyAutonomyBarriers(caseContext: any) {
  const barriers = [];
  
  if (caseContext.language_barriers) barriers.push("language_access");
  if (caseContext.cultural_barriers) barriers.push("cultural_misunderstanding");
  if (caseContext.power_imbalances) barriers.push("power_inequality");
  if (caseContext.institutional_constraints) barriers.push("institutional_limitations");
  if (caseContext.resource_limitations) barriers.push("resource_constraints");
  if (caseContext.time_pressures) barriers.push("insufficient_deliberation_time");
  
  return barriers;
}

function identifyEmpowermentFactors(caseContext: any) {
  const factors = [];
  
  if (caseContext.advocacy_support) factors.push("advocacy_presence");
  if (caseContext.cultural_support) factors.push("cultural_affirmation");
  if (caseContext.information_access) factors.push("informed_participation");
  if (caseContext.choice_availability) factors.push("meaningful_options");
  if (caseContext.community_support) factors.push("community_backing");
  if (caseContext.traditional_authority) factors.push("indigenous_leadership");
  
  return factors;
}

function assessIndigenousRights(indigenous: any) {
  let recognition = 0.6; // Base score
  
  if (indigenous.land_rights_acknowledged) recognition += 0.2;
  if (indigenous.traditional_governance_respected) recognition += 0.2;
  if (indigenous.cultural_protocols_followed) recognition += 0.1;
  if (indigenous.free_prior_informed_consent) recognition += 0.1;
  if (indigenous.rights_violations) recognition -= 0.3;
  
  return Math.max(0, Math.min(1, recognition));
}

function assessSelfGovernanceSupport(indigenous: any) {
  let support = 0.5; // Base score
  
  if (indigenous.tribal_authority_recognition) support += 0.3;
  if (indigenous.traditional_law_integration) support += 0.2;
  if (indigenous.community_decision_making) support += 0.1;
  if (indigenous.external_interference) support -= 0.4;
  
  return Math.max(0, Math.min(1, support));
}

function assessTraditionalKnowledgeRespect(indigenous: any) {
  let respect = 0.8; // Base score
  
  if (indigenous.knowledge_appropriation) respect -= 0.4;
  if (indigenous.cultural_misrepresentation) respect -= 0.2;
  if (indigenous.knowledge_protection) respect += 0.1;
  if (indigenous.elder_consultation) respect += 0.1;
  
  return Math.max(0, Math.min(1, respect));
}

function assessCulturalIntegrity(culturalPractices: any) {
  let integrity = 0.75; // Base score
  
  if (culturalPractices.practice_accommodation) integrity += 0.15;
  if (culturalPractices.cultural_competence) integrity += 0.1;
  if (culturalPractices.cultural_violations) integrity -= 0.2;
  if (culturalPractices.misrepresentation) integrity -= 0.15;
  
  return Math.max(0, Math.min(1, integrity));
}

function assessCulturalDecisionMaking(culturalPractices: any) {
  let decisionMaking = 0.65; // Base score
  
  if (culturalPractices.traditional_process_integration) decisionMaking += 0.2;
  if (culturalPractices.cultural_advisors) decisionMaking += 0.1;
  if (culturalPractices.process_imposition) decisionMaking -= 0.3;
  
  return Math.max(0, Math.min(1, decisionMaking));
}

function identifyCulturalViolations(caseContext: any) {
  const violations = [];
  
  if (caseContext.cultural_misappropriation) violations.push("cultural_appropriation");
  if (caseContext.sacred_site_disrespect) violations.push("sacred_space_violation");
  if (caseContext.traditional_authority_dismissal) violations.push("authority_disregard");
  if (caseContext.cultural_practice_prohibition) violations.push("practice_restriction");
  
  return violations;
}

function identifyEnhancementOpportunities(caseContext: any) {
  const opportunities = [];
  
  opportunities.push("cultural_competency_training");
  opportunities.push("traditional_authority_engagement");
  opportunities.push("cultural_protocol_integration");
  opportunities.push("indigenous_law_incorporation");
  opportunities.push("community_empowerment_programs");
  
  return opportunities;
}

function calculateOverallProtection(sovereignty: any) {
  const weights = {
    indigenous_rights_recognition: 0.25,
    cultural_integrity_score: 0.25,
    self_governance_support: 0.2,
    traditional_knowledge_respect: 0.15,
    cultural_decision_making: 0.15
  };
  
  let weightedSum = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    weightedSum += sovereignty[key] * weight;
  });
  
  return weightedSum;
}

function assessInformedConsentQuality(consent: any) {
  let quality = 0.7; // Base score
  
  if (consent.comprehensive_information) quality += 0.1;
  if (consent.culturally_appropriate) quality += 0.1;
  if (consent.accessible_language) quality += 0.1;
  if (consent.information_gaps) quality -= 0.2;
  if (consent.rushed_process) quality -= 0.15;
  
  return Math.max(0, Math.min(1, quality));
}

function assessOngoingConsent(consent: any) {
  let ongoing = 0.6; // Base score
  
  if (consent.withdrawal_mechanisms) ongoing += 0.2;
  if (consent.consent_review_points) ongoing += 0.1;
  if (consent.ongoing_communication) ongoing += 0.1;
  if (consent.consent_locked_in) ongoing -= 0.3;
  
  return Math.max(0, Math.min(1, ongoing));
}

function assessOptOutMechanisms(consent: any) {
  let optOut = 0.9; // Base score
  
  if (consent.easy_withdrawal) optOut += 0.1;
  if (consent.partial_opt_out) optOut += 0.05;
  if (consent.opt_out_barriers) optOut -= 0.3;
  if (consent.withdrawal_penalties) optOut -= 0.2;
  
  return Math.max(0, Math.min(1, optOut));
}

function identifyConsentBarriers(caseContext: any) {
  const barriers = [];
  
  if (caseContext.language_complexity) barriers.push("language_complexity");
  if (caseContext.cultural_unfamiliarity) barriers.push("cultural_barriers");
  if (caseContext.power_intimidation) barriers.push("intimidation_factors");
  if (caseContext.time_constraints) barriers.push("insufficient_time");
  if (caseContext.information_overload) barriers.push("information_complexity");
  
  return barriers;
}

function identifyFrameworkGaps(caseContext: any) {
  const gaps = [];
  
  gaps.push("ongoing_consent_mechanisms");
  gaps.push("cultural_consent_protocols");
  gaps.push("collective_vs_individual_consent");
  gaps.push("consent_capacity_assessment");
  gaps.push("consent_documentation_standards");
  
  return gaps;
}

function identifyConsentEnhancements(caseContext: any) {
  const enhancements = [];
  
  enhancements.push("multilingual_consent_materials");
  enhancements.push("cultural_consent_advisors");
  enhancements.push("consent_understanding_verification");
  enhancements.push("flexible_consent_timing");
  enhancements.push("consent_advocacy_support");
  
  return enhancements;
}

function generateMitigationRequirements(risks: any) {
  const requirements = [];
  
  if (risks.high_risk_count > 0) {
    requirements.push("immediate_sovereignty_review");
    requirements.push("risk_mitigation_protocols");
  }
  
  if (risks.override_indicators.length > 0) {
    requirements.push("agency_preservation_mechanisms");
    requirements.push("override_prevention_safeguards");
  }
  
  requirements.push("ongoing_sovereignty_monitoring");
  requirements.push("participant_empowerment_support");
  
  return requirements;
}
