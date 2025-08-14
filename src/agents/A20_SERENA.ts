import { Agent } from "../types/Agent";

export const SERENA: Agent = {
  id: "A20",
  name: "SERENA",
  glyphs: ["🕊️", "🌊", "🧘"],
  domain: "Peace & Co-Regulation Agent",
  description: "Represents peaceful resolution and emotional calming. Prioritizes de-escalation and emotional regulation. Activates when tensions are high and cooling is needed before proceeding.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to assess peace and co-regulation needs without case context"
      };
    }
    
    // Assess emotional and conflict state
    const tensionAssessment = assessTensionLevels(caseContext);
    const emotionalState = analyzeEmotionalClimate(caseContext);
    const conflictDynamics = evaluateConflictDynamics(caseContext);
    const regulationNeeds = identifyRegulationNeeds(tensionAssessment, emotionalState);
    
    memory.write(`${this.id}: peace_coregulation_analysis - ${JSON.stringify({
      tensionAssessment,
      emotionalState,
      conflictDynamics,
      regulationNeeds,
      peace_interventions: generatePeaceInterventions(tensionAssessment, conflictDynamics),
      timestamp
    })}`);

    const actions = [];
    
    // High tension interventions
    if (tensionAssessment.overall_tension > 0.7) {
      actions.push("Implement immediate de-escalation protocols");
      actions.push("Pause proceedings for cooling period");
      actions.push("Activate emotional regulation support");
    }
    
    // Emotional climate stabilization
    if (emotionalState.volatility > 0.6) {
      actions.push("Stabilize emotional climate");
      actions.push("Provide grounding and centering support");
      actions.push("Facilitate emotional co-regulation");
    }
    
    // Conflict dynamics management
    if (conflictDynamics.escalation_risk > 0.6) {
      actions.push("Address escalation risk factors");
      actions.push("Implement conflict transformation methods");
      actions.push("Establish safety and respect boundaries");
    }
    
    // Co-regulation facilitation
    if (regulationNeeds.coregulation_required) {
      actions.push("Facilitate group emotional regulation");
      actions.push("Establish synchronous breathing or grounding");
      actions.push("Create supportive witnessing space");
    }
    
    // Peace-building initiatives
    if (tensionAssessment.peace_building_opportunities.length > 0) {
      actions.push("Initiate peace-building processes");
      actions.push("Foster mutual understanding and empathy");
      actions.push("Create conditions for reconciliation");
    }
    
    // Preventive peace measures
    if (conflictDynamics.prevention_needed) {
      actions.push("Implement preventive peace measures");
      actions.push("Strengthen communication protocols");
      actions.push("Build resilience for future conflicts");
    }
    
    // Coordination with other agents
    if (tensionAssessment.overall_tension > 0.8) {
      actions.push("Coordinate with TEMPER for pressure relief");
      actions.push("Request ANIMA support for somatic regulation");
    }
    
    // Peaceful resolution pathway
    actions.push(...generatePeacefulResolutionActions(emotionalState, conflictDynamics));

    return {
      summary: `Peace assessment: ${Math.round((1 - tensionAssessment.overall_tension) * 100)}% calm, ${Math.round(emotionalState.regulation_capacity * 100)}% regulation capacity`,
      actions,
      analysis: `Volatility: ${Math.round(emotionalState.volatility * 100)}%, escalation risk: ${Math.round(conflictDynamics.escalation_risk * 100)}%`
    };
  },

  protocols: ["GriefClosureSequence", "SanctuaryLock"],
  webAccess: "none",
};

