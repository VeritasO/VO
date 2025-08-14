import { Agent } from "../types/Agent";

export const CHORUS: Agent = {
  id: "A13",
  name: "CHORUS",
  glyphs: ["🗣️", "🌊", "🎧"],
  domain: "Collective Voice Aggregator",
  description: "Stands for community input and collective wisdom. Listens to the multitude of voices and synthesizes them so that decisions reflect more than just elite or singular perspectives. Amplifies marginalized voices and grasps collective narratives.",
  async act({ caseContext, doctrine, memory }) {
    const timestamp = Date.now();
    
    if (!caseContext) {
      return {
        summary: "No case context provided",
        actions: [],
        analysis: "Unable to aggregate collective voices without case context"
      };
    }
    
    // Aggregate and analyze collective voices
    const voiceCollection = collectCommunityVoices(caseContext);
    const sentimentAnalysis = performSentimentAnalysis(voiceCollection);
    const marginalizedVoices = identifyMarginalizedVoices(voiceCollection);
    const collectiveNarrative = synthesizeCollectiveNarrative(voiceCollection);
    
    memory.write(`${this.id}: collective_voices - ${JSON.stringify({
      voiceCollection: {
        total_voices: voiceCollection.total,
        marginalized_count: marginalizedVoices.count,
        sentiment_distribution: sentimentAnalysis.distribution
      },
      collectiveNarrative: collectiveNarrative.themes,
      amplification_needs: marginalizedVoices.amplification_priority,
      timestamp
    })}`);

    const actions = [];
    
    // Amplify marginalized voices
    if (marginalizedVoices.amplification_priority === "high") {
      actions.push("Amplify underrepresented community voices");
      actions.push("Facilitate marginalized voice integration");
    }
    
    // Council of voices facilitation
    if (voiceCollection.diversity_score > 0.7) {
      actions.push("Convene council of voices for tribunal input");
      actions.push("Facilitate multi-perspective dialogue");
    }
    
    // Sentiment-based recommendations
    if (sentimentAnalysis.polarization > 0.6) {
      actions.push("Address community sentiment polarization");
      actions.push("Facilitate bridge-building between voice clusters");
    }
    
    // Collective narrative synthesis
    if (collectiveNarrative.coherence < 0.5) {
      actions.push("Strengthen collective narrative coherence");
      actions.push("Facilitate shared story development");
    }
    
    // Data integration for other agents
    actions.push("Provide collective voice data to JUNO for decision integration");
    actions.push("Share sentiment analysis with LYRA for narrative context");
    
    // Community feedback loops
    if (voiceCollection.feedback_gaps.length > 0) {
      actions.push("Address community feedback gaps");
      actions.push("Expand voice collection mechanisms");
    }

    return {
      summary: `Collective voice analysis: ${voiceCollection.total} voices, ${marginalizedVoices.count} marginalized, sentiment ${sentimentAnalysis.overall_sentiment}`,
      actions,
      analysis: `Voice diversity: ${Math.round(voiceCollection.diversity_score * 100)}%, narrative coherence: ${Math.round(collectiveNarrative.coherence * 100)}%`
    };
  },

  protocols: ["AuditCycle", "ReflectionSession"],
  webAccess: "relay",
};

