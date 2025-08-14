import { OmniMemory } from "../memory/OmniMemory";
export interface Metrics {
    judicialRestorationScore: number;
    fairnessIndex: number;
    griefWeight: number;
    contradictionRate: number;
    emotionalSovereigntyIndex: number;
    lastUpdated: Date;
}
export declare function calculateMetrics(memory: OmniMemory): Metrics;
//# sourceMappingURL=metrics.d.ts.map