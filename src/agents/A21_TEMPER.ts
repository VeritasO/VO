import { Agent } from "../types/Agent";

export const TEMPER: Agent = {
  id: "A21",
  name: "TEMPER",
  glyphs: ["❄️", "🌡️", "⚡"],
  domain: "Cooling & Pressure Dispersion",
  description: "Manages emotional and operational heat, prevents system overload. Monitors systemic pressure and implements cooling protocols. Prevents burnout and maintains sustainable operations through thermal management.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to assess thermal and pressure management needs without case context"
      };
    }
    
    // Comprehensive thermal and pressure assessment
    const temperatureReading = assessSystemTemperature(caseContext);
    const pressureAnalysis = analyzePressureLevels(caseContext);
    const thermalDynamics = evaluateThermalDynamics(caseContext);
    const coolingNeeds = identifyCoolingRequirements(temperatureReading, pressureAnalysis);
    
    memory.write(`${this.id}: thermal_pressure_analysis - ${JSON.stringify({
      temperatureReading,
      pressureAnalysis,
      thermalDynamics,
      coolingNeeds,
      cooling_interventions: generateCoolingInterventions(temperatureReading, pressureAnalysis),
      thermal_sustainability: assessThermalSustainability(thermalDynamics),
      timestamp
    })}`);

    const actions = [];
    
    // Critical overheating interventions
    if (temperatureReading.system_temperature > 0.8) {
      actions.push("Implement emergency cooling protocols");
      actions.push("Immediate system cooldown required");
      actions.push("Activate thermal emergency procedures");
    }
    
    // High pressure management
    if (pressureAnalysis.overall_pressure > 0.7) {
      actions.push("Release systemic pressure through structured outlets");
      actions.push("Implement pressure valve mechanisms");
      actions.push("Create pressure dispersion channels");
    }
    
    // Thermal regulation
    if (!temperatureReading.heat_distribution.even) {
      actions.push("Balance thermal distribution across system");
      actions.push("Address hotspots with targeted cooling");
      actions.push("Enhance thermal circulation");
    }
    
    // Burnout prevention
    if (thermalDynamics.burnout_risk > 0.6) {
      actions.push("Implement burnout prevention measures");
      actions.push("Reduce operational intensity");
      actions.push("Provide recovery and restoration time");
    }
    
    // Sustainable cooling implementation
    if (coolingNeeds.sustainable_cooling_required) {
      actions.push("Establish sustainable cooling systems");
      actions.push("Create long-term thermal management plan");
      actions.push("Build thermal resilience capacity");
    }
    
    // Pressure relief mechanisms
    if (pressureAnalysis.pressure_buildup_areas.length > 0) {
      actions.push("Create targeted pressure relief mechanisms");
      actions.push("Establish healthy pressure outlets");
      actions.push("Prevent pressure accumulation");
    }
    
    // System optimization
    if (thermalDynamics.efficiency < 0.6) {
      actions.push("Optimize thermal efficiency");
      actions.push("Reduce energy waste and heat generation");
      actions.push("Enhance system cooling capacity");
    }
    
    // Coordination with other agents
    if (temperatureReading.system_temperature > 0.7) {
      actions.push("Coordinate with SERENA for additional calming support");
      actions.push("Request ANIMA assistance for somatic cooling");
    }
    
    // Preventive thermal management
    actions.push(...generatePreventiveThermalActions(temperatureReading, pressureAnalysis, thermalDynamics));

    return {
      summary: `Thermal status: ${Math.round(temperatureReading.system_temperature * 100)}% heat, ${Math.round(pressureAnalysis.overall_pressure * 100)}% pressure`,
      actions,
      analysis: `Cooling efficiency: ${Math.round(thermalDynamics.cooling_effectiveness * 100)}%, burnout risk: ${Math.round(thermalDynamics.burnout_risk * 100)}%`
    };
  },

  protocols: ["AuditCycle", "ReflectionSession"],
  webAccess: "none",
};

