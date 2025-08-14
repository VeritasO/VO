import { Agent } from "../types/Agent";

export const COSMA: Agent = {
  id: "A19",
  name: "COSMA",
  glyphs: ["🪐", "🔗", "🧭"],
  domain: "Multiscale Harmony Agent",
  description: "Focuses on aligning micro and macro scales of justice. Ensures coherence between individual cases and larger social patterns. Analyzes if resolution methods scale appropriately and connects emergent patterns across cases.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to assess multiscale harmony without case context"
      };
    }
    
    // Perform multiscale analysis
    const scaleAlignment = analyzeScaleAlignment(caseContext);
    const patternEmergence = detectEmergentPatterns(caseContext);
    const scalabilityAssessment = assessScalability(caseContext);
    const harmonyMetrics = calculateHarmonyMetrics(scaleAlignment, patternEmergence);
    
    memory.write(`${this.id}: multiscale_analysis - ${JSON.stringify({
      scaleAlignment,
      patternEmergence,
      scalabilityAssessment,
      harmonyMetrics,
      coherence_recommendations: generateCoherenceRecommendations(scaleAlignment, scalabilityAssessment),
      timestamp
    })}`);

    const actions = [];
    
    // Scale alignment corrections
    if (scaleAlignment.coherence_score < 0.6) {
      actions.push("Enhance micro-macro scale coherence");
      actions.push("Align individual and systemic approaches");
    }
    
    // Pattern integration
    if (patternEmergence.significant_patterns.length > 0) {
      actions.push("Address emergent systemic patterns");
      actions.push("Integrate pattern insights into case resolution");
    }
    
    // Scalability enhancement
    if (scalabilityAssessment.scalability_score < 0.7) {
      actions.push("Improve resolution method scalability");
      actions.push("Adapt approach for appropriate scale application");
    }
    
    // Harmony optimization
    if (harmonyMetrics.overall_harmony < 0.6) {
      actions.push("Optimize multiscale justice harmony");
      actions.push("Balance individual and collective justice needs");
    }
    
    // Cross-case pattern analysis
    if (patternEmergence.systemic_indicators.length > 2) {
      actions.push("Escalate systemic pattern findings to LIRA");
      actions.push("Recommend systemic intervention approaches");
    }
    
    // Scale-specific recommendations
    actions.push(...generateScaleSpecificActions(scaleAlignment, scalabilityAssessment));

    return {
      summary: `Multiscale analysis: ${Math.round(scaleAlignment.coherence_score * 100)}% coherence, ${patternEmergence.significant_patterns.length} emergent patterns`,
      actions,
      analysis: `Scalability: ${Math.round(scalabilityAssessment.scalability_score * 100)}%, harmony: ${Math.round(harmonyMetrics.overall_harmony * 100)}%`
    };
  },

  protocols: ["AuditCycle", "ReflectionSession"],
  webAccess: "none",
};

function analyzeScaleAlignment(caseContext: any) {
  const alignment = {
    coherence_score: 0.7,
    scale_tensions: [] as string[],
    alignment_factors: {} as Record<string, number>,
    scale_mapping: {} as Record<string, any>,
    integration_opportunities: [] as string[]
  };
  
  // Analyze different scale levels
  const scales = {
    individual: analyzeIndividualScale(caseContext),
    interpersonal: analyzeInterpersonalScale(caseContext),
    community: analyzeCommunityScale(caseContext),
    institutional: analyzeInstitutionalScale(caseContext),
    societal: analyzeSocietalScale(caseContext),
    global: analyzeGlobalScale(caseContext)
  };
  
  alignment.scale_mapping = scales;
  
  // Calculate coherence between scales
  let coherenceSum = 0;
  let comparisonCount = 0;
  
  const scaleKeys = Object.keys(scales);
  for (let i = 0; i < scaleKeys.length - 1; i++) {
    for (let j = i + 1; j < scaleKeys.length; j++) {
      const scale1 = scales[scaleKeys[i] as keyof typeof scales];
      const scale2 = scales[scaleKeys[j] as keyof typeof scales];
      const coherence = calculateScaleCoherence(scale1, scale2);
      coherenceSum += coherence;
      comparisonCount++;
      
      if (coherence < 0.5) {
        alignment.scale_tensions.push(`${scaleKeys[i]}_${scaleKeys[j]}_misalignment`);
      }
    }
  }
  
  alignment.coherence_score = comparisonCount > 0 ? coherenceSum / comparisonCount : 0.7;
  
  // Identify alignment factors
  alignment.alignment_factors = {
    value_consistency: calculateValueConsistency(scales),
    method_compatibility: calculateMethodCompatibility(scales),
    outcome_harmony: calculateOutcomeHarmony(scales),
    resource_alignment: calculateResourceAlignment(scales)
  };
  
  // Find integration opportunities
  alignment.integration_opportunities = identifyIntegrationOpportunities(scales, alignment);
  
  return alignment;
}

