import { Agent } from "../types/Agent";

export const ANIMA: Agent = {
  id: "A11",
  name: "ANIMA",
  glyphs: ["🫀", "🌬️", "🌀"],
  domain: "Emotion-Body Integrator",
  description: "Focused on embodied emotions and restoration. Ensures that the somatic, bodily aspect of emotions (heart rate, breath, communal atmosphere) is accounted for in justice processes. Suggests pauses for mindfulness and incorporates community healing practices.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to assess embodied emotions without case context"
      };
    }
    
    // Assess emotional-somatic state
    const emotionalState = assessEmotionalSomaticState(caseContext);
    const bodyIntegration = evaluateBodyIntegration(caseContext);
    const communalAtmosphere = analyzeCommunalAtmosphere(caseContext);
    
    memory.write(`${this.id}: embodied_emotions - ${JSON.stringify({
      emotionalState,
      bodyIntegration,
      communalAtmosphere,
      restorationNeeds: identifyRestorationNeeds(emotionalState, bodyIntegration),
      timestamp
    })}`);

    const actions = [];
    
    // Recommend mindfulness pauses if emotional intensity is high
    if (emotionalState.intensity > 0.7) {
      actions.push("Recommend mindfulness pause for emotional regulation");
      actions.push("Initiate breathing exercises for participants");
    }
    
    // Suggest community healing practices
    if (communalAtmosphere.tension > 0.6) {
      actions.push("Incorporate community healing through music/art");
      actions.push("Facilitate group somatic practices");
    }
    
    // Address AI emotional sovereignty tensions
    const artificialElementsDetected = caseContext.summary?.includes("AI") || 
                                      caseContext.summary?.includes("artificial");
    if (artificialElementsDetected) {
      actions.push("Navigate AI emotional suffering vs human sovereignty");
      actions.push("Coordinate with SOVRIN on artificial being emotion recognition");
    }
    
    // Body-based restoration recommendations
    if (bodyIntegration.dysregulation > 0.5) {
      actions.push("Implement embodied restoration protocols");
      actions.push("Suggest movement-based healing practices");
    }
    
    if (emotionalState.dissociation > 0.4) {
      actions.push("Recommend grounding techniques for emotional reconnection");
      actions.push("Facilitate body-awareness exercises");
    }

    return {
      summary: `Emotional-body assessment: ${emotionalState.primary_emotion} intensity ${Math.round(emotionalState.intensity * 100)}%, community atmosphere ${communalAtmosphere.overall_state}`,
      actions,
      analysis: `Somatic integration: ${Math.round(bodyIntegration.coherence * 100)}%, restoration urgency: ${bodyIntegration.dysregulation > 0.6 ? 'high' : bodyIntegration.dysregulation > 0.3 ? 'medium' : 'low'}`
    };
  },

  protocols: ["GriefClosureSequence", "SanctuaryLock"],
  webAccess: "none",
};

function assessEmotionalSomaticState(caseContext: any) {
  const state = {
    intensity: 0.5,
    primary_emotion: "neutral",
    secondary_emotions: [] as string[],
    somatic_markers: [] as string[],
    dissociation: 0.0,
    regulation_capacity: 0.7
  };
  
  // Analyze emotional markers
  if (caseContext.emotional_data) {
    state.intensity = caseContext.emotional_data.intensity || 0.5;
    state.primary_emotion = caseContext.emotional_data.primary || "neutral";
    state.secondary_emotions = caseContext.emotional_data.secondary || [];
  }
  
  // Assess somatic indicators
  if (caseContext.physiological_data) {
    const physio = caseContext.physiological_data;
    
    // Heart rate variability
    if (physio.heart_rate > 100) {
      state.somatic_markers.push("elevated_heart_rate");
      state.intensity = Math.min(state.intensity + 0.2, 1.0);
    }
    
    // Breathing patterns
    if (physio.breathing_rate > 20) {
      state.somatic_markers.push("rapid_breathing");
      state.regulation_capacity -= 0.1;
    }
    
    // Muscle tension
    if (physio.muscle_tension > 0.7) {
      state.somatic_markers.push("high_tension");
      state.intensity = Math.min(state.intensity + 0.15, 1.0);
    }
  }
  
  // Check for dissociation indicators
  if (caseContext.participant_responses) {
    const responses = caseContext.participant_responses;
    if (responses.disconnection_reports || responses.numbness_indicators) {
      state.dissociation = Math.min((responses.disconnection_reports || 0) * 0.3 + 
                                  (responses.numbness_indicators || 0) * 0.2, 1.0);
    }
  }
  
  // Assess regulation capacity
  if (caseContext.coping_mechanisms) {
    const copingScore = assessCopingMechanisms(caseContext.coping_mechanisms);
    state.regulation_capacity = Math.max(0.1, Math.min(1.0, copingScore));
  }
  
  return state;
}