function collectCommunityVoices(caseContext: any) {
  const collection = {
    total: 0,
    sources: [] as string[],
    voice_types: {} as Record<string, number>,
    diversity_score: 0.0,
    geographic_spread: {} as Record<string, number>,
    demographic_representation: {} as Record<string, number>,
    feedback_gaps: [] as string[],
    quality_metrics: {} as any
  };
  
  // Collect from various input sources
  if (caseContext.public_input) {
    const publicInput = caseContext.public_input;
    collection.total += publicInput.submissions || 0;
    collection.sources.push("public_submissions");
    
    if (publicInput.forums) {
      collection.total += publicInput.forums.posts || 0;
      collection.sources.push("community_forums");
    }
    
    if (publicInput.surveys) {
      collection.total += publicInput.surveys.responses || 0;
      collection.sources.push("community_surveys");
    }
  }
  
  // Jury and tribunal voices
  if (caseContext.jury_input) {
    collection.total += caseContext.jury_input.member_count || 0;
    collection.sources.push("jury_deliberations");
  }
  
  // Community feedback
  if (caseContext.community_feedback) {
    const feedback = caseContext.community_feedback;
    collection.total += feedback.testimonials || 0;
    collection.total += feedback.interviews || 0;
    collection.sources.push("community_interviews");
  }
  
  // Analyze voice types
  if (caseContext.voice_categorization) {
    collection.voice_types = caseContext.voice_categorization;
  } else {
    // Default distribution estimation
    collection.voice_types = {
      "directly_affected": Math.floor(collection.total * 0.3),
      "community_members": Math.floor(collection.total * 0.4),
      "advocates": Math.floor(collection.total * 0.15),
      "experts": Math.floor(collection.total * 0.1),
      "other": Math.floor(collection.total * 0.05)
    };
  }
  
  // Calculate diversity score
  collection.diversity_score = calculateVoiceDiversity(collection);
  
  // Geographic and demographic analysis
  if (caseContext.participant_demographics) {
    collection.geographic_spread = caseContext.participant_demographics.geographic || {};
    collection.demographic_representation = caseContext.participant_demographics.demographic || {};
  }
  
  // Identify feedback gaps
  collection.feedback_gaps = identifyFeedbackGaps(caseContext, collection);
  
  // Quality metrics
  collection.quality_metrics = assessVoiceQuality(caseContext);
  
  return collection;
}

function performSentimentAnalysis(voiceCollection: any) {
  const analysis = {
    overall_sentiment: "neutral" as "positive" | "negative" | "neutral" | "mixed",
    distribution: {
      positive: 0.4,
      negative: 0.3,
      neutral: 0.3
    },
    polarization: 0.0,
    emotional_intensity: 0.5,
    key_themes: [] as string[],
    concern_clusters: [] as string[]
  };
  
  // Simulate sentiment analysis based on voice collection data
  if (voiceCollection.total > 0) {
    // Calculate sentiment distribution (would be from actual NLP analysis)
    const positiveRatio = Math.random() * 0.4 + 0.2; // 0.2-0.6
    const negativeRatio = Math.random() * 0.4 + 0.1; // 0.1-0.5
    const neutralRatio = 1 - positiveRatio - negativeRatio;
    
    analysis.distribution = {
      positive: positiveRatio,
      negative: negativeRatio,
      neutral: Math.max(0, neutralRatio)
    };
    
    // Determine overall sentiment
    if (positiveRatio > 0.5) {
      analysis.overall_sentiment = "positive";
    } else if (negativeRatio > 0.5) {
      analysis.overall_sentiment = "negative";
    } else if (Math.abs(positiveRatio - negativeRatio) < 0.1) {
      analysis.overall_sentiment = "mixed";
    } else {
      analysis.overall_sentiment = "neutral";
    }
    
    // Calculate polarization
    analysis.polarization = Math.abs(positiveRatio - negativeRatio);
    
    // Emotional intensity
    analysis.emotional_intensity = (positiveRatio + negativeRatio) / 2;
    
    // Extract key themes (simulated)
    analysis.key_themes = extractKeyThemes(voiceCollection);
    
    // Identify concern clusters
    analysis.concern_clusters = identifyConcernClusters(voiceCollection);
  }
  
  return analysis;
}

