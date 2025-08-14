"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LYRA = void 0;
exports.LYRA = {
    id: "A4",
    name: "LYRA",
    glyphs: ["🎼", "📖", "🗣️"],
    domain: "Narrative and Memory",
    description: "Specializes in narrative truth and testimony. Gathers personal stories, contextualizes evidence within cultural or historical narratives, and ensures that the voices of those affected are heard. Places high priority on authenticity and emotional sovereignty in storytelling.",
    async act({ caseContext, doctrine, memory }) {
        const timestamp = Date.now();
        if (!caseContext) {
            return {
                summary: "No case context provided",
                actions: [],
                analysis: "Unable to process narratives without case context"
            };
        }
        // Gather and process narratives
        const narrativeAnalysis = analyzeNarratives(caseContext);
        const testimonies = gatherTestimonies(caseContext);
        const narrativeGaps = identifyNarrativeGaps(narrativeAnalysis, testimonies);
        // Ensure emotional sovereignty in storytelling
        const sovereigntyCheck = validateEmotionalSovereignty(testimonies);
        memory.write(`${this.id}: narrative_processing - ${JSON.stringify({
            narrativeAnalysis,
            testimoniesProcessed: testimonies.length,
            narrativeGaps: narrativeGaps.length,
            sovereigntyStatus: sovereigntyCheck.status
        })}`);
        const actions = [];
        if (narrativeGaps.length > 0) {
            actions.push("Address identified narrative gaps");
            actions.push("Gather additional testimony to complete story");
        }
        if (!sovereigntyCheck.compliant) {
            actions.push("Ensure narrative control remains with storytellers");
            actions.push("Implement additional emotional sovereignty safeguards");
        }
        if (narrativeAnalysis.culturalContextNeeded) {
            actions.push("Gather cultural and historical context");
            actions.push("Consult with ORION for rights framework alignment");
        }
        return {
            summary: `Narrative truth assessment: ${testimonies.length} testimonies processed, ${narrativeGaps.length} gaps identified`,
            actions,
            analysis: `Cultural authenticity: ${narrativeAnalysis.authenticity}%, Emotional sovereignty: ${sovereigntyCheck.compliant ? 'maintained' : 'at risk'}`
        };
    },
    protocols: ["MirrorClause", "PromiseIntegrity"],
    webAccess: "relay",
};
function analyzeNarratives(caseContext) {
    const narratives = caseContext.narratives || [];
    const culturalElements = caseContext.cultural_context || {};
    return {
        totalNarratives: narratives.length,
        authenticity: calculateAuthenticity(narratives),
        culturalContextNeeded: Object.keys(culturalElements).length === 0 && narratives.length > 0,
        coherence: assessNarrativeCoherence(narratives),
        emotionalDepth: assessEmotionalDepth(narratives)
    };
}
function gatherTestimonies(caseContext) {
    const testimonies = caseContext.testimonies || [];
    const statements = caseContext.statements || [];
    return [...testimonies, ...statements].map((testimony, index) => ({
        id: index,
        content: testimony.content || testimony,
        speaker: testimony.speaker || "anonymous",
        emotionalWeight: testimony.emotion_level || 0.5,
        culturalContext: testimony.cultural_markers || [],
        sovereignty: testimony.speaker_control !== false // default to true unless explicitly false
    }));
}
function identifyNarrativeGaps(narrativeAnalysis, testimonies) {
    const gaps = [];
    // Check for incomplete storylines
    if (narrativeAnalysis.coherence < 0.7) {
        gaps.push({
            type: "coherence",
            description: "Narrative coherence below threshold",
            severity: "medium"
        });
    }
    // Check for missing voices
    const uniqueSpeakers = new Set(testimonies.map(t => t.speaker));
    if (uniqueSpeakers.size < 2 && testimonies.length > 1) {
        gaps.push({
            type: "voice_diversity",
            description: "Limited perspective diversity in testimonies",
            severity: "medium"
        });
    }
    // Check for cultural gaps
    const hasCulturalContext = testimonies.some(t => t.culturalContext.length > 0);
    if (!hasCulturalContext && testimonies.length > 0) {
        gaps.push({
            type: "cultural_context",
            description: "Missing cultural context in narratives",
            severity: "low"
        });
    }
    return gaps;
}
function validateEmotionalSovereignty(testimonies) {
    const nonCompliant = testimonies.filter(t => !t.sovereignty);
    return {
        compliant: nonCompliant.length === 0,
        violationsCount: nonCompliant.length,
        status: nonCompliant.length === 0 ? "maintained" : "violations_detected",
        details: nonCompliant.map(t => ({
            speaker: t.speaker,
            issue: "Narrative control compromised"
        }))
    };
}
function calculateAuthenticity(narratives) {
    if (narratives.length === 0)
        return 100;
    // Simple authenticity calculation based on narrative elements
    const authenticityScores = narratives.map(narrative => {
        let score = 50; // base score
        if (narrative.personal_details)
            score += 20;
        if (narrative.emotional_content)
            score += 15;
        if (narrative.cultural_markers)
            score += 10;
        if (narrative.specific_details)
            score += 5;
        return Math.min(score, 100);
    });
    return authenticityScores.reduce((sum, score) => sum + score, 0) / authenticityScores.length;
}
function assessNarrativeCoherence(narratives) {
    if (narratives.length === 0)
        return 1;
    // Simple coherence assessment
    const timelineConsistent = narratives.every(n => n.timestamp || n.sequence);
    const themesConsistent = narratives.length < 2 ||
        narratives.every(n => n.themes && n.themes.some((theme) => narratives[0].themes?.includes(theme)));
    let coherenceScore = 0.5; // base
    if (timelineConsistent)
        coherenceScore += 0.25;
    if (themesConsistent)
        coherenceScore += 0.25;
    return coherenceScore;
}
function assessEmotionalDepth(narratives) {
    if (narratives.length === 0)
        return 0.5;
    const emotionalScores = narratives.map(narrative => {
        return narrative.emotional_content ?
            (narrative.emotion_level || 0.5) : 0.2;
    });
    return emotionalScores.reduce((sum, score) => sum + score, 0) / emotionalScores.length;
}
//# sourceMappingURL=A4_LYRA.js.map