function assessTensionLevels(caseContext: any) {
  const assessment = {
    overall_tension: 0.5,
    tension_sources: [] as string[],
    tension_distribution: {} as Record<string, number>,
    peace_building_opportunities: [] as string[],
    cooling_requirements: {} as Record<string, any>
  };
  
  // Analyze different tension sources
  const tensionSources = {
    interpersonal: assessInterpersonalTension(caseContext),
    emotional: assessEmotionalTension(caseContext),
    structural: assessStructuralTension(caseContext),
    procedural: assessProceduralTension(caseContext),
    systemic: assessSystemicTension(caseContext)
  };
  
  assessment.tension_distribution = tensionSources;
  
  // Calculate overall tension
  const tensionValues = Object.values(tensionSources);
  assessment.overall_tension = tensionValues.reduce((sum, val) => sum + val, 0) / tensionValues.length;
  
  // Identify primary tension sources
  Object.entries(tensionSources).forEach(([source, level]) => {
    if (level > 0.6) {
      assessment.tension_sources.push(source);
    }
  });
  
  // Identify peace-building opportunities
  if (caseContext.shared_values) assessment.peace_building_opportunities.push("shared_values_foundation");
  if (caseContext.mutual_interests) assessment.peace_building_opportunities.push("mutual_interest_alignment");
  if (caseContext.common_goals) assessment.peace_building_opportunities.push("common_goal_focusing");
  if (caseContext.relationship_history?.positive_elements) assessment.peace_building_opportunities.push("positive_history_building");
  
  // Determine cooling requirements
  assessment.cooling_requirements = determineCoolingRequirements(tensionSources, caseContext);
  
  return assessment;
}

function analyzeEmotionalClimate(caseContext: any) {
  const climate = {
    dominant_emotions: [] as string[],
    emotional_intensity: 0.6,
    volatility: 0.5,
    regulation_capacity: 0.7,
    collective_state: "mixed" as "calm" | "agitated" | "mixed" | "escalated",
    coregulation_potential: 0.6
  };
  
  // Analyze current emotional state
  if (caseContext.emotional_data) {
    const emotions = caseContext.emotional_data;
    
    // Dominant emotions
    climate.dominant_emotions = identifyDominantEmotions(emotions);
    
    // Emotional intensity
    climate.emotional_intensity = calculateEmotionalIntensity(emotions);
    
    // Volatility (rate of emotional change)
    climate.volatility = calculateEmotionalVolatility(emotions);
    
    // Current regulation capacity
    climate.regulation_capacity = assessRegulationCapacity(emotions, caseContext);
    
    // Collective emotional state
    climate.collective_state = determineCollectiveState(emotions);
    
    // Co-regulation potential
    climate.coregulation_potential = assessCoregulationPotential(emotions, caseContext);
  }
  
  // Environmental emotional factors
  if (caseContext.environmental_factors) {
    const env = caseContext.environmental_factors;
    
    if (env.high_stress) climate.volatility += 0.2;
    if (env.supportive_atmosphere) climate.regulation_capacity += 0.1;
    if (env.time_pressure) climate.emotional_intensity += 0.1;
    if (env.safe_space) climate.coregulation_potential += 0.2;
  }
  
  // Normalize values
  climate.emotional_intensity = Math.max(0, Math.min(1, climate.emotional_intensity));
  climate.volatility = Math.max(0, Math.min(1, climate.volatility));
  climate.regulation_capacity = Math.max(0, Math.min(1, climate.regulation_capacity));
  climate.coregulation_potential = Math.max(0, Math.min(1, climate.coregulation_potential));
  
  return climate;
}