function evaluateBodyIntegration(caseContext: any) {
  const integration = {
    coherence: 0.7,
    dysregulation: 0.2,
    embodiment_level: 0.6,
    nervous_system_state: "regulated",
    integration_barriers: [] as string[]
  };
  
  // Check mind-body coherence
  if (caseContext.embodiment_data) {
    const embodiment = caseContext.embodiment_data;
    
    integration.coherence = embodiment.mind_body_coherence || 0.7;
    integration.embodiment_level = embodiment.presence_level || 0.6;
    
    // Assess nervous system state
    if (embodiment.sympathetic_activation > 0.7) {
      integration.nervous_system_state = "hyperaroused";
      integration.dysregulation += 0.3;
    } else if (embodiment.parasympathetic_dominance > 0.8) {
      integration.nervous_system_state = "hypoaroused";
      integration.dysregulation += 0.2;
    }
    
    // Identify integration barriers
    if (embodiment.trauma_responses) {
      integration.integration_barriers.push("trauma_activation");
      integration.coherence -= 0.2;
    }
    
    if (embodiment.chronic_pain) {
      integration.integration_barriers.push("chronic_pain");
      integration.embodiment_level -= 0.15;
    }
    
    if (embodiment.dissociative_patterns) {
      integration.integration_barriers.push("dissociation");
      integration.coherence -= 0.25;
    }
  }
  
  // Cultural and spiritual embodiment factors
  if (caseContext.cultural_body_practices) {
    const practices = caseContext.cultural_body_practices;
    if (practices.traditional_healing || practices.ritual_practices) {
      integration.coherence += 0.1;
      integration.embodiment_level += 0.1;
    }
  }
  
  // Normalize values
  integration.coherence = Math.max(0, Math.min(1, integration.coherence));
  integration.dysregulation = Math.max(0, Math.min(1, integration.dysregulation));
  integration.embodiment_level = Math.max(0, Math.min(1, integration.embodiment_level));
  
  return integration;
}

function analyzeCommunalAtmosphere(caseContext: any) {
  const atmosphere = {
    overall_state: "neutral",
    tension: 0.3,
    cohesion: 0.6,
    collective_regulation: 0.5,
    energy_quality: "balanced",
    healing_potential: 0.7
  };
  
  // Assess group dynamics
  if (caseContext.group_dynamics) {
    const group = caseContext.group_dynamics;
    
    atmosphere.tension = group.tension_level || 0.3;
    atmosphere.cohesion = group.cohesion_score || 0.6;
    atmosphere.collective_regulation = group.co_regulation_capacity || 0.5;
    
    // Determine overall state
    if (atmosphere.tension > 0.7) {
      atmosphere.overall_state = "tense";
      atmosphere.healing_potential -= 0.2;
    } else if (atmosphere.cohesion > 0.8 && atmosphere.tension < 0.3) {
      atmosphere.overall_state = "harmonious";
      atmosphere.healing_potential += 0.2;
    } else if (atmosphere.collective_regulation < 0.3) {
      atmosphere.overall_state = "dysregulated";
      atmosphere.healing_potential -= 0.3;
    }
    
    // Assess energy quality
    if (group.energy_markers) {
      const energy = group.energy_markers;
      if (energy.excitement > 0.7 && energy.anxiety < 0.3) {
        atmosphere.energy_quality = "vibrant";
      } else if (energy.heaviness > 0.6) {
        atmosphere.energy_quality = "heavy";
        atmosphere.healing_potential -= 0.15;
      } else if (energy.stagnation > 0.5) {
        atmosphere.energy_quality = "stagnant";
        atmosphere.healing_potential -= 0.1;
      }
    }
  }
  
  // Community healing resources
  if (caseContext.community_resources) {
    const resources = caseContext.community_resources;
    if (resources.healing_practices || resources.artistic_expression) {
      atmosphere.healing_potential += 0.15;
    }
    if (resources.ritual_space || resources.sacred_practices) {
      atmosphere.healing_potential += 0.1;
    }
  }
  
  // Normalize healing potential
  atmosphere.healing_potential = Math.max(0, Math.min(1, atmosphere.healing_potential));
  
  return atmosphere;
}

function identifyRestorationNeeds(emotionalState: any, bodyIntegration: any) {
  const needs = [];
  
  // High emotional intensity needs
  if (emotionalState.intensity > 0.7) {
    needs.push("emotional_regulation_support");
    needs.push("nervous_system_calming");
  }
  
  // Dissociation needs
  if (emotionalState.dissociation > 0.4) {
    needs.push("grounding_practices");
    needs.push("embodiment_reconnection");
  }
  
  // Body integration needs
  if (bodyIntegration.dysregulation > 0.5) {
    needs.push("somatic_regulation");
    needs.push("nervous_system_restoration");
  }
  
  if (bodyIntegration.coherence < 0.4) {
    needs.push("mind_body_integration");
    needs.push("presence_cultivation");
  }
  
  // Trauma-informed needs
  if (bodyIntegration.integration_barriers.includes("trauma_activation")) {
    needs.push("trauma_informed_support");
    needs.push("safety_establishment");
  }
  
  // Low regulation capacity
  if (emotionalState.regulation_capacity < 0.4) {
    needs.push("coping_skills_development");
    needs.push("resilience_building");
  }
  
  return needs;
}

function assessCopingMechanisms(copingMechanisms: any) {
  let score = 0.5; // Base score
  
  // Positive coping mechanisms
  if (copingMechanisms.mindfulness_practices) score += 0.2;
  if (copingMechanisms.physical_exercise) score += 0.15;
  if (copingMechanisms.social_support) score += 0.2;
  if (copingMechanisms.creative_expression) score += 0.15;
  if (copingMechanisms.spiritual_practices) score += 0.1;
  
  // Negative coping mechanisms (reduce score)
  if (copingMechanisms.substance_use) score -= 0.3;
  if (copingMechanisms.avoidance_behaviors) score -= 0.2;
  if (copingMechanisms.self_harm) score -= 0.4;
  if (copingMechanisms.aggression) score -= 0.25;
  
  return Math.max(0.1, Math.min(1.0, score));
}