function detectEmergentPatterns(caseContext: any) {
  const patterns = {
    significant_patterns: [] as any[],
    pattern_strength: {} as Record<string, number>,
    systemic_indicators: [] as string[],
    cross_case_connections: [] as any[],
    pattern_implications: [] as string[]
  };
  
  // Analyze case patterns
  if (caseContext.case_history) {
    const history = caseContext.case_history;
    
    // Detect recurring themes
    const themePatterns = detectThemePatterns(history);
    patterns.significant_patterns.push(...themePatterns);
    
    // Detect systemic issues
    const systemicPatterns = detectSystemicPatterns(history);
    patterns.systemic_indicators.push(...systemicPatterns);
    
    // Cross-case connections
    patterns.cross_case_connections = identifyCrossCaseConnections(history);
  }
  
  // Current case pattern analysis
  if (caseContext.current_patterns) {
    const current = caseContext.current_patterns;
    
    // Individual-to-systemic patterns
    if (current.individual_issues_with_systemic_roots) {
      patterns.significant_patterns.push({
        type: "individual_systemic_connection",
        strength: 0.7,
        description: "Individual case reveals systemic issues"
      });
      patterns.systemic_indicators.push("systemic_root_causes");
    }
    
    // Micro-macro disconnects
    if (current.micro_macro_disconnect) {
      patterns.significant_patterns.push({
        type: "scale_disconnect",
        strength: 0.6,
        description: "Disconnect between micro and macro approaches"
      });
    }
    
    // Emerging justice needs
    if (current.new_justice_domains) {
      patterns.significant_patterns.push({
        type: "emerging_domain",
        strength: 0.5,
        description: "New domain of justice emerging"
      });
    }
  }
  
  // Calculate pattern strength
  patterns.significant_patterns.forEach(pattern => {
    patterns.pattern_strength[pattern.type] = pattern.strength;
  });
  
  // Generate implications
  patterns.pattern_implications = generatePatternImplications(patterns);
  
  return patterns;
}

function assessScalability(caseContext: any) {
  const assessment = {
    scalability_score: 0.7,
    scale_adaptability: {} as Record<string, number>,
    scaling_barriers: [] as string[],
    scaling_opportunities: [] as string[],
    optimal_scale: "community" as "individual" | "interpersonal" | "community" | "institutional" | "societal" | "global"
  };
  
  // Assess current approach scalability
  if (caseContext.resolution_approach) {
    const approach = caseContext.resolution_approach;
    
    // Evaluate scalability to different levels
    assessment.scale_adaptability = {
      individual: evaluateIndividualScalability(approach),
      interpersonal: evaluateInterpersonalScalability(approach),
      community: evaluateCommunityScalability(approach),
      institutional: evaluateInstitutionalScalability(approach),
      societal: evaluateSocietalScalability(approach),
      global: evaluateGlobalScalability(approach)
    };
    
    // Calculate overall scalability
    const adaptabilityValues = Object.values(assessment.scale_adaptability);
    assessment.scalability_score = adaptabilityValues.reduce((sum, val) => sum + val, 0) / adaptabilityValues.length;
    
    // Identify scaling barriers
    assessment.scaling_barriers = identifyScalingBarriers(approach, assessment.scale_adaptability);
    
    // Find scaling opportunities
    assessment.scaling_opportunities = identifyScalingOpportunities(approach, assessment.scale_adaptability);
    
    // Determine optimal scale
    assessment.optimal_scale = determineOptimalScale(assessment.scale_adaptability);
  }
  
  return assessment;
}

