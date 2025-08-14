import { Agent } from "../types/Agent";

export const LIRA: Agent = {
  id: "A15",
  name: "LIRA",
  glyphs: ["🔄", "🎚️", "🗜️"],
  domain: "Justice Scaling Engine",
  description: "Deals with logical parity and scaling of justice. Ensures that the severity of responses is scaled appropriately to the harm and context. Provides dynamic calibration for justice tiers and maintains multi-case consistency.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to perform justice scaling without case context"
      };
    }
    
    // Perform justice scaling analysis
    const severityAssessment = assessHarmSeverity(caseContext);
    const contextualFactors = evaluateContextualFactors(caseContext);
    const responseCalibration = calibrateResponseSeverity(severityAssessment, contextualFactors);
    const consistencyCheck = performConsistencyCheck(caseContext, responseCalibration);
    
    memory.write(`${this.id}: justice_scaling - ${JSON.stringify({
      severityAssessment,
      contextualFactors,
      responseCalibration,
      consistencyCheck,
      scaling_recommendations: generateScalingRecommendations(responseCalibration, consistencyCheck),
      timestamp
    })}`);

    const actions = [];
    
    // Consistency corrections
    if (consistencyCheck.inconsistency_count > 0) {
      actions.push("Flag inconsistent justice scaling across similar cases");
      actions.push("Recommend consistency adjustments");
    }
    
    // Response calibration
    if (responseCalibration.calibration_needed) {
      actions.push(`Adjust response severity to ${responseCalibration.recommended_tier}`);
      actions.push("Implement dynamic justice calibration");
    }
    
    // Scale portability assessment
    if (contextualFactors.scale_mismatch) {
      actions.push("Assess justice logic portability across scales");
      actions.push("Adapt justice approach for appropriate scale");
    }
    
    // Proportionality verification
    if (responseCalibration.proportionality_score < 0.7) {
      actions.push("Enhance proportionality between harm and response");
      actions.push("Recalibrate justice tier assignment");
    }
    
    // Multi-case pattern analysis
    if (consistencyCheck.pattern_deviation > 0.3) {
      actions.push("Analyze justice pattern deviations");
      actions.push("Update scaling algorithms for consistency");
    }

    return {
      summary: `Justice scaling: ${responseCalibration.recommended_tier} tier, proportionality ${Math.round(responseCalibration.proportionality_score * 100)}%`,
      actions,
      analysis: `Harm severity: ${severityAssessment.severity_level}, consistency check: ${consistencyCheck.inconsistency_count} discrepancies`
    };
  },

  protocols: ["AuditCycle", "DoctrineReview"],
  webAccess: "none",
};

function assessHarmSeverity(caseContext: any) {
  const assessment = {
    severity_level: "medium" as "low" | "medium" | "high" | "critical",
    harm_dimensions: {} as Record<string, number>,
    aggregate_severity: 0.5,
    severity_factors: [] as string[],
    temporal_persistence: 0.5,
    scope_of_impact: 0.5
  };
  
  // Assess different dimensions of harm
  const dimensions = {
    physical_harm: assessPhysicalHarm(caseContext),
    emotional_harm: assessEmotionalHarm(caseContext),
    social_harm: assessSocialHarm(caseContext),
    economic_harm: assessEconomicHarm(caseContext),
    environmental_harm: assessEnvironmentalHarm(caseContext),
    cultural_harm: assessCulturalHarm(caseContext),
    systemic_harm: assessSystemicHarm(caseContext)
  };
  
  assessment.harm_dimensions = dimensions;
  
  // Calculate aggregate severity
  const harmValues = Object.values(dimensions);
  assessment.aggregate_severity = harmValues.reduce((sum, val) => sum + val, 0) / harmValues.length;
  
  // Determine severity level
  if (assessment.aggregate_severity >= 0.8) {
    assessment.severity_level = "critical";
  } else if (assessment.aggregate_severity >= 0.6) {
    assessment.severity_level = "high";
  } else if (assessment.aggregate_severity >= 0.3) {
    assessment.severity_level = "medium";
  } else {
    assessment.severity_level = "low";
  }
  
  // Identify key severity factors
  Object.entries(dimensions).forEach(([dimension, value]) => {
    if (value > 0.6) {
      assessment.severity_factors.push(dimension);
    }
  });
  
  // Assess temporal persistence
  assessment.temporal_persistence = assessTemporalPersistence(caseContext);
  
  // Assess scope of impact
  assessment.scope_of_impact = assessScopeOfImpact(caseContext);
  
  return assessment;
}

