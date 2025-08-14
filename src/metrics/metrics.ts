// metrics/metrics.ts
import { OmniMemory } from "../memory/OmniMemory";

export interface Metrics {
  judicialRestorationScore: number;
  fairnessIndex: number;
  griefWeight: number;
  contradictionRate: number;
  emotionalSovereigntyIndex: number;
  lastUpdated: Date;
}

export function calculateMetrics(memory: OmniMemory): Metrics {
  const totalLogs = memory.logs.length;
  const totalContradictions = memory.contradictions.length;
  const resolvedContradictions = memory.contradictions.filter(c => c.resolved).length;
  
  // Calculate contradiction rate
  const contradictionRate = totalLogs > 0 ? totalContradictions / totalLogs : 0;
  
  // Calculate resolution efficiency
  const resolutionEfficiency = totalContradictions > 0 ? resolvedContradictions / totalContradictions : 1;
  
  return {
    judicialRestorationScore: Math.max(0, 0.98 - (contradictionRate * 0.1)),
    fairnessIndex: Math.max(0, 0.95 - (contradictionRate * 0.05)),
    griefWeight: 0.7, // Static for now, could be calculated based on emotional sovereignty violations
    contradictionRate,
    emotionalSovereigntyIndex: Math.max(0, 0.92 * resolutionEfficiency),
    lastUpdated: new Date(),
  };
}
