/**
 * contradictionEngine.ts
 * Veritas.O Core Contradiction Engine
 *
 * Provides functions to detect and explain contradictions between values, objects, or doctrinal statements.
 */
export type ContradictionResult = {
    isContradiction: boolean;
    reason?: string;
    path?: string;
};
/**
 * Checks if two primitive values, objects, or arrays contradict each other.
 * - For primitives: direct comparison
 * - For objects/arrays: shallow deep comparison (expand as needed)
 */
export declare function detectContradiction(a: any, b: any, options?: {
    deep?: boolean;
}): ContradictionResult;
/**
 * Example utility: checks for contradiction in an array of statements
 */
export declare function findFirstContradiction(items: any[]): ContradictionResult & {
    indexA?: number;
    indexB?: number;
};
/**
 * Checks if two statements contradict each other.
 * - For simple strings: direct logical negation (e.g., 'A' vs '!A').
 * - For objects/arrays: shallow comparison (expand as needed).
 */
export declare function findContradictions(statements: string[]): ContradictionResult[];
//# sourceMappingURL=contradictionEngine.d.ts.map