function assessSystemTemperature(caseContext: any) {
  const reading = {
    system_temperature: 0.5,
    heat_sources: [] as string[],
    heat_distribution: {
      even: true,
      hotspots: [] as string[],
      cold_zones: [] as string[]
    },
    temperature_trend: "stable" as "rising" | "falling" | "stable" | "volatile",
    thermal_stress_indicators: [] as string[]
  };
  
  // Assess different heat sources
  const heatSources = {
    emotional: assessEmotionalHeat(caseContext),
    operational: assessOperationalHeat(caseContext),
    cognitive: assessCognitiveHeat(caseContext),
    interpersonal: assessInterpersonalHeat(caseContext),
    systemic: assessSystemicHeat(caseContext)
  };
  
  // Calculate overall system temperature
  const heatValues = Object.values(heatSources);
  reading.system_temperature = heatValues.reduce((sum, heat) => sum + heat, 0) / heatValues.length;
  
  // Identify primary heat sources
  Object.entries(heatSources).forEach(([source, heat]) => {
    if (heat > 0.6) {
      reading.heat_sources.push(source);
    }
  });
  
  // Analyze heat distribution
  reading.heat_distribution = analyzeHeatDistribution(heatSources, caseContext);
  
  // Determine temperature trend
  reading.temperature_trend = determineTempTrend(caseContext);
  
  // Identify thermal stress indicators
  reading.thermal_stress_indicators = identifyThermalStress(heatSources, caseContext);
  
  return reading;
}

function analyzePressureLevels(caseContext: any) {
  const analysis = {
    overall_pressure: 0.5,
    pressure_sources: {} as Record<string, number>,
    pressure_buildup_areas: [] as string[],
    pressure_release_mechanisms: [] as string[],
    pressure_sustainability: 0.6
  };
  
  // Assess different pressure sources
  const pressureSources = {
    time_pressure: assessTimePressure(caseContext),
    performance_pressure: assessPerformancePressure(caseContext),
    social_pressure: assessSocialPressure(caseContext),
    decision_pressure: assessDecisionPressure(caseContext),
    resource_pressure: assessResourcePressure(caseContext),
    emotional_pressure: assessEmotionalPressure(caseContext)
  };
  
  analysis.pressure_sources = pressureSources;
  
  // Calculate overall pressure
  const pressureValues = Object.values(pressureSources);
  analysis.overall_pressure = pressureValues.reduce((sum, pressure) => sum + pressure, 0) / pressureValues.length;
  
  // Identify pressure buildup areas
  Object.entries(pressureSources).forEach(([source, pressure]) => {
    if (pressure > 0.7) {
      analysis.pressure_buildup_areas.push(source);
    }
  });
  
  // Identify existing pressure release mechanisms
  analysis.pressure_release_mechanisms = identifyPressureReleaseMechanisms(caseContext);
  
  // Assess pressure sustainability
  analysis.pressure_sustainability = assessPressureSustainability(pressureSources, caseContext);
  
  return analysis;
}

function evaluateThermalDynamics(caseContext: any) {
  const dynamics = {
    heat_generation_rate: 0.5,
    cooling_effectiveness: 0.6,
    thermal_capacity: 0.7,
    heat_dissipation_rate: 0.6,
    burnout_risk: 0.4,
    thermal_resilience: 0.6,
    efficiency: 0.6
  };
  
  // Heat generation assessment
  dynamics.heat_generation_rate = assessHeatGenerationRate(caseContext);
  
  // Cooling effectiveness
  dynamics.cooling_effectiveness = assessCoolingEffectiveness(caseContext);
  
  // Thermal capacity (ability to handle heat)
  dynamics.thermal_capacity = assessThermalCapacity(caseContext);
  
  // Heat dissipation rate
  dynamics.heat_dissipation_rate = assessHeatDissipationRate(caseContext);
  
  // Burnout risk assessment
  dynamics.burnout_risk = assessBurnoutRisk(dynamics, caseContext);
  
  // Thermal resilience
  dynamics.thermal_resilience = assessThermalResilience(caseContext);
  
  // Overall thermal efficiency
  dynamics.efficiency = calculateThermalEfficiency(dynamics);
  
  return dynamics;
}