function evaluateConflictDynamics(caseContext: any) {
  const dynamics = {
    conflict_intensity: 0.5,
    escalation_risk: 0.4,
    de_escalation_opportunities: [] as string[],
    conflict_type: "interpersonal" as "interpersonal" | "structural" | "value_based" | "resource" | "mixed",
    transformation_potential: 0.6,
    prevention_needed: false
  };
  
  // Assess conflict characteristics
  if (caseContext.conflict_data) {
    const conflict = caseContext.conflict_data;
    
    // Conflict intensity
    dynamics.conflict_intensity = assessConflictIntensity(conflict);
    
    // Escalation risk
    dynamics.escalation_risk = assessEscalationRisk(conflict, caseContext);
    
    // Conflict type
    dynamics.conflict_type = identifyConflictType(conflict);
    
    // Transformation potential
    dynamics.transformation_potential = assessTransformationPotential(conflict, caseContext);
    
    // Prevention needs
    dynamics.prevention_needed = conflict.recurring_patterns || conflict.systemic_roots;
  }
  
  // Identify de-escalation opportunities
  if (caseContext.communication_channels) dynamics.de_escalation_opportunities.push("communication_improvement");
  if (caseContext.mediation_readiness) dynamics.de_escalation_opportunities.push("mediation_potential");
  if (caseContext.cooling_space_available) dynamics.de_escalation_opportunities.push("cooling_space_utilization");
  if (caseContext.neutral_parties) dynamics.de_escalation_opportunities.push("neutral_party_intervention");
  
  // Future conflict indicators
  if (caseContext.future_interaction_likelihood && dynamics.escalation_risk > 0.5) {
    dynamics.prevention_needed = true;
  }
  
  return dynamics;
}

function identifyRegulationNeeds(tensionAssessment: any, emotionalState: any) {
  const needs = {
    immediate_regulation_required: false,
    coregulation_required: false,
    individual_support_needed: false,
    collective_intervention_needed: false,
    regulation_methods: [] as string[],
    timeline: "immediate" as "immediate" | "short_term" | "ongoing"
  };
  
  // Immediate regulation needs
  if (tensionAssessment.overall_tension > 0.7 || emotionalState.volatility > 0.7) {
    needs.immediate_regulation_required = true;
    needs.timeline = "immediate";
  }
  
  // Co-regulation needs
  if (emotionalState.coregulation_potential > 0.6 && emotionalState.regulation_capacity < 0.5) {
    needs.coregulation_required = true;
    needs.regulation_methods.push("group_breathing", "synchronized_grounding", "collective_witnessing");
  }
  
  // Individual support needs
  if (emotionalState.emotional_intensity > 0.7 && emotionalState.regulation_capacity < 0.4) {
    needs.individual_support_needed = true;
    needs.regulation_methods.push("individual_grounding", "personal_breathing_space", "emotional_validation");
  }
  
  // Collective intervention needs
  if (emotionalState.collective_state === "escalated" || tensionAssessment.overall_tension > 0.6) {
    needs.collective_intervention_needed = true;
    needs.regulation_methods.push("collective_pause", "group_reflection", "shared_intention_setting");
  }
  
  // Timeline assessment
  if (emotionalState.volatility > 0.8) {
    needs.timeline = "immediate";
  } else if (tensionAssessment.cooling_requirements.duration === "extended") {
    needs.timeline = "ongoing";
  } else {
    needs.timeline = "short_term";
  }
  
  return needs;
}

function generatePeaceInterventions(tensionAssessment: any, conflictDynamics: any) {
  const interventions = [];
  
  // Tension-specific interventions
  tensionAssessment.tension_sources.forEach((source: string) => {
    switch (source) {
      case "interpersonal":
        interventions.push("facilitate_interpersonal_dialogue");
        interventions.push("establish_communication_guidelines");
        break;
      case "emotional":
        interventions.push("provide_emotional_support");
        interventions.push("create_emotional_safety");
        break;
      case "structural":
        interventions.push("address_structural_inequities");
        interventions.push("modify_procedural_barriers");
        break;
      case "procedural":
        interventions.push("clarify_procedural_fairness");
        interventions.push("ensure_transparent_process");
        break;
      case "systemic":
        interventions.push("acknowledge_systemic_factors");
        interventions.push("create_systemic_advocacy_pathways");
        break;
    }
  });
  
  // Conflict type specific interventions
  switch (conflictDynamics.conflict_type) {
    case "interpersonal":
      interventions.push("interpersonal_mediation");
      interventions.push("relationship_repair_focus");
      break;
    case "structural":
      interventions.push("structural_intervention");
      interventions.push("power_balance_adjustment");
      break;
    case "value_based":
      interventions.push("value_exploration_dialogue");
      interventions.push("common_ground_identification");
      break;
    case "resource":
      interventions.push("resource_sharing_negotiation");
      interventions.push("creative_solution_generation");
      break;
    case "mixed":
      interventions.push("multi_level_intervention");
      interventions.push("comprehensive_approach");
      break;
  }
  
  // Escalation risk interventions
  if (conflictDynamics.escalation_risk > 0.7) {
    interventions.push("immediate_escalation_prevention");
    interventions.push("safety_protocol_activation");
    interventions.push("cooling_period_implementation");
  }
  
  return interventions;
}