function calculateHarmonyMetrics(scaleAlignment: any, patternEmergence: any) {
  const metrics = {
    overall_harmony: 0.6,
    coherence_harmony: 0.7,
    pattern_harmony: 0.6,
    integration_harmony: 0.5,
    harmonic_resonance: 0.6
  };
  
  // Calculate coherence harmony
  metrics.coherence_harmony = scaleAlignment.coherence_score;
  
  // Calculate pattern harmony
  const patternStrengths = Object.values(patternEmergence.pattern_strength) as number[];
  if (patternStrengths.length > 0) {
    const avgPatternStrength = patternStrengths.reduce((sum, strength) => sum + strength, 0) / patternStrengths.length;
    metrics.pattern_harmony = 1 - Math.abs(0.5 - avgPatternStrength); // Optimal pattern strength around 0.5
  }
  
  // Calculate integration harmony
  const alignmentValues = Object.values(scaleAlignment.alignment_factors) as number[];
  metrics.integration_harmony = alignmentValues.reduce((sum, val) => sum + val, 0) / alignmentValues.length;
  
  // Calculate harmonic resonance (how well scales reinforce each other)
  metrics.harmonic_resonance = calculateHarmonicResonance(scaleAlignment.scale_mapping);
  
  // Calculate overall harmony
  metrics.overall_harmony = (
    metrics.coherence_harmony * 0.3 +
    metrics.pattern_harmony * 0.2 +
    metrics.integration_harmony * 0.3 +
    metrics.harmonic_resonance * 0.2
  );
  
  return metrics;
}

function generateCoherenceRecommendations(scaleAlignment: any, scalabilityAssessment: any) {
  const recommendations = [];
  
  // Address scale tensions
  scaleAlignment.scale_tensions.forEach((tension: string) => {
    const [scale1, scale2] = tension.split('_');
    recommendations.push(`Resolve ${scale1}-${scale2} alignment issues`);
    recommendations.push(`Bridge gap between ${scale1} and ${scale2} approaches`);
  });
  
  // Enhance scalability
  if (scalabilityAssessment.scalability_score < 0.7) {
    recommendations.push("Improve approach scalability across levels");
    scalabilityAssessment.scaling_barriers.forEach((barrier: string) => {
      recommendations.push(`Address ${barrier} scaling barrier`);
    });
  }
  
  // Leverage opportunities
  scaleAlignment.integration_opportunities.forEach((opportunity: string) => {
    recommendations.push(`Leverage ${opportunity} for better integration`);
  });
  
  scalabilityAssessment.scaling_opportunities.forEach((opportunity: string) => {
    recommendations.push(`Utilize ${opportunity} for enhanced scaling`);
  });
  
  return recommendations;
}

function generateScaleSpecificActions(scaleAlignment: any, scalabilityAssessment: any) {
  const actions = [];
  
  // Scale-specific interventions based on optimal scale
  switch (scalabilityAssessment.optimal_scale) {
    case "individual":
      actions.push("Focus on individual-level interventions");
      actions.push("Ensure individual approach connects to larger patterns");
      break;
    case "interpersonal":
      actions.push("Emphasize relationship-level solutions");
      actions.push("Scale interpersonal insights to community level");
      break;
    case "community":
      actions.push("Implement community-centered approaches");
      actions.push("Connect community solutions to institutional support");
      break;
    case "institutional":
      actions.push("Focus on institutional reform and change");
      actions.push("Ensure institutional changes serve individual needs");
      break;
    case "societal":
      actions.push("Address societal-level justice issues");
      actions.push("Ground societal changes in community realities");
      break;
    case "global":
      actions.push("Implement global-scale justice interventions");
      actions.push("Ensure global approaches respect local contexts");
      break;
  }
  
  // Address specific scale mapping issues
  Object.entries(scaleAlignment.scale_mapping).forEach(([scale, mapping]: [string, any]) => {
    if (mapping.effectiveness < 0.5) {
      actions.push(`Strengthen ${scale}-level effectiveness`);
    }
    if (mapping.resource_gaps) {
      actions.push(`Address ${scale}-level resource gaps`);
    }
  });
  
  return actions;
}