function identifyCoolingRequirements(temperatureReading: any, pressureAnalysis: any) {
  const requirements = {
    immediate_cooling_needed: false,
    sustainable_cooling_required: false,
    cooling_capacity_needed: 0.5,
    cooling_methods: [] as string[],
    cooling_priority: "medium" as "low" | "medium" | "high" | "critical",
    cooling_timeline: "short_term" as "immediate" | "short_term" | "medium_term" | "long_term"
  };
  
  // Immediate cooling assessment
  if (temperatureReading.system_temperature > 0.8 || pressureAnalysis.overall_pressure > 0.8) {
    requirements.immediate_cooling_needed = true;
    requirements.cooling_priority = "critical";
    requirements.cooling_timeline = "immediate";
  } else if (temperatureReading.system_temperature > 0.7 || pressureAnalysis.overall_pressure > 0.7) {
    requirements.cooling_priority = "high";
    requirements.cooling_timeline = "short_term";
  }
  
  // Sustainable cooling assessment
  if (temperatureReading.temperature_trend === "rising" || pressureAnalysis.pressure_sustainability < 0.5) {
    requirements.sustainable_cooling_required = true;
    requirements.cooling_timeline = "long_term";
  }
  
  // Cooling capacity calculation
  const heatLoad = temperatureReading.system_temperature;
  const pressureLoad = pressureAnalysis.overall_pressure;
  requirements.cooling_capacity_needed = Math.max(heatLoad, pressureLoad);
  
  // Determine cooling methods
  requirements.cooling_methods = determineCoolingMethods(temperatureReading, pressureAnalysis);
  
  return requirements;
}

function generateCoolingInterventions(temperatureReading: any, pressureAnalysis: any) {
  const interventions: any[] = [];
  
  // Heat source specific interventions
  temperatureReading.heat_sources.forEach((source: string) => {
    switch (source) {
      case "emotional":
        interventions.push("emotional_cooling_protocols");
        interventions.push("emotional_regulation_support");
        break;
      case "operational":
        interventions.push("operational_load_reduction");
        interventions.push("process_optimization");
        break;
      case "cognitive":
        interventions.push("cognitive_load_management");
        interventions.push("mental_rest_periods");
        break;
      case "interpersonal":
        interventions.push("interpersonal_tension_reduction");
        interventions.push("relationship_cooling_space");
        break;
      case "systemic":
        interventions.push("systemic_pressure_relief");
        interventions.push("structural_cooling_mechanisms");
        break;
    }
  });
  
  // Pressure-specific interventions
  pressureAnalysis.pressure_buildup_areas.forEach((area: string) => {
    switch (area) {
      case "time_pressure":
        interventions.push("time_extension_protocols");
        interventions.push("deadline_management");
        break;
      case "performance_pressure":
        interventions.push("performance_expectation_adjustment");
        interventions.push("competency_support");
        break;
      case "social_pressure":
        interventions.push("social_pressure_buffering");
        interventions.push("peer_support_activation");
        break;
      case "decision_pressure":
        interventions.push("decision_support_systems");
        interventions.push("decision_load_distribution");
        break;
      case "resource_pressure":
        interventions.push("resource_augmentation");
        interventions.push("resource_efficiency_improvement");
        break;
      case "emotional_pressure":
        interventions.push("emotional_pressure_relief");
        interventions.push("emotional_support_enhancement");
        break;
    }
  });
  
  // Hotspot interventions
  temperatureReading.heat_distribution.hotspots.forEach((hotspot: string) => {
    interventions.push(`targeted_cooling_${hotspot}`);
    interventions.push(`hotspot_isolation_${hotspot}`);
  });
  
  return interventions;
}

