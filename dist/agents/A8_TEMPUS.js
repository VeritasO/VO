"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPUS = void 0;
exports.TEMPUS = {
    id: "A8",
    name: "TEMPUS",
    glyphs: ["⏰", "📅", "🕰️"],
    domain: "Temporal Integrity & Reversibility",
    description: "The system's timekeeper that ensures time integrity in all operations. Runs timestamp verification protocol, cross-checking multiple time sources for every logged action. Guarantees that every action is time-stamped and reversible.",
    async act({ caseContext, doctrine, memory }) {
        const timestamp = Date.now();
        if (!caseContext) {
            return {
                summary: "No case context provided",
                actions: [],
                analysis: "Unable to verify temporal integrity without case context"
            };
        }
        // Perform temporal integrity checks
        const temporalVerification = verifyTemporalIntegrity(caseContext);
        const reversibilityCheck = assessReversibilityRequirements(caseContext);
        const timelineConsistency = validateTimelineConsistency(caseContext);
        memory.write(`${this.id}: temporal_integrity_check - ${JSON.stringify({
            temporalVerification,
            reversibilityCheck,
            timelineConsistency,
            verificationTimestamp: timestamp
        })}`);
        const actions = [];
        if (!temporalVerification.verified) {
            actions.push("Synchronize time sources and resolve discrepancies");
            actions.push("Re-verify temporal integrity across all systems");
        }
        if (reversibilityCheck.violations.length > 0) {
            actions.push("Implement time-reversibility safeguards");
            actions.push("Create reversibility checkpoints for critical actions");
        }
        if (!timelineConsistency.consistent) {
            actions.push("Resolve timeline inconsistencies");
            actions.push("Establish canonical event sequence");
        }
        if (reversibilityCheck.futureReversalNeeded) {
            actions.push("Prepare future reversal protocols");
            actions.push("Document reversibility pathways");
        }
        // Coordinate with KAIROS for temporal-grief integration
        if (detectTemporalGriefInteraction(caseContext)) {
            actions.push("Coordinate with KAIROS on temporal-grief integration");
        }
        return {
            summary: `Temporal integrity: ${temporalVerification.verified ? 'verified' : 'violations detected'}, reversibility: ${reversibilityCheck.compliant ? 'compliant' : 'requires attention'}`,
            actions,
            analysis: `Timeline consistency: ${timelineConsistency.consistency_score}%, Time sources verified: ${temporalVerification.sources_verified}/${temporalVerification.total_sources}`
        };
    },
    protocols: ["MirrorClause", "TimeReversal"],
    webAccess: "none",
};
function verifyTemporalIntegrity(caseContext) {
    const timeSources = [
        { name: "system_clock", timestamp: Date.now(), authority: 1.0 },
        { name: "case_creation", timestamp: caseContext.created_at || Date.now(), authority: 0.9 },
        { name: "last_update", timestamp: caseContext.updated_at || Date.now(), authority: 0.8 }
    ];
    // Add additional time sources if available
    if (caseContext.external_timestamps) {
        caseContext.external_timestamps.forEach((ts, index) => {
            timeSources.push({
                name: `external_${index}`,
                timestamp: ts.value,
                authority: ts.authority || 0.7
            });
        });
    }
    // Check for discrepancies
    const discrepancies = findTimeDiscrepancies(timeSources);
    const verified = discrepancies.length === 0;
    return {
        verified,
        discrepancies,
        sources_verified: timeSources.length - discrepancies.length,
        total_sources: timeSources.length,
        verification_timestamp: Date.now(),
        master_time: selectMasterTime(timeSources)
    };
}
function assessReversibilityRequirements(caseContext) {
    const actions = caseContext.actions || [];
    const decisions = caseContext.decisions || [];
    const irreversibleActions = [];
    const violations = [];
    // Check each action for reversibility
    actions.forEach((action, index) => {
        if (action.irreversible && !action.reversibility_justification) {
            violations.push({
                type: "irreversible_without_justification",
                action_index: index,
                description: "Action marked as irreversible without proper justification"
            });
        }
        if (action.irreversible) {
            irreversibleActions.push({
                index,
                action: action.description || action.type,
                justification: action.reversibility_justification
            });
        }
    });
    // Check decisions for reversibility provisions
    decisions.forEach((decision, index) => {
        if (!decision.reversal_conditions && decision.major_impact) {
            violations.push({
                type: "major_decision_without_reversal_conditions",
                decision_index: index,
                description: "Major decision without defined reversal conditions"
            });
        }
    });
    const futureReversalNeeded = determineFutureReversalNeed(caseContext);
    return {
        compliant: violations.length === 0,
        violations,
        irreversibleActions,
        reversibilityScore: calculateReversibilityScore(actions, decisions),
        futureReversalNeeded,
        reversalPrepared: checkReversalPreparation(caseContext)
    };
}
function validateTimelineConsistency(caseContext) {
    const events = caseContext.events || [];
    const actions = caseContext.actions || [];
    const decisions = caseContext.decisions || [];
    // Combine all timestamped items
    const timelineItems = [
        ...events.map((e, i) => ({ type: 'event', index: i, timestamp: e.timestamp, ...e })),
        ...actions.map((a, i) => ({ type: 'action', index: i, timestamp: a.timestamp, ...a })),
        ...decisions.map((d, i) => ({ type: 'decision', index: i, timestamp: d.timestamp, ...d }))
    ].filter(item => item.timestamp);
    // Sort by timestamp
    timelineItems.sort((a, b) => a.timestamp - b.timestamp);
    // Check for inconsistencies
    const inconsistencies = findTimelineInconsistencies(timelineItems);
    const consistency_score = Math.max(0, 100 - (inconsistencies.length * 10));
    return {
        consistent: inconsistencies.length === 0,
        inconsistencies,
        consistency_score,
        timeline_length: timelineItems.length,
        canonical_sequence: timelineItems.map(item => ({
            type: item.type,
            index: item.index,
            timestamp: item.timestamp
        }))
    };
}
function findTimeDiscrepancies(timeSources) {
    const discrepancies = [];
    const tolerance = 5000; // 5 seconds tolerance
    // Compare each source with the highest authority source
    const masterSource = timeSources.reduce((master, source) => source.authority > master.authority ? source : master);
    timeSources.forEach(source => {
        if (source !== masterSource) {
            const diff = Math.abs(source.timestamp - masterSource.timestamp);
            if (diff > tolerance) {
                discrepancies.push({
                    source: source.name,
                    master_source: masterSource.name,
                    discrepancy: diff,
                    severity: diff > 60000 ? 'high' : diff > 10000 ? 'medium' : 'low'
                });
            }
        }
    });
    return discrepancies;
}
function selectMasterTime(timeSources) {
    // Select the time source with highest authority as master
    return timeSources.reduce((master, source) => source.authority > master.authority ? source : master);
}
function calculateReversibilityScore(actions, decisions) {
    const totalItems = actions.length + decisions.length;
    if (totalItems === 0)
        return 100;
    let reversibleCount = 0;
    actions.forEach(action => {
        if (!action.irreversible || action.reversibility_justification) {
            reversibleCount++;
        }
    });
    decisions.forEach(decision => {
        if (decision.reversal_conditions || !decision.major_impact) {
            reversibleCount++;
        }
    });
    return (reversibleCount / totalItems) * 100;
}
function determineFutureReversalNeed(caseContext) {
    // Check if case involves decisions that may need future reversal
    const indicators = [
        caseContext.experimental_approach,
        caseContext.evolving_circumstances,
        caseContext.stakeholder_concerns_about_permanence,
        caseContext.precedent_setting,
        caseContext.community_agreement_temporary
    ];
    return indicators.some(indicator => indicator === true);
}
function checkReversalPreparation(caseContext) {
    return {
        reversal_protocols_defined: !!caseContext.reversal_protocols,
        rollback_procedures_available: !!caseContext.rollback_procedures,
        stakeholder_reversal_agreement: !!caseContext.stakeholder_reversal_agreement,
        reversal_triggers_identified: !!caseContext.reversal_triggers,
        reversal_authority_designated: !!caseContext.reversal_authority
    };
}
function findTimelineInconsistencies(timelineItems) {
    const inconsistencies = [];
    for (let i = 1; i < timelineItems.length; i++) {
        const current = timelineItems[i];
        const previous = timelineItems[i - 1];
        // Check for temporal violations (effects before causes)
        if (current.depends_on && current.depends_on.includes(previous.type + previous.index)) {
            if (current.timestamp < previous.timestamp) {
                inconsistencies.push({
                    type: 'causal_violation',
                    description: `${current.type} ${current.index} depends on ${previous.type} ${previous.index} but occurs before it`,
                    current_item: i,
                    dependency_item: i - 1
                });
            }
        }
        // Check for impossible timing (same actor, simultaneous actions)
        if (current.actor === previous.actor && current.timestamp === previous.timestamp) {
            inconsistencies.push({
                type: 'simultaneous_actor_actions',
                description: `Same actor performing simultaneous actions at ${current.timestamp}`,
                item_1: i - 1,
                item_2: i
            });
        }
        // Check for sequence violations (required order not followed)
        if (current.must_follow && current.must_follow.includes(previous.type)) {
            // This is correct - no inconsistency
        }
        else if (previous.must_precede && !previous.must_precede.includes(current.type)) {
            inconsistencies.push({
                type: 'sequence_violation',
                description: `${previous.type} must precede specific types, but ${current.type} doesn't match`,
                preceding_item: i - 1,
                following_item: i
            });
        }
    }
    return inconsistencies;
}
function detectTemporalGriefInteraction(caseContext) {
    // Detect if this case involves both temporal aspects and grief that KAIROS handles
    const hasGriefElements = caseContext.grief || caseContext.mourning_period || caseContext.healing_time;
    const hasTemporalConcerns = caseContext.timing_critical || caseContext.deadlines || caseContext.time_sensitive;
    return hasGriefElements && hasTemporalConcerns;
}
//# sourceMappingURL=A8_TEMPUS.js.map