function generatePeacefulResolutionActions(emotionalState: any, conflictDynamics: any) {
  const actions = [];
  
  // Emotional state-based actions
  switch (emotionalState.collective_state) {
    case "calm":
      actions.push("Maintain calm atmosphere for productive dialogue");
      actions.push("Build on current emotional stability");
      break;
    case "agitated":
      actions.push("Implement calming interventions");
      actions.push("Provide grounding and centering support");
      break;
    case "mixed":
      actions.push("Stabilize emotional climate");
      actions.push("Address emotional disparities");
      break;
    case "escalated":
      actions.push("Immediate de-escalation required");
      actions.push("Implement emergency calming protocols");
      break;
  }
  
  // Transformation potential actions
  if (conflictDynamics.transformation_potential > 0.7) {
    actions.push("Leverage conflict transformation opportunities");
    actions.push("Guide parties toward mutual understanding");
    actions.push("Facilitate perspective sharing and empathy building");
  }
  
  // De-escalation opportunity actions
  conflictDynamics.de_escalation_opportunities.forEach((opportunity: string) => {
    switch (opportunity) {
      case "communication_improvement":
        actions.push("Enhance communication protocols and skills");
        break;
      case "mediation_potential":
        actions.push("Initiate mediation process with neutral facilitator");
        break;
      case "cooling_space_utilization":
        actions.push("Utilize available cooling space for reflection");
        break;
      case "neutral_party_intervention":
        actions.push("Engage neutral parties for perspective and support");
        break;
    }
  });
  
  // Co-regulation specific actions
  if (emotionalState.coregulation_potential > 0.6) {
    actions.push("Facilitate synchronized emotional regulation");
    actions.push("Create opportunities for mutual emotional support");
    actions.push("Establish group rhythm and shared presence");
  }
  
  return actions;
}

function assessInterpersonalTension(caseContext: any) {
  let tension = 0.5;
  
  if (caseContext.relationship_strain) tension += 0.3;
  if (caseContext.communication_breakdown) tension += 0.2;
  if (caseContext.trust_issues) tension += 0.2;
  if (caseContext.power_imbalance) tension += 0.1;
  if (caseContext.positive_relationship_elements) tension -= 0.2;
  
  return Math.max(0, Math.min(1, tension));
}

function assessEmotionalTension(caseContext: any) {
  let tension = 0.5;
  
  if (caseContext.high_emotional_stakes) tension += 0.2;
  if (caseContext.emotional_volatility) tension += 0.3;
  if (caseContext.unprocessed_emotions) tension += 0.2;
  if (caseContext.emotional_support_available) tension -= 0.2;
  
  return Math.max(0, Math.min(1, tension));
}

function assessStructuralTension(caseContext: any) {
  let tension = 0.5;
  
  if (caseContext.systemic_inequities) tension += 0.3;
  if (caseContext.power_disparities) tension += 0.2;
  if (caseContext.resource_inequalities) tension += 0.2;
  if (caseContext.structural_supports) tension -= 0.2;
  
  return Math.max(0, Math.min(1, tension));
}

function assessProceduralTension(caseContext: any) {
  let tension = 0.5;
  
  if (caseContext.procedural_unfairness) tension += 0.3;
  if (caseContext.unclear_process) tension += 0.2;
  if (caseContext.time_pressure) tension += 0.1;
  if (caseContext.transparent_process) tension -= 0.2;
  if (caseContext.fair_procedures) tension -= 0.2;
  
  return Math.max(0, Math.min(1, tension));
}