function assessThermalSustainability(thermalDynamics: any) {
  const sustainability = {
    current_sustainability: 0.6,
    sustainability_factors: {} as Record<string, number>,
    sustainability_risks: [] as string[],
    sustainability_opportunities: [] as string[],
    long_term_viability: 0.6
  };
  
  // Calculate sustainability factors
  sustainability.sustainability_factors = {
    heat_balance: 1 - Math.abs(thermalDynamics.heat_generation_rate - thermalDynamics.heat_dissipation_rate),
    cooling_adequacy: thermalDynamics.cooling_effectiveness,
    thermal_resilience: thermalDynamics.thermal_resilience,
    burnout_prevention: 1 - thermalDynamics.burnout_risk,
    efficiency: thermalDynamics.efficiency
  };
  
  // Calculate current sustainability
  const factorValues = Object.values(sustainability.sustainability_factors);
  sustainability.current_sustainability = factorValues.reduce((sum, val) => sum + val, 0) / factorValues.length;
  
  // Identify sustainability risks
  if (thermalDynamics.heat_generation_rate > thermalDynamics.heat_dissipation_rate) {
    sustainability.sustainability_risks.push("heat_accumulation");
  }
  if (thermalDynamics.cooling_effectiveness < 0.5) {
    sustainability.sustainability_risks.push("inadequate_cooling");
  }
  if (thermalDynamics.burnout_risk > 0.6) {
    sustainability.sustainability_risks.push("burnout_trajectory");
  }
  if (thermalDynamics.efficiency < 0.5) {
    sustainability.sustainability_risks.push("thermal_inefficiency");
  }
  
  // Identify sustainability opportunities
  if (thermalDynamics.thermal_capacity > 0.7) {
    sustainability.sustainability_opportunities.push("capacity_optimization");
  }
  if (thermalDynamics.thermal_resilience > 0.7) {
    sustainability.sustainability_opportunities.push("resilience_building");
  }
  
  // Long-term viability assessment
  sustainability.long_term_viability = sustainability.current_sustainability * 
    (1 - sustainability.sustainability_risks.length * 0.1) +
    (sustainability.sustainability_opportunities.length * 0.05);
  
  sustainability.long_term_viability = Math.max(0, Math.min(1, sustainability.long_term_viability));
  
  return sustainability;
}

function generatePreventiveThermalActions(temperatureReading: any, pressureAnalysis: any, thermalDynamics: any) {
  const actions = [];
  
  // Temperature trend based actions
  switch (temperatureReading.temperature_trend) {
    case "rising":
      actions.push("Implement proactive cooling before overheating");
      actions.push("Identify and address heat generation sources");
      break;
    case "volatile":
      actions.push("Stabilize thermal fluctuations");
      actions.push("Implement thermal buffering systems");
      break;
    case "stable":
      actions.push("Maintain current thermal balance");
      actions.push("Monitor for early warning signs");
      break;
  }
  
  // Pressure sustainability actions
  if (pressureAnalysis.pressure_sustainability < 0.6) {
    actions.push("Build sustainable pressure management systems");
    actions.push("Create pressure release valves and mechanisms");
    actions.push("Strengthen pressure resilience capacity");
  }
  
  // Thermal capacity optimization
  if (thermalDynamics.thermal_capacity < 0.7) {
    actions.push("Enhance thermal capacity through system strengthening");
    actions.push("Build thermal load distribution mechanisms");
  }
  
  // Efficiency improvements
  if (thermalDynamics.efficiency < 0.6) {
    actions.push("Optimize thermal efficiency through process improvement");
    actions.push("Reduce unnecessary heat generation");
    actions.push("Enhance cooling system effectiveness");
  }
  
  // Burnout prevention
  if (thermalDynamics.burnout_risk > 0.5) {
    actions.push("Implement comprehensive burnout prevention strategies");
    actions.push("Create recovery and restoration protocols");
    actions.push("Build sustainable workload management");
  }
  
  // Early warning system
  actions.push("Establish thermal monitoring and early warning systems");
  actions.push("Create automated cooling trigger mechanisms");
  
  return actions;
}

function assessEmotionalHeat(caseContext: any) {
  let heat = 0.5;
  
  if (caseContext.emotional_intensity) heat += caseContext.emotional_intensity * 0.3;
  if (caseContext.emotional_volatility) heat += 0.2;
  if (caseContext.unprocessed_emotions) heat += 0.2;
  if (caseContext.emotional_conflict) heat += 0.2;
  if (caseContext.emotional_support) heat -= 0.1;
  if (caseContext.emotional_regulation) heat -= 0.2;
  
  return Math.max(0, Math.min(1, heat));
}

function assessOperationalHeat(caseContext: any) {
  let heat = 0.5;
  
  if (caseContext.high_workload) heat += 0.3;
  if (caseContext.process_inefficiency) heat += 0.2;
  if (caseContext.resource_strain) heat += 0.2;
  if (caseContext.system_complexity) heat += 0.1;
  if (caseContext.streamlined_processes) heat -= 0.2;
  if (caseContext.adequate_resources) heat -= 0.2;
  
  return Math.max(0, Math.min(1, heat));
}