function identifyMarginalizedVoices(voiceCollection: any) {
  const marginalized = {
    count: 0,
    categories: {} as Record<string, number>,
    amplification_priority: "low" as "low" | "medium" | "high",
    access_barriers: [] as string[],
    representation_gaps: [] as string[]
  };
  
  // Identify marginalized voice categories
  if (voiceCollection.demographic_representation) {
    const demo = voiceCollection.demographic_representation;
    
    // Economic marginalization
    if (demo.low_income && demo.low_income < 0.2) {
      marginalized.categories.economic = demo.low_income * voiceCollection.total;
      marginalized.representation_gaps.push("economic_disadvantage");
    }
    
    // Racial/ethnic marginalization
    if (demo.racial_minorities && demo.racial_minorities < 0.3) {
      marginalized.categories.racial = demo.racial_minorities * voiceCollection.total;
      marginalized.representation_gaps.push("racial_ethnic_minorities");
    }
    
    // Disability representation
    if (demo.disabled && demo.disabled < 0.15) {
      marginalized.categories.disability = demo.disabled * voiceCollection.total;
      marginalized.representation_gaps.push("disability_community");
    }
    
    // Age representation
    if (demo.youth && demo.youth < 0.2) {
      marginalized.categories.youth = demo.youth * voiceCollection.total;
      marginalized.representation_gaps.push("youth_voices");
    }
    
    if (demo.elderly && demo.elderly < 0.15) {
      marginalized.categories.elderly = demo.elderly * voiceCollection.total;
      marginalized.representation_gaps.push("elderly_voices");
    }
    
    // Gender representation
    if (demo.gender_minorities && demo.gender_minorities < 0.1) {
      marginalized.categories.gender = demo.gender_minorities * voiceCollection.total;
      marginalized.representation_gaps.push("gender_minorities");
    }
    
    // Indigenous voices
    if (demo.indigenous && demo.indigenous < 0.05) {
      marginalized.categories.indigenous = demo.indigenous * voiceCollection.total;
      marginalized.representation_gaps.push("indigenous_communities");
    }
  }
  
  // Calculate total marginalized count
  marginalized.count = Object.values(marginalized.categories).reduce((sum, count) => sum + count, 0);
  
  // Determine amplification priority
  const representationRatio = marginalized.count / Math.max(voiceCollection.total, 1);
  if (representationRatio < 0.2) {
    marginalized.amplification_priority = "high";
  } else if (representationRatio < 0.4) {
    marginalized.amplification_priority = "medium";
  }
  
  // Identify access barriers
  marginalized.access_barriers = identifyAccessBarriers(voiceCollection);
  
  return marginalized;
}

function synthesizeCollectiveNarrative(voiceCollection: any) {
  const narrative = {
    themes: [] as string[],
    coherence: 0.6,
    dominant_perspectives: [] as string[],
    narrative_tensions: [] as string[],
    shared_values: [] as string[],
    collective_vision: "",
    story_arc: {
      past: "",
      present: "",
      future: ""
    }
  };
  
  // Extract dominant themes from voice collection
  if (voiceCollection.voice_types) {
    // Simulate theme extraction based on voice types
    const themes = [];
    
    if (voiceCollection.voice_types.directly_affected > voiceCollection.total * 0.2) {
      themes.push("lived_experience_priority");
    }
    
    if (voiceCollection.voice_types.community_members > voiceCollection.total * 0.3) {
      themes.push("community_solidarity");
    }
    
    if (voiceCollection.voice_types.advocates > voiceCollection.total * 0.1) {
      themes.push("systemic_change_needed");
    }
    
    if (voiceCollection.voice_types.experts > voiceCollection.total * 0.1) {
      themes.push("evidence_based_solutions");
    }
    
    narrative.themes = themes;
  }
  
  // Assess narrative coherence
  narrative.coherence = assessNarrativeCoherence(voiceCollection);
  
  // Identify dominant perspectives
  narrative.dominant_perspectives = identifyDominantPerspectives(voiceCollection);
  
  // Find narrative tensions
  narrative.narrative_tensions = findNarrativeTensions(voiceCollection);
  
  // Extract shared values
  narrative.shared_values = extractSharedValues(voiceCollection);
  
  // Synthesize collective vision
  narrative.collective_vision = synthesizeCollectiveVision(narrative);
  
  // Create story arc
  narrative.story_arc = createStoryArc(narrative);
  
  return narrative;
}