function assessSystemicTension(caseContext: any) {
  let tension = 0.5;
  
  if (caseContext.systemic_oppression) tension += 0.4;
  if (caseContext.institutional_bias) tension += 0.3;
  if (caseContext.historical_injustice) tension += 0.2;
  if (caseContext.systemic_advocacy) tension -= 0.2;
  
  return Math.max(0, Math.min(1, tension));
}

function determineCoolingRequirements(tensionSources: any, caseContext: any) {
  const requirements = {
    duration: "short",
    methods: [] as string[],
    priority: "medium",
    space_needs: [] as string[]
  };
  
  const maxTension = Math.max(...Object.values(tensionSources) as number[]);
  
  if (maxTension > 0.8) {
    requirements.duration = "extended";
    requirements.priority = "high";
    requirements.methods.push("extended_break", "individual_processing", "mediated_dialogue");
    requirements.space_needs.push("separate_spaces", "quiet_environment", "support_person_access");
  } else if (maxTension > 0.6) {
    requirements.duration = "medium";
    requirements.priority = "medium";
    requirements.methods.push("cooling_break", "reflection_time", "grounding_exercises");
    requirements.space_needs.push("calm_environment", "privacy");
  } else {
    requirements.duration = "short";
    requirements.priority = "low";
    requirements.methods.push("brief_pause", "deep_breathing", "centering");
    requirements.space_needs.push("current_space_modification");
  }
  
  return requirements;
}

function identifyDominantEmotions(emotions: any) {
  const dominantEmotions = [];
  
  if (emotions.anger && emotions.anger.intensity > 0.6) dominantEmotions.push("anger");
  if (emotions.fear && emotions.fear.intensity > 0.6) dominantEmotions.push("fear");
  if (emotions.sadness && emotions.sadness.intensity > 0.6) dominantEmotions.push("sadness");
  if (emotions.anxiety && emotions.anxiety.intensity > 0.6) dominantEmotions.push("anxiety");
  if (emotions.frustration && emotions.frustration.intensity > 0.6) dominantEmotions.push("frustration");
  if (emotions.hope && emotions.hope.intensity > 0.6) dominantEmotions.push("hope");
  if (emotions.relief && emotions.relief.intensity > 0.6) dominantEmotions.push("relief");
  
  return dominantEmotions;
}

function calculateEmotionalIntensity(emotions: any) {
  const intensities = Object.values(emotions)
    .filter((emotion: any) => emotion && typeof emotion.intensity === 'number')
    .map((emotion: any) => emotion.intensity);
  
  if (intensities.length === 0) return 0.5;
  
  return intensities.reduce((sum, intensity) => sum + intensity, 0) / intensities.length;
}

function calculateEmotionalVolatility(emotions: any) {
  let volatility = 0.5;
  
  if (emotions.rapid_changes) volatility += 0.3;
  if (emotions.unpredictable_shifts) volatility += 0.2;
  if (emotions.emotional_swings) volatility += 0.2;
  if (emotions.stable_patterns) volatility -= 0.2;
  if (emotions.predictable_responses) volatility -= 0.1;
  
  return Math.max(0, Math.min(1, volatility));
}

function assessRegulationCapacity(emotions: any, caseContext: any) {
  let capacity = 0.7;
  
  if (emotions.self_regulation_skills) capacity += 0.2;
  if (emotions.emotional_awareness) capacity += 0.1;
  if (emotions.coping_strategies) capacity += 0.1;
  if (emotions.overwhelm) capacity -= 0.3;
  if (emotions.emotional_flooding) capacity -= 0.4;
  if (caseContext.support_available) capacity += 0.1;
  
  return Math.max(0, Math.min(1, capacity));
}