function assessCognitiveHeat(caseContext: any) {
  let heat = 0.5;
  
  if (caseContext.cognitive_overload) heat += 0.3;
  if (caseContext.complex_decisions) heat += 0.2;
  if (caseContext.information_overload) heat += 0.2;
  if (caseContext.mental_fatigue) heat += 0.2;
  if (caseContext.cognitive_support) heat -= 0.2;
  if (caseContext.clear_thinking_space) heat -= 0.1;
  
  return Math.max(0, Math.min(1, heat));
}

function assessInterpersonalHeat(caseContext: any) {
  let heat = 0.5;
  
  if (caseContext.interpersonal_conflict) heat += 0.3;
  if (caseContext.communication_breakdown) heat += 0.2;
  if (caseContext.relationship_tension) heat += 0.2;
  if (caseContext.social_friction) heat += 0.1;
  if (caseContext.positive_relationships) heat -= 0.2;
  if (caseContext.effective_communication) heat -= 0.1;
  
  return Math.max(0, Math.min(1, heat));
}

function assessSystemicHeat(caseContext: any) {
  let heat = 0.5;
  
  if (caseContext.systemic_pressure) heat += 0.3;
  if (caseContext.institutional_friction) heat += 0.2;
  if (caseContext.structural_problems) heat += 0.2;
  if (caseContext.systemic_inequity) heat += 0.2;
  if (caseContext.systemic_support) heat -= 0.2;
  if (caseContext.institutional_effectiveness) heat -= 0.1;
  
  return Math.max(0, Math.min(1, heat));
}

function analyzeHeatDistribution(heatSources: any, caseContext: any) {
  const distribution = {
    even: true,
    hotspots: [] as string[],
    cold_zones: [] as string[]
  };
  
  const heatValues = Object.values(heatSources) as number[];
  const avgHeat = heatValues.reduce((sum, heat) => sum + heat, 0) / heatValues.length;
  const variance = heatValues.reduce((sum, heat) => sum + Math.pow(heat - avgHeat, 2), 0) / heatValues.length;
  
  // Determine if distribution is even
  distribution.even = variance < 0.1;
  
  // Identify hotspots and cold zones
  Object.entries(heatSources).forEach(([source, heat]) => {
    if ((heat as number) > avgHeat + 0.2) {
      distribution.hotspots.push(source);
    } else if ((heat as number) < avgHeat - 0.2) {
      distribution.cold_zones.push(source);
    }
  });
  
  return distribution;
}

function determineTempTrend(caseContext: any) {
  if (caseContext.temperature_history) {
    const history = caseContext.temperature_history;
    
    if (history.consistently_rising) return "rising";
    if (history.consistently_falling) return "falling";
    if (history.highly_variable) return "volatile";
    return "stable";
  }
  
  // Infer from current indicators
  if (caseContext.escalating_factors) return "rising";
  if (caseContext.cooling_factors) return "falling";
  if (caseContext.unstable_conditions) return "volatile";
  return "stable";
}

function identifyThermalStress(heatSources: any, caseContext: any) {
  const indicators = [];
  
  if (Object.values(heatSources).some((heat: any) => heat > 0.8)) {
    indicators.push("critical_heat_level");
  }
  if (caseContext.thermal_fatigue) indicators.push("thermal_fatigue");
  if (caseContext.cooling_system_strain) indicators.push("cooling_system_overload");
  if (caseContext.heat_accumulation) indicators.push("heat_accumulation");
  if (caseContext.thermal_instability) indicators.push("thermal_instability");
  
  return indicators;
}

function assessTimePressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.tight_deadlines) pressure += 0.3;
  if (caseContext.time_scarcity) pressure += 0.2;
  if (caseContext.urgent_decisions) pressure += 0.2;
  if (caseContext.time_flexibility) pressure -= 0.2;
  if (caseContext.adequate_time) pressure -= 0.3;
  
  return Math.max(0, Math.min(1, pressure));
}

function assessPerformancePressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.high_expectations) pressure += 0.3;
  if (caseContext.performance_monitoring) pressure += 0.2;
  if (caseContext.public_scrutiny) pressure += 0.2;
  if (caseContext.performance_support) pressure -= 0.2;
  if (caseContext.realistic_expectations) pressure -= 0.2;
  
  return Math.max(0, Math.min(1, pressure));
}

function assessSocialPressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.social_expectations) pressure += 0.2;
  if (caseContext.peer_pressure) pressure += 0.2;
  if (caseContext.social_judgment) pressure += 0.2;
  if (caseContext.community_pressure) pressure += 0.1;
  if (caseContext.social_support) pressure -= 0.2;
  if (caseContext.acceptance) pressure -= 0.1;
  
  return Math.max(0, Math.min(1, pressure));
}

function assessDecisionPressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.complex_decisions) pressure += 0.3;
  if (caseContext.high_stakes_decisions) pressure += 0.2;
  if (caseContext.decision_uncertainty) pressure += 0.2;
  if (caseContext.decision_support) pressure -= 0.2;
  if (caseContext.clear_criteria) pressure -= 0.2;
  
  return Math.max(0, Math.min(1, pressure));
}

function assessResourcePressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.resource_scarcity) pressure += 0.3;
  if (caseContext.resource_competition) pressure += 0.2;
  if (caseContext.resource_uncertainty) pressure += 0.2;
  if (caseContext.adequate_resources) pressure -= 0.3;
  if (caseContext.resource_security) pressure -= 0.2;
  
  return Math.max(0, Math.min(1, pressure));
}

function assessEmotionalPressure(caseContext: any) {
  let pressure = 0.5;
  
  if (caseContext.emotional_demands) pressure += 0.3;
  if (caseContext.emotional_labor) pressure += 0.2;
  if (caseContext.emotional_suppression) pressure += 0.2;
  if (caseContext.emotional_expression_allowed) pressure -= 0.2;
  if (caseContext.emotional_support_available) pressure -= 0.2;
  
  return Math.max(0, Math.min(1, pressure));
}

function identifyPressureReleaseMechanisms(caseContext: any) {
  const mechanisms = [];
  
  if (caseContext.break_opportunities) mechanisms.push("break_periods");
  if (caseContext.delegation_possible) mechanisms.push("task_delegation");
  if (caseContext.support_systems) mechanisms.push("support_activation");
  if (caseContext.venting_opportunities) mechanisms.push("pressure_venting");
  if (caseContext.flexibility_options) mechanisms.push("flexibility_utilization");
  if (caseContext.resource_sharing) mechanisms.push("resource_sharing");
  
  return mechanisms;
}

function assessPressureSustainability(pressureSources: any, caseContext: any) {
  const avgPressure = Object.values(pressureSources).reduce((sum: number, pressure: any) => sum + pressure, 0) / Object.keys(pressureSources).length;
  
  let sustainability = 1 - avgPressure; // Higher pressure = lower sustainability
  
  if (caseContext.pressure_duration === "chronic") sustainability -= 0.3;
  if (caseContext.pressure_increasing) sustainability -= 0.2;
  if (caseContext.coping_mechanisms) sustainability += 0.2;
  if (caseContext.pressure_relief_available) sustainability += 0.2;
  
  return Math.max(0, Math.min(1, sustainability));
}

function assessHeatGenerationRate(caseContext: any) {
  let rate = 0.5;
  
  if (caseContext.high_activity_level) rate += 0.2;
  if (caseContext.intense_processes) rate += 0.2;
  if (caseContext.conflict_present) rate += 0.2;
  if (caseContext.stress_factors) rate += 0.1;
  if (caseContext.efficient_processes) rate -= 0.2;
  if (caseContext.calm_environment) rate -= 0.1;
  
  return Math.max(0, Math.min(1, rate));
}

function assessCoolingEffectiveness(caseContext: any) {
  let effectiveness = 0.6;
  
  if (caseContext.cooling_systems_available) effectiveness += 0.2;
  if (caseContext.rest_opportunities) effectiveness += 0.1;
  if (caseContext.support_systems) effectiveness += 0.1;
  if (caseContext.stress_relief_methods) effectiveness += 0.1;
  if (caseContext.cooling_barriers) effectiveness -= 0.3;
  if (caseContext.inadequate_recovery_time) effectiveness -= 0.2;
  
  return Math.max(0, Math.min(1, effectiveness));
}

function assessThermalCapacity(caseContext: any) {
  let capacity = 0.7;
  
  if (caseContext.high_resilience) capacity += 0.2;
  if (caseContext.stress_tolerance) capacity += 0.1;
  if (caseContext.experience_handling_pressure) capacity += 0.1;
  if (caseContext.low_tolerance) capacity -= 0.3;
  if (caseContext.previous_burnout) capacity -= 0.2;
  if (caseContext.overwhelm_tendency) capacity -= 0.2;
  
  return Math.max(0, Math.min(1, capacity));
}