function evaluateContextualFactors(caseContext: any) {
  const factors = {
    vulnerability_multipliers: [] as string[],
    mitigating_circumstances: [] as string[],
    aggravating_circumstances: [] as string[],
    cultural_context_weight: 0.5,
    historical_context_weight: 0.5,
    systemic_context_weight: 0.5,
    scale_mismatch: false,
    context_complexity: 0.5
  };
  
  // Identify vulnerability multipliers
  if (caseContext.vulnerable_populations) {
    factors.vulnerability_multipliers = identifyVulnerabilityMultipliers(caseContext.vulnerable_populations);
  }
  
  // Assess mitigating circumstances
  factors.mitigating_circumstances = identifyMitigatingCircumstances(caseContext);
  
  // Assess aggravating circumstances
  factors.aggravating_circumstances = identifyAggravatingCircumstances(caseContext);
  
  // Evaluate contextual weights
  factors.cultural_context_weight = evaluateCulturalContext(caseContext);
  factors.historical_context_weight = evaluateHistoricalContext(caseContext);
  factors.systemic_context_weight = evaluateSystemicContext(caseContext);
  
  // Check for scale mismatches
  factors.scale_mismatch = checkScaleMismatch(caseContext);
  
  // Calculate context complexity
  factors.context_complexity = calculateContextComplexity(factors);
  
  return factors;
}

function calibrateResponseSeverity(severityAssessment: any, contextualFactors: any) {
  const calibration = {
    base_severity: severityAssessment.aggregate_severity,
    adjusted_severity: 0.5,
    recommended_tier: "restorative" as "educational" | "restorative" | "corrective" | "protective" | "systemic",
    proportionality_score: 0.7,
    calibration_needed: false,
    adjustment_factors: [] as string[]
  };
  
  let adjustedSeverity = severityAssessment.aggregate_severity;
  
  // Apply vulnerability multipliers
  contextualFactors.vulnerability_multipliers.forEach((multiplier: string) => {
    adjustedSeverity += 0.1;
    calibration.adjustment_factors.push(`vulnerability_${multiplier}`);
  });
  
  // Apply aggravating circumstances
  contextualFactors.aggravating_circumstances.forEach((factor: string) => {
    adjustedSeverity += 0.15;
    calibration.adjustment_factors.push(`aggravating_${factor}`);
  });
  
  // Apply mitigating circumstances
  contextualFactors.mitigating_circumstances.forEach((factor: string) => {
    adjustedSeverity -= 0.1;
    calibration.adjustment_factors.push(`mitigating_${factor}`);
  });
  
  // Apply contextual weights
  const contextualAdjustment = (
    contextualFactors.cultural_context_weight * 0.1 +
    contextualFactors.historical_context_weight * 0.1 +
    contextualFactors.systemic_context_weight * 0.15
  );
  adjustedSeverity += contextualAdjustment;
  
  // Normalize adjusted severity
  calibration.adjusted_severity = Math.max(0, Math.min(1, adjustedSeverity));
  
  // Determine recommended tier
  calibration.recommended_tier = determineJusticeTier(calibration.adjusted_severity, contextualFactors);
  
  // Calculate proportionality
  calibration.proportionality_score = calculateProportionality(severityAssessment, calibration);
  
  // Determine if calibration is needed
  calibration.calibration_needed = Math.abs(calibration.adjusted_severity - calibration.base_severity) > 0.2;
  
  return calibration;
}