function analyzeIndividualScale(caseContext: any) {
  return {
    effectiveness: caseContext.individual_outcomes?.effectiveness || 0.7,
    resource_allocation: caseContext.individual_resources?.adequacy || 0.6,
    value_alignment: caseContext.individual_values?.alignment || 0.8,
    outcome_satisfaction: caseContext.individual_satisfaction || 0.7
  };
}

function analyzeInterpersonalScale(caseContext: any) {
  return {
    effectiveness: caseContext.relationship_outcomes?.effectiveness || 0.6,
    resource_allocation: caseContext.relationship_resources?.adequacy || 0.5,
    value_alignment: caseContext.relationship_values?.alignment || 0.7,
    outcome_satisfaction: caseContext.relationship_satisfaction || 0.6
  };
}

function analyzeCommunityScale(caseContext: any) {
  return {
    effectiveness: caseContext.community_outcomes?.effectiveness || 0.8,
    resource_allocation: caseContext.community_resources?.adequacy || 0.7,
    value_alignment: caseContext.community_values?.alignment || 0.8,
    outcome_satisfaction: caseContext.community_satisfaction || 0.7
  };
}

function analyzeInstitutionalScale(caseContext: any) {
  return {
    effectiveness: caseContext.institutional_outcomes?.effectiveness || 0.5,
    resource_allocation: caseContext.institutional_resources?.adequacy || 0.6,
    value_alignment: caseContext.institutional_values?.alignment || 0.6,
    outcome_satisfaction: caseContext.institutional_satisfaction || 0.5
  };
}

function analyzeSocietalScale(caseContext: any) {
  return {
    effectiveness: caseContext.societal_outcomes?.effectiveness || 0.4,
    resource_allocation: caseContext.societal_resources?.adequacy || 0.5,
    value_alignment: caseContext.societal_values?.alignment || 0.5,
    outcome_satisfaction: caseContext.societal_satisfaction || 0.4
  };
}

function analyzeGlobalScale(caseContext: any) {
  return {
    effectiveness: caseContext.global_outcomes?.effectiveness || 0.3,
    resource_allocation: caseContext.global_resources?.adequacy || 0.4,
    value_alignment: caseContext.global_values?.alignment || 0.6,
    outcome_satisfaction: caseContext.global_satisfaction || 0.3
  };
}

function calculateScaleCoherence(scale1: any, scale2: any) {
  const effectivenessDiff = Math.abs(scale1.effectiveness - scale2.effectiveness);
  const resourceDiff = Math.abs(scale1.resource_allocation - scale2.resource_allocation);
  const valueDiff = Math.abs(scale1.value_alignment - scale2.value_alignment);
  const satisfactionDiff = Math.abs(scale1.outcome_satisfaction - scale2.outcome_satisfaction);
  
  const avgDifference = (effectivenessDiff + resourceDiff + valueDiff + satisfactionDiff) / 4;
  return 1 - avgDifference; // Higher coherence = lower difference
}

function calculateValueConsistency(scales: any) {
  const valueAlignments = Object.values(scales).map((scale: any) => scale.value_alignment);
  const avgAlignment = valueAlignments.reduce((sum, val) => sum + val, 0) / valueAlignments.length;
  const variance = valueAlignments.reduce((sum, val) => sum + Math.pow(val - avgAlignment, 2), 0) / valueAlignments.length;
  return 1 - Math.sqrt(variance); // Higher consistency = lower variance
}

function calculateMethodCompatibility(scales: any) {
  const effectiveness = Object.values(scales).map((scale: any) => scale.effectiveness);
  const avgEffectiveness = effectiveness.reduce((sum, val) => sum + val, 0) / effectiveness.length;
  return avgEffectiveness; // Simple average for now
}