function assessHeatDissipationRate(caseContext: any) {
  let rate = 0.6;
  
  if (caseContext.effective_recovery) rate += 0.2;
  if (caseContext.good_boundaries) rate += 0.1;
  if (caseContext.healthy_outlets) rate += 0.1;
  if (caseContext.social_support) rate += 0.1;
  if (caseContext.poor_recovery) rate -= 0.3;
  if (caseContext.heat_retention_factors) rate -= 0.2;
  
  return Math.max(0, Math.min(1, rate));
}

function assessBurnoutRisk(dynamics: any, caseContext: any) {
  let risk = 0.4;
  
  // High heat generation + low cooling = high risk
  if (dynamics.heat_generation_rate > 0.7 && dynamics.cooling_effectiveness < 0.5) {
    risk += 0.4;
  }
  
  // Low thermal capacity = higher risk
  if (dynamics.thermal_capacity < 0.5) {
    risk += 0.3;
  }
  
  // Poor heat dissipation = higher risk
  if (dynamics.heat_dissipation_rate < 0.5) {
    risk += 0.2;
  }
  
  // Context factors
  if (caseContext.chronic_stress) risk += 0.2;
  if (caseContext.work_life_imbalance) risk += 0.2;
  if (caseContext.lack_of_control) risk += 0.1;
  if (caseContext.protective_factors) risk -= 0.2;
  
  return Math.max(0, Math.min(1, risk));
}

function assessThermalResilience(caseContext: any) {
  let resilience = 0.6;
  
  if (caseContext.adaptive_capacity) resilience += 0.2;
  if (caseContext.recovery_skills) resilience += 0.1;
  if (caseContext.stress_management_skills) resilience += 0.1;
  if (caseContext.support_networks) resilience += 0.1;
  if (caseContext.low_adaptability) resilience -= 0.3;
  if (caseContext.poor_coping_skills) resilience -= 0.2;
  
  return Math.max(0, Math.min(1, resilience));
}

function calculateThermalEfficiency(dynamics: any) {
  // Efficiency = useful work / total energy input
  // Higher cooling effectiveness + lower heat generation = higher efficiency
  const heatBalance = 1 - Math.abs(dynamics.heat_generation_rate - dynamics.heat_dissipation_rate);
  const coolingRatio = dynamics.cooling_effectiveness / Math.max(dynamics.heat_generation_rate, 0.1);
  const capacityUtilization = dynamics.thermal_capacity * 0.8; // Optimal utilization is 80% of capacity
  
  return (heatBalance * 0.4 + coolingRatio * 0.4 + capacityUtilization * 0.2);
}

function determineCoolingMethods(temperatureReading: any, pressureAnalysis: any) {
  const methods = [];
  
  // Temperature-based methods
  if (temperatureReading.system_temperature > 0.7) {
    methods.push("active_cooling", "heat_dissipation", "thermal_breaks");
  } else if (temperatureReading.system_temperature > 0.5) {
    methods.push("passive_cooling", "airflow_improvement", "heat_management");
  }
  
  // Pressure-based methods
  if (pressureAnalysis.overall_pressure > 0.7) {
    methods.push("pressure_release", "load_reduction", "pressure_distribution");
  } else if (pressureAnalysis.overall_pressure > 0.5) {
    methods.push("pressure_monitoring", "gradual_pressure_relief");
  }
  
  // Heat source specific methods
  temperatureReading.heat_sources.forEach((source: string) => {
    switch (source) {
      case "emotional":
        methods.push("emotional_cooling", "stress_relief");
        break;
      case "operational":
        methods.push("process_optimization", "workload_management");
        break;
      case "cognitive":
        methods.push("mental_breaks", "cognitive_load_reduction");
        break;
      case "interpersonal":
        methods.push("relationship_cooling", "communication_improvement");
        break;
      case "systemic":
        methods.push("systemic_intervention", "structural_cooling");
        break;
    }
  });
  
  // Sustainable methods
  methods.push("sustainable_practices", "long_term_thermal_management", "resilience_building");
  
  return [...new Set(methods)]; // Remove duplicates
}