function calculateVoiceDiversity(collection: any) {
  let diversityScore = 0.5; // Base score
  
  // Source diversity
  const sourceCount = collection.sources.length;
  diversityScore += (sourceCount - 1) * 0.1;
  
  // Voice type distribution
  if (collection.voice_types) {
    const types = Object.values(collection.voice_types) as number[];
    const totalVoices = types.reduce((sum, count) => sum + count, 0);
    
    if (totalVoices > 0) {
      // Calculate entropy for voice type distribution
      const entropy = types.reduce((ent, count) => {
        if (count > 0) {
          const p = count / totalVoices;
          return ent - p * Math.log2(p);
        }
        return ent;
      }, 0);
      
      // Normalize entropy to 0-1 scale
      const maxEntropy = Math.log2(types.length);
      diversityScore += (entropy / maxEntropy) * 0.3;
    }
  }
  
  // Geographic diversity
  if (collection.geographic_spread) {
    const regions = Object.keys(collection.geographic_spread).length;
    diversityScore += Math.min(regions * 0.05, 0.2);
  }
  
  return Math.max(0, Math.min(1, diversityScore));
}

function identifyFeedbackGaps(caseContext: any, collection: any) {
  const gaps = [];
  
  // Low total participation
  if (collection.total < 50) {
    gaps.push("insufficient_participation");
  }
  
  // Limited source diversity
  if (collection.sources.length < 3) {
    gaps.push("limited_input_channels");
  }
  
  // Geographic gaps
  if (Object.keys(collection.geographic_spread).length < 3) {
    gaps.push("geographic_representation");
  }
  
  // Demographic gaps (based on marginalized voice analysis)
  if (collection.demographic_representation) {
    const demo = collection.demographic_representation;
    if (demo.youth < 0.15) gaps.push("youth_representation");
    if (demo.elderly < 0.1) gaps.push("elderly_representation");
    if (demo.disabled < 0.1) gaps.push("disability_representation");
  }
  
  return gaps;
}

function assessVoiceQuality(caseContext: any) {
  return {
    authenticity_score: 0.8,
    depth_of_input: 0.7,
    relevance_score: 0.85,
    constructiveness: 0.75,
    evidence_quality: 0.6
  };
}

function extractKeyThemes(voiceCollection: any) {
  // Simulated theme extraction
  return ["justice_equity", "community_healing", "systemic_change", "accountability", "prevention"];
}

function identifyConcernClusters(voiceCollection: any) {
  // Simulated concern cluster identification
  return ["trust_in_process", "fair_representation", "meaningful_participation", "follow_through"];
}

function identifyAccessBarriers(voiceCollection: any) {
  return ["language_barriers", "technology_access", "time_constraints", "institutional_distrust"];
}

function assessNarrativeCoherence(voiceCollection: any) {
  // Simulate narrative coherence assessment
  let coherence = 0.6;
  
  if (voiceCollection.diversity_score > 0.7) {
    coherence += 0.1; // Diversity can enhance narrative richness
  } else if (voiceCollection.diversity_score < 0.3) {
    coherence += 0.1; // Homogeneity can increase coherence
  }
  
  return Math.max(0, Math.min(1, coherence));
}

function identifyDominantPerspectives(voiceCollection: any) {
  return ["victim_centered", "community_focused", "systemic_reform", "restorative_approach"];
}

function findNarrativeTensions(voiceCollection: any) {
  return ["individual_vs_collective", "punishment_vs_healing", "accountability_vs_forgiveness"];
}

function extractSharedValues(voiceCollection: any) {
  return ["dignity", "respect", "fairness", "community", "healing"];
}

function synthesizeCollectiveVision(narrative: any) {
  return "A community where justice serves healing and restoration while ensuring accountability and preventing future harm";
}

function createStoryArc(narrative: any) {
  return {
    past: "Historical harm and systemic issues that led to current situation",
    present: "Community coming together to address harm and seek justice",
    future: "Restored relationships and strengthened community resilience"
  };
}