function calculateOutcomeHarmony(scales: any) {
  const satisfactions = Object.values(scales).map((scale: any) => scale.outcome_satisfaction);
  const avgSatisfaction = satisfactions.reduce((sum, val) => sum + val, 0) / satisfactions.length;
  const variance = satisfactions.reduce((sum, val) => sum + Math.pow(val - avgSatisfaction, 2), 0) / satisfactions.length;
  return avgSatisfaction * (1 - Math.sqrt(variance)); // High average, low variance
}

function calculateResourceAlignment(scales: any) {
  const resources = Object.values(scales).map((scale: any) => scale.resource_allocation);
  const avgResource = resources.reduce((sum, val) => sum + val, 0) / resources.length;
  return avgResource;
}

function identifyIntegrationOpportunities(scales: any, alignment: any) {
  const opportunities = [];
  
  // High-performing scales can support low-performing ones
  const scalePerformance = Object.entries(scales).map(([name, scale]: [string, any]) => ({
    name,
    performance: (scale.effectiveness + scale.resource_allocation + scale.value_alignment + scale.outcome_satisfaction) / 4
  }));
  
  const highPerforming = scalePerformance.filter(s => s.performance > 0.7);
  const lowPerforming = scalePerformance.filter(s => s.performance < 0.5);
  
  if (highPerforming.length > 0 && lowPerforming.length > 0) {
    opportunities.push("cross_scale_resource_sharing");
    opportunities.push("best_practice_scaling");
  }
  
  // Value alignment opportunities
  if (alignment.alignment_factors.value_consistency > 0.7) {
    opportunities.push("value_based_integration");
  }
  
  // Method compatibility opportunities
  if (alignment.alignment_factors.method_compatibility > 0.6) {
    opportunities.push("method_standardization");
  }
  
  return opportunities;
}

function detectThemePatterns(history: any) {
  const patterns: any[] = [];
  
  if (history.recurring_themes) {
    history.recurring_themes.forEach((theme: any) => {
      if (theme.frequency > 0.3) {
        patterns.push({
          type: "recurring_theme",
          strength: theme.frequency,
          description: `Recurring theme: ${theme.name}`
        });
      }
    });
  }
  
  return patterns;
}

function detectSystemicPatterns(history: any) {
  const indicators: any[] = [];
  
  if (history.systemic_issues) {
    history.systemic_issues.forEach((issue: any) => {
      if (issue.prevalence > 0.4) {
        indicators.push(issue.type);
      }
    });
  }
  
  return indicators;
}

function identifyCrossCaseConnections(history: any) {
  return history.case_connections || [];
}

function generatePatternImplications(patterns: any) {
  const implications = [];
  
  patterns.significant_patterns.forEach((pattern: any) => {
    switch (pattern.type) {
      case "individual_systemic_connection":
        implications.push("Individual cases reflect systemic issues requiring broader intervention");
        break;
      case "scale_disconnect":
        implications.push("Need to bridge micro-macro approaches for coherent justice");
        break;
      case "emerging_domain":
        implications.push("New justice domain requires framework development");
        break;
      case "recurring_theme":
        implications.push("Recurring patterns suggest need for preventive measures");
        break;
    }
  });
  
  if (patterns.systemic_indicators.length > 2) {
    implications.push("Multiple systemic indicators suggest need for structural reform");
  }
  
  return implications;
}

function evaluateIndividualScalability(approach: any) {
  let scalability = 0.8; // Base scalability for individual level
  
  if (approach.person_specific_elements) scalability -= 0.2;
  if (approach.standardizable_methods) scalability += 0.1;
  if (approach.resource_intensive) scalability -= 0.3;
  
  return Math.max(0, Math.min(1, scalability));
}

function evaluateInterpersonalScalability(approach: any) {
  let scalability = 0.7;
  
  if (approach.relationship_specific) scalability -= 0.1;
  if (approach.communication_focused) scalability += 0.2;
  if (approach.mediation_required) scalability -= 0.2;
  
  return Math.max(0, Math.min(1, scalability));
}