function performConsistencyCheck(caseContext: any, responseCalibration: any) {
  const check = {
    similar_cases: [] as any[],
    inconsistency_count: 0,
    pattern_deviation: 0.0,
    consistency_score: 0.8,
    recommended_adjustments: [] as string[]
  };
  
  // Find similar cases for comparison
  check.similar_cases = findSimilarCases(caseContext);
  
  // Compare response calibrations
  check.similar_cases.forEach(similarCase => {
    const comparison = compareResponseCalibration(responseCalibration, similarCase.response_calibration);
    if (comparison.inconsistent) {
      check.inconsistency_count++;
      check.recommended_adjustments.push(comparison.adjustment_recommendation);
    }
  });
  
  // Calculate pattern deviation
  if (check.similar_cases.length > 0) {
    check.pattern_deviation = calculatePatternDeviation(responseCalibration, check.similar_cases);
  }
  
  // Calculate overall consistency score
  check.consistency_score = calculateConsistencyScore(check);
  
  return check;
}

function generateScalingRecommendations(responseCalibration: any, consistencyCheck: any) {
  const recommendations = [];
  
  // Tier-specific recommendations
  switch (responseCalibration.recommended_tier) {
    case "educational":
      recommendations.push("Implement educational intervention approach");
      recommendations.push("Focus on awareness and understanding building");
      break;
    case "restorative":
      recommendations.push("Apply restorative justice processes");
      recommendations.push("Emphasize relationship repair and community healing");
      break;
    case "corrective":
      recommendations.push("Implement corrective measures with accountability");
      recommendations.push("Balance accountability with restoration");
      break;
    case "protective":
      recommendations.push("Prioritize protective measures for vulnerable parties");
      recommendations.push("Implement immediate safety interventions");
      break;
    case "systemic":
      recommendations.push("Address systemic causes and structural changes");
      recommendations.push("Implement comprehensive systemic interventions");
      break;
  }
  
  // Consistency recommendations
  if (consistencyCheck.inconsistency_count > 0) {
    recommendations.push("Review and align with similar case precedents");
    recommendations.push("Adjust scaling to maintain system consistency");
  }
  
  // Proportionality recommendations
  if (responseCalibration.proportionality_score < 0.7) {
    recommendations.push("Enhance proportionality between harm and response");
    recommendations.push("Recalibrate response intensity");
  }
  
  return recommendations;
}

function assessPhysicalHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.physical_injuries) {
    harm += caseContext.physical_injuries.severity * 0.8;
  }
  
  if (caseContext.health_impacts) {
    harm += caseContext.health_impacts.severity * 0.6;
  }
  
  if (caseContext.safety_threats) {
    harm += caseContext.safety_threats.severity * 0.4;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessEmotionalHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.psychological_trauma) {
    harm += caseContext.psychological_trauma.severity * 0.7;
  }
  
  if (caseContext.emotional_distress) {
    harm += caseContext.emotional_distress.severity * 0.5;
  }
  
  if (caseContext.dignity_violations) {
    harm += caseContext.dignity_violations.severity * 0.6;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessSocialHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.relationship_damage) {
    harm += caseContext.relationship_damage.severity * 0.6;
  }
  
  if (caseContext.community_disruption) {
    harm += caseContext.community_disruption.severity * 0.7;
  }
  
  if (caseContext.social_isolation) {
    harm += caseContext.social_isolation.severity * 0.5;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessEconomicHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.financial_loss) {
    harm += Math.min(caseContext.financial_loss.amount / 100000, 1) * 0.6; // Normalized to $100k
  }
  
  if (caseContext.livelihood_impact) {
    harm += caseContext.livelihood_impact.severity * 0.8;
  }
  
  if (caseContext.economic_opportunity_loss) {
    harm += caseContext.economic_opportunity_loss.severity * 0.5;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessEnvironmentalHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.environmental_damage) {
    harm += caseContext.environmental_damage.severity * 0.8;
  }
  
  if (caseContext.ecosystem_disruption) {
    harm += caseContext.ecosystem_disruption.severity * 0.7;
  }
  
  if (caseContext.pollution_impacts) {
    harm += caseContext.pollution_impacts.severity * 0.6;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessCulturalHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.cultural_violations) {
    harm += caseContext.cultural_violations.severity * 0.8;
  }
  
  if (caseContext.traditional_knowledge_harm) {
    harm += caseContext.traditional_knowledge_harm.severity * 0.7;
  }
  
  if (caseContext.cultural_identity_damage) {
    harm += caseContext.cultural_identity_damage.severity * 0.6;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessSystemicHarm(caseContext: any) {
  let harm = 0.0;
  
  if (caseContext.institutional_damage) {
    harm += caseContext.institutional_damage.severity * 0.7;
  }
  
  if (caseContext.trust_erosion) {
    harm += caseContext.trust_erosion.severity * 0.6;
  }
  
  if (caseContext.systemic_inequality_perpetuation) {
    harm += caseContext.systemic_inequality_perpetuation.severity * 0.8;
  }
  
  return Math.max(0, Math.min(1, harm));
}

function assessTemporalPersistence(caseContext: any) {
  let persistence = 0.5; // Base score
  
  if (caseContext.long_term_impacts) {
    persistence += caseContext.long_term_impacts.duration_factor * 0.3;
  }
  
  if (caseContext.intergenerational_effects) {
    persistence += 0.4;
  }
  
  if (caseContext.reversibility) {
    persistence -= caseContext.reversibility.ease_factor * 0.2;
  }
  
  return Math.max(0, Math.min(1, persistence));
}

function assessScopeOfImpact(caseContext: any) {
  let scope = 0.5; // Base score
  
  if (caseContext.affected_population_size) {
    scope += Math.min(caseContext.affected_population_size / 1000, 0.3); // Normalized
  }
  
  if (caseContext.geographic_spread) {
    scope += caseContext.geographic_spread.extent_factor * 0.2;
  }
  
  if (caseContext.network_effects) {
    scope += caseContext.network_effects.amplification_factor * 0.3;
  }
  
  return Math.max(0, Math.min(1, scope));
}

function identifyVulnerabilityMultipliers(vulnerablePopulations: any) {
  const multipliers = [];
  
  if (vulnerablePopulations.children) multipliers.push("children");
  if (vulnerablePopulations.elderly) multipliers.push("elderly");
  if (vulnerablePopulations.disabled) multipliers.push("disabled");
  if (vulnerablePopulations.marginalized_communities) multipliers.push("marginalized");
  if (vulnerablePopulations.trauma_survivors) multipliers.push("trauma_survivors");
  
  return multipliers;
}

function identifyMitigatingCircumstances(caseContext: any) {
  const circumstances = [];
  
  if (caseContext.genuine_remorse) circumstances.push("genuine_remorse");
  if (caseContext.voluntary_disclosure) circumstances.push("voluntary_disclosure");
  if (caseContext.cooperation_with_process) circumstances.push("cooperation");
  if (caseContext.attempts_at_repair) circumstances.push("repair_attempts");
  if (caseContext.first_offense) circumstances.push("first_offense");
  if (caseContext.duress_factors) circumstances.push("duress");
  
  return circumstances;
}

function identifyAggravatingCircumstances(caseContext: any) {
  const circumstances = [];
  
  if (caseContext.premeditation) circumstances.push("premeditation");
  if (caseContext.pattern_of_behavior) circumstances.push("pattern");
  if (caseContext.abuse_of_trust) circumstances.push("trust_abuse");
  if (caseContext.lack_of_remorse) circumstances.push("no_remorse");
  if (caseContext.additional_violations) circumstances.push("multiple_violations");
  if (caseContext.obstruction_of_justice) circumstances.push("obstruction");
  
  return circumstances;
}

function evaluateCulturalContext(caseContext: any) {
  let weight = 0.5; // Base weight
  
  if (caseContext.cultural_significance) {
    weight += caseContext.cultural_significance.importance_factor * 0.3;
  }
  
  if (caseContext.traditional_practices_involved) {
    weight += 0.2;
  }
  
  if (caseContext.cultural_misunderstanding) {
    weight += 0.2;
  }
  
  return Math.max(0, Math.min(1, weight));
}

function evaluateHistoricalContext(caseContext: any) {
  let weight = 0.5; // Base weight
  
  if (caseContext.historical_injustices) {
    weight += caseContext.historical_injustices.relevance_factor * 0.3;
  }
  
  if (caseContext.intergenerational_trauma) {
    weight += 0.3;
  }
  
  if (caseContext.systemic_discrimination_history) {
    weight += 0.2;
  }
  
  return Math.max(0, Math.min(1, weight));
}

function evaluateSystemicContext(caseContext: any) {
  let weight = 0.5; // Base weight
  
  if (caseContext.structural_inequalities) {
    weight += caseContext.structural_inequalities.severity * 0.4;
  }
  
  if (caseContext.institutional_failures) {
    weight += 0.3;
  }
  
  if (caseContext.systemic_pattern) {
    weight += 0.2;
  }
  
  return Math.max(0, Math.min(1, weight));
}

function checkScaleMismatch(caseContext: any) {
  if (caseContext.individual_issue && caseContext.systemic_implications) {
    return true; // Individual case with systemic implications
  }
  
  if (caseContext.local_case && caseContext.global_relevance) {
    return true; // Local case with global implications
  }
  
  if (caseContext.immediate_harm && caseContext.long_term_consequences) {
    return true; // Immediate harm with long-term implications
  }
  
  return false;
}

function calculateContextComplexity(factors: any) {
  let complexity = 0.3; // Base complexity
  
  complexity += factors.vulnerability_multipliers.length * 0.1;
  complexity += factors.mitigating_circumstances.length * 0.05;
  complexity += factors.aggravating_circumstances.length * 0.05;
  complexity += (factors.cultural_context_weight + factors.historical_context_weight + factors.systemic_context_weight) / 3 * 0.3;
  
  if (factors.scale_mismatch) {
    complexity += 0.2;
  }
  
  return Math.max(0, Math.min(1, complexity));
}

function determineJusticeTier(adjustedSeverity: number, contextualFactors: any) {
  if (adjustedSeverity >= 0.8 || contextualFactors.systemic_context_weight > 0.7) {
    return "systemic";
  } else if (adjustedSeverity >= 0.6 || contextualFactors.vulnerability_multipliers.length > 2) {
    return "protective";
  } else if (adjustedSeverity >= 0.4) {
    return "corrective";
  } else if (adjustedSeverity >= 0.2) {
    return "restorative";
  } else {
    return "educational";
  }
}

function calculateProportionality(severityAssessment: any, calibration: any) {
  const harmSeverity = severityAssessment.aggregate_severity;
  const responseSeverity = calibration.adjusted_severity;
  
  // Ideal proportionality is 1:1, but some variation is acceptable
  const proportionalityRatio = Math.min(responseSeverity / harmSeverity, harmSeverity / responseSeverity);
  
  return proportionalityRatio;
}

function findSimilarCases(caseContext: any) {
  // Simulated similar case finding
  return [
    {
      id: "case_001",
      harm_profile: { aggregate_severity: 0.6, primary_harm: "emotional" },
      response_calibration: { recommended_tier: "restorative", adjusted_severity: 0.55 }
    },
    {
      id: "case_002", 
      harm_profile: { aggregate_severity: 0.65, primary_harm: "social" },
      response_calibration: { recommended_tier: "corrective", adjusted_severity: 0.7 }
    }
  ];
}

function compareResponseCalibration(current: any, similar: any) {
  const severityDifference = Math.abs(current.adjusted_severity - similar.adjusted_severity);
  const tierMismatch = current.recommended_tier !== similar.recommended_tier;
  
  return {
    inconsistent: severityDifference > 0.2 || tierMismatch,
    adjustment_recommendation: severityDifference > 0.2 ? 
      `Adjust severity to align with similar case (difference: ${severityDifference.toFixed(2)})` :
      `Consider tier alignment with similar cases`
  };
}

function calculatePatternDeviation(current: any, similarCases: any[]) {
  if (similarCases.length === 0) return 0;
  
  const averageSeverity = similarCases.reduce((sum, case_) => 
    sum + case_.response_calibration.adjusted_severity, 0) / similarCases.length;
  
  return Math.abs(current.adjusted_severity - averageSeverity);
}

function calculateConsistencyScore(check: any) {
  let score = 1.0; // Perfect consistency baseline
  
  score -= check.inconsistency_count * 0.2;
  score -= check.pattern_deviation * 0.3;
  
  return Math.max(0, Math.min(1, score));
}
