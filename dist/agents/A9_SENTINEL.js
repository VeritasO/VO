"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENTINEL = void 0;
exports.SENTINEL = {
    id: "A9",
    name: "SENTINEL",
    glyphs: ["🛰️", "🛠️", "📡"],
    domain: "Surveillance & Anomaly Monitor",
    description: "Provides continuous system monitoring - surveils the Veritas.O system itself for anomalies, contradictions, or integrity issues. Acts like an immune system for the platform, detecting data corruption, agent anomalies, or undetected contradictions.",
    async act({ caseContext, doctrine, memory }) {
        const timestamp = Date.now();
        if (!caseContext) {
            return {
                summary: "No case context provided",
                actions: [],
                analysis: "Unable to monitor system without case context"
            };
        }
        // Perform comprehensive system surveillance
        const systemScan = performSystemScan(caseContext);
        const anomalyDetection = detectAnomalies(caseContext, systemScan);
        const integrityCheck = checkSystemIntegrity(caseContext);
        memory.write(`${this.id}: system_surveillance - ${JSON.stringify({
            systemScan,
            anomaliesDetected: anomalyDetection.anomalies.length,
            integrityStatus: integrityCheck.status,
            surveillanceTimestamp: timestamp
        })}`);
        const actions = [];
        if (anomalyDetection.anomalies.length > 0) {
            actions.push("Alert JUNO to identified system anomalies");
            actions.push("Initiate anomaly investigation protocols");
        }
        if (!integrityCheck.intact) {
            actions.push("Execute integrity restoration procedures");
            actions.push("Coordinate with MIRRA for contradiction analysis");
        }
        if (systemScan.narrativeFreezeDetected) {
            actions.push("Alert LYRA to narrative freeze condition");
            actions.push("Initiate narrative flow restoration");
        }
        if (systemScan.griefAvoidanceLoop) {
            actions.push("Alert KAIROS to grief avoidance loop");
            actions.push("Recommend grief processing intervention");
        }
        if (anomalyDetection.contradictionEchoes.length > 0) {
            actions.push("Report contradiction echoes to MIRRA");
            actions.push("Trigger internal contradiction audit");
        }
        return {
            summary: `System surveillance: ${anomalyDetection.anomalies.length} anomalies detected, integrity ${integrityCheck.intact ? 'intact' : 'compromised'}`,
            actions,
            analysis: `System health: ${systemScan.healthScore}%, Anomaly severity: ${anomalyDetection.maxSeverity}`
        };
    },
    protocols: ["MirrorClause", "AuditCycle"],
    webAccess: "none",
};
function performSystemScan(caseContext) {
    const scanResults = {
        healthScore: 100,
        narrativeFreezeDetected: false,
        griefAvoidanceLoop: false,
        agentBehaviorAnomalies: [],
        dataIntegrityIssues: [],
        performanceMetrics: {}
    };
    // Check for narrative freeze
    if (caseContext.narrative_progression) {
        const progressionRate = calculateNarrativeProgression(caseContext.narrative_progression);
        if (progressionRate < 0.1) {
            scanResults.narrativeFreezeDetected = true;
            scanResults.healthScore -= 20;
        }
    }
    // Check for grief avoidance loops
    if (caseContext.grief_patterns) {
        const griefLoop = detectGriefAvoidanceLoop(caseContext.grief_patterns);
        if (griefLoop) {
            scanResults.griefAvoidanceLoop = true;
            scanResults.healthScore -= 15;
        }
    }
    // Check agent behavior
    if (caseContext.agent_activities) {
        const behaviorAnomalies = scanAgentBehavior(caseContext.agent_activities);
        scanResults.agentBehaviorAnomalies = behaviorAnomalies;
        scanResults.healthScore -= behaviorAnomalies.length * 5;
    }
    // Check data integrity
    const dataIssues = scanDataIntegrity(caseContext);
    scanResults.dataIntegrityIssues = dataIssues;
    scanResults.healthScore -= dataIssues.length * 10;
    // Performance metrics
    scanResults.performanceMetrics = gatherPerformanceMetrics(caseContext);
    return scanResults;
}
function detectAnomalies(caseContext, systemScan) {
    const anomalies = [];
    const contradictionEchoes = [];
    // Data corruption anomalies
    systemScan.dataIntegrityIssues.forEach((issue) => {
        anomalies.push({
            type: "data_corruption",
            severity: issue.severity,
            description: issue.description,
            location: issue.location,
            detectedAt: Date.now()
        });
    });
    // Agent behavior anomalies
    systemScan.agentBehaviorAnomalies.forEach((anomaly) => {
        anomalies.push({
            type: "agent_behavior",
            severity: anomaly.severity,
            description: `Agent ${anomaly.agentId} exhibiting ${anomaly.behavior}`,
            agent: anomaly.agentId,
            detectedAt: Date.now()
        });
    });
    // Performance anomalies
    if (systemScan.performanceMetrics.responseTime > 10000) { // 10 seconds
        anomalies.push({
            type: "performance_degradation",
            severity: "medium",
            description: "System response time exceeding acceptable limits",
            metric: "response_time",
            value: systemScan.performanceMetrics.responseTime,
            detectedAt: Date.now()
        });
    }
    // Narrative freeze anomaly
    if (systemScan.narrativeFreezeDetected) {
        anomalies.push({
            type: "narrative_freeze",
            severity: "high",
            description: "Case narrative has stopped progressing",
            detectedAt: Date.now()
        });
    }
    // Grief avoidance loop
    if (systemScan.griefAvoidanceLoop) {
        anomalies.push({
            type: "grief_avoidance_loop",
            severity: "medium",
            description: "System circling around grief without resolution",
            detectedAt: Date.now()
        });
    }
    // Detect contradiction echoes
    if (caseContext.contradictions) {
        caseContext.contradictions.forEach((contradiction) => {
            if (contradiction.status === "unresolved" && contradiction.echo_detected) {
                contradictionEchoes.push({
                    contradictionId: contradiction.id,
                    echoType: contradiction.echo_type,
                    severity: contradiction.severity,
                    firstDetected: contradiction.first_detected,
                    lastEcho: Date.now()
                });
            }
        });
    }
    const maxSeverity = determineMaxSeverity(anomalies);
    return {
        anomalies,
        contradictionEchoes,
        maxSeverity,
        totalCount: anomalies.length,
        criticalCount: anomalies.filter(a => a.severity === "critical").length
    };
}
function checkSystemIntegrity(caseContext) {
    const integrityChecks = {
        dataConsistency: true,
        agentCoordination: true,
        memoryIntegrity: true,
        doctrinalCoherence: true,
        temporalConsistency: true
    };
    let integrityScore = 100;
    const violations = [];
    // Check data consistency
    if (caseContext.data_corruption || caseContext.inconsistent_data) {
        integrityChecks.dataConsistency = false;
        integrityScore -= 20;
        violations.push("Data consistency compromised");
    }
    // Check agent coordination
    if (caseContext.agent_conflicts || caseContext.coordination_failures) {
        integrityChecks.agentCoordination = false;
        integrityScore -= 15;
        violations.push("Agent coordination integrity violated");
    }
    // Check memory integrity
    if (caseContext.memory_corruption || caseContext.lost_entries) {
        integrityChecks.memoryIntegrity = false;
        integrityScore -= 25;
        violations.push("Memory system integrity compromised");
    }
    // Check doctrinal coherence
    if (caseContext.doctrinal_contradictions || caseContext.principle_violations) {
        integrityChecks.doctrinalCoherence = false;
        integrityScore -= 20;
        violations.push("Doctrinal coherence violated");
    }
    // Check temporal consistency
    if (caseContext.temporal_violations || caseContext.timeline_corruption) {
        integrityChecks.temporalConsistency = false;
        integrityScore -= 15;
        violations.push("Temporal consistency compromised");
    }
    const intact = violations.length === 0;
    return {
        intact,
        integrityScore,
        violations,
        checks: integrityChecks,
        status: intact ? "integral" : violations.length < 3 ? "compromised" : "critical"
    };
}
function calculateNarrativeProgression(narrativeProgression) {
    if (!narrativeProgression || !narrativeProgression.timeline) {
        return 0;
    }
    const timeline = narrativeProgression.timeline;
    const recentEvents = timeline.filter((event) => Date.now() - event.timestamp < 3600000 // Last hour
    );
    return recentEvents.length / Math.max(timeline.length, 1);
}
function detectGriefAvoidanceLoop(griefPatterns) {
    if (!griefPatterns || !griefPatterns.cycles) {
        return false;
    }
    // Look for repeating patterns without resolution
    const cycles = griefPatterns.cycles;
    const recentCycles = cycles.filter((cycle) => Date.now() - cycle.timestamp < 86400000 // Last 24 hours
    );
    // If more than 3 similar cycles without progression, it's likely a loop
    if (recentCycles.length > 3) {
        const uniqueTypes = new Set(recentCycles.map((c) => c.type));
        if (uniqueTypes.size < 2) {
            return true; // Same type of grief cycle repeating
        }
    }
    return false;
}
function scanAgentBehavior(agentActivities) {
    const anomalies = [];
    Object.entries(agentActivities).forEach(([agentId, activities]) => {
        // Check for unusual activity patterns
        if (activities.error_rate > 0.2) {
            anomalies.push({
                agentId,
                behavior: "high_error_rate",
                severity: "medium",
                value: activities.error_rate
            });
        }
        if (activities.response_time > 30000) { // 30 seconds
            anomalies.push({
                agentId,
                behavior: "slow_response",
                severity: "low",
                value: activities.response_time
            });
        }
        if (activities.contradiction_generation > 0.1) {
            anomalies.push({
                agentId,
                behavior: "excessive_contradictions",
                severity: "high",
                value: activities.contradiction_generation
            });
        }
        if (activities.memory_write_failures > 0) {
            anomalies.push({
                agentId,
                behavior: "memory_write_failure",
                severity: "critical",
                value: activities.memory_write_failures
            });
        }
    });
    return anomalies;
}
function scanDataIntegrity(caseContext) {
    const issues = [];
    // Check for missing required fields
    const requiredFields = ['id', 'created_at', 'participants'];
    requiredFields.forEach(field => {
        if (!caseContext[field]) {
            issues.push({
                type: "missing_field",
                field,
                severity: "medium",
                description: `Required field '${field}' is missing`,
                location: "caseContext"
            });
        }
    });
    // Check for data type inconsistencies
    if (caseContext.created_at && typeof caseContext.created_at !== 'number') {
        issues.push({
            type: "type_mismatch",
            field: "created_at",
            severity: "low",
            description: "Timestamp should be numeric",
            location: "caseContext"
        });
    }
    // Check for corrupted arrays
    if (caseContext.participants && !Array.isArray(caseContext.participants)) {
        issues.push({
            type: "corrupted_array",
            field: "participants",
            severity: "high",
            description: "Participants field is not an array",
            location: "caseContext"
        });
    }
    return issues;
}
function gatherPerformanceMetrics(caseContext) {
    return {
        responseTime: caseContext.response_time || Math.random() * 5000, // Simulated
        memoryUsage: caseContext.memory_usage || Math.random() * 100, // Simulated
        cpuUsage: caseContext.cpu_usage || Math.random() * 100, // Simulated
        cacheHitRate: caseContext.cache_hit_rate || 0.8 + Math.random() * 0.2, // Simulated
        errorRate: caseContext.error_rate || Math.random() * 0.05 // Simulated
    };
}
function determineMaxSeverity(anomalies) {
    if (anomalies.some(a => a.severity === "critical"))
        return "critical";
    if (anomalies.some(a => a.severity === "high"))
        return "high";
    if (anomalies.some(a => a.severity === "medium"))
        return "medium";
    if (anomalies.some(a => a.severity === "low"))
        return "low";
    return "none";
}
//# sourceMappingURL=A9_SENTINEL.js.map