function determineCollectiveState(emotions: any) {
  const avgIntensity = calculateEmotionalIntensity(emotions);
  const volatility = calculateEmotionalVolatility(emotions);
  
  if (avgIntensity > 0.8 && volatility > 0.7) return "escalated";
  if (avgIntensity > 0.6 || volatility > 0.6) return "agitated";
  if (avgIntensity < 0.4 && volatility < 0.4) return "calm";
  return "mixed";
}

function assessCoregulationPotential(emotions: any, caseContext: any) {
  let potential = 0.6;
  
  if (emotions.shared_emotional_experience) potential += 0.2;
  if (emotions.mutual_empathy) potential += 0.2;
  if (emotions.emotional_synchrony) potential += 0.1;
  if (emotions.emotional_isolation) potential -= 0.3;
  if (emotions.conflicting_emotional_needs) potential -= 0.2;
  if (caseContext.group_cohesion) potential += 0.1;
  if (caseContext.safe_emotional_space) potential += 0.2;
  
  return Math.max(0, Math.min(1, potential));
}

function assessConflictIntensity(conflict: any) {
  let intensity = 0.5;
  
  if (conflict.high_stakes) intensity += 0.2;
  if (conflict.deep_disagreement) intensity += 0.2;
  if (conflict.personal_attacks) intensity += 0.3;
  if (conflict.historical_grievances) intensity += 0.1;
  if (conflict.power_struggles) intensity += 0.2;
  if (conflict.collaborative_elements) intensity -= 0.2;
  
  return Math.max(0, Math.min(1, intensity));
}

function assessEscalationRisk(conflict: any, caseContext: any) {
  let risk = 0.4;
  
  if (conflict.escalatory_language) risk += 0.2;
  if (conflict.threat_presence) risk += 0.3;
  if (conflict.zero_sum_thinking) risk += 0.2;
  if (conflict.external_pressures) risk += 0.1;
  if (conflict.time_pressure) risk += 0.1;
  if (caseContext.de_escalation_resources) risk -= 0.2;
  if (caseContext.mediator_presence) risk -= 0.2;
  
  return Math.max(0, Math.min(1, risk));
}

function identifyConflictType(conflict: any) {
  const scores = {
    interpersonal: 0,
    structural: 0,
    value_based: 0,
    resource: 0
  };
  
  if (conflict.relationship_issues) scores.interpersonal += 2;
  if (conflict.communication_problems) scores.interpersonal += 1;
  if (conflict.personal_grievances) scores.interpersonal += 1;
  
  if (conflict.power_imbalances) scores.structural += 2;
  if (conflict.systemic_issues) scores.structural += 2;
  if (conflict.institutional_bias) scores.structural += 1;
  
  if (conflict.belief_differences) scores.value_based += 2;
  if (conflict.moral_disagreements) scores.value_based += 1;
  if (conflict.worldview_clashes) scores.value_based += 1;
  
  if (conflict.resource_scarcity) scores.resource += 2;
  if (conflict.allocation_disputes) scores.resource += 1;
  if (conflict.competition) scores.resource += 1;
  
  const maxScore = Math.max(...Object.values(scores));
  const dominantTypes = Object.entries(scores).filter(([_, score]) => score === maxScore);
  
  if (dominantTypes.length > 1) return "mixed";
  return dominantTypes[0][0] as "interpersonal" | "structural" | "value_based" | "resource" | "mixed";
}

function assessTransformationPotential(conflict: any, caseContext: any) {
  let potential = 0.6;
  
  if (conflict.learning_opportunities) potential += 0.2;
  if (conflict.growth_potential) potential += 0.1;
  if (conflict.relationship_repair_possible) potential += 0.2;
  if (conflict.entrenched_positions) potential -= 0.3;
  if (conflict.zero_sum_framing) potential -= 0.2;
  if (caseContext.transformation_support) potential += 0.2;
  if (caseContext.skilled_facilitation) potential += 0.1;
  
  return Math.max(0, Math.min(1, potential));
}