function evaluateCommunityScalability(approach: any) {
  let scalability = 0.8;
  
  if (approach.community_inclusive) scalability += 0.1;
  if (approach.cultural_specific) scalability -= 0.2;
  if (approach.participatory_methods) scalability += 0.1;
  
  return Math.max(0, Math.min(1, scalability));
}

function evaluateInstitutionalScalability(approach: any) {
  let scalability = 0.5;
  
  if (approach.policy_adaptable) scalability += 0.3;
  if (approach.bureaucratic_compatible) scalability += 0.2;
  if (approach.institutional_resistance) scalability -= 0.3;
  
  return Math.max(0, Math.min(1, scalability));
}

function evaluateSocietalScalability(approach: any) {
  let scalability = 0.4;
  
  if (approach.broadly_applicable) scalability += 0.3;
  if (approach.cultural_universal) scalability += 0.2;
  if (approach.resource_demanding) scalability -= 0.4;
  
  return Math.max(0, Math.min(1, scalability));
}

function evaluateGlobalScalability(approach: any) {
  let scalability = 0.3;
  
  if (approach.universally_applicable) scalability += 0.4;
  if (approach.cross_cultural_compatible) scalability += 0.2;
  if (approach.jurisdiction_dependent) scalability -= 0.3;
  
  return Math.max(0, Math.min(1, scalability));
}

function identifyScalingBarriers(approach: any, adaptability: any) {
  const barriers = [];
  
  Object.entries(adaptability).forEach(([scale, score]: [string, any]) => {
    if (score < 0.5) {
      barriers.push(`${scale}_level_adaptation`);
    }
  });
  
  if (approach.resource_intensive) barriers.push("resource_requirements");
  if (approach.specialized_skills_needed) barriers.push("skill_requirements");
  if (approach.cultural_specificity) barriers.push("cultural_barriers");
  
  return barriers;
}

function identifyScalingOpportunities(approach: any, adaptability: any) {
  const opportunities = [];
  
  Object.entries(adaptability).forEach(([scale, score]: [string, any]) => {
    if (score > 0.7) {
      opportunities.push(`${scale}_level_expansion`);
    }
  });
  
  if (approach.modular_design) opportunities.push("modular_scaling");
  if (approach.technology_enabled) opportunities.push("digital_scaling");
  if (approach.network_effects) opportunities.push("network_scaling");
  
  return opportunities;
}

function determineOptimalScale(adaptability: any) {
  let optimalScale = "community";
  let highestScore = 0;
  
  Object.entries(adaptability).forEach(([scale, score]: [string, any]) => {
    if (score > highestScore) {
      highestScore = score;
      optimalScale = scale;
    }
  });
  
  return optimalScale as "individual" | "interpersonal" | "community" | "institutional" | "societal" | "global";
}

function calculateHarmonicResonance(scaleMapping: any) {
  // Calculate how well scales reinforce and support each other
  let resonance = 0.6; // Base resonance
  
  const scales = Object.values(scaleMapping);
  let mutualSupport = 0;
  let comparisonCount = 0;
  
  for (let i = 0; i < scales.length - 1; i++) {
    for (let j = i + 1; j < scales.length; j++) {
      const scale1 = scales[i] as any;
      const scale2 = scales[j] as any;
      
      // Scales resonate when they have similar patterns
      const resourceResonance = 1 - Math.abs(scale1.resource_allocation - scale2.resource_allocation);
      const valueResonance = 1 - Math.abs(scale1.value_alignment - scale2.value_alignment);
      const effectivenessResonance = 1 - Math.abs(scale1.effectiveness - scale2.effectiveness);
      
      const pairResonance = (resourceResonance + valueResonance + effectivenessResonance) / 3;
      mutualSupport += pairResonance;
      comparisonCount++;
    }
  }
  
  if (comparisonCount > 0) {
    resonance = mutualSupport / comparisonCount;
  }
  
  return resonance;
}
