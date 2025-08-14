"use strict";
/**
 * contradictionEngine.ts
 * Veritas.O Core Contradiction Engine
 *
 * Provides functions to detect and explain contradictions between values, objects, or doctrinal statements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectContradiction = detectContradiction;
exports.findFirstContradiction = findFirstContradiction;
exports.findContradictions = findContradictions;
/**
 * Checks if two primitive values, objects, or arrays contradict each other.
 * - For primitives: direct comparison
 * - For objects/arrays: shallow deep comparison (expand as needed)
 */
function detectContradiction(a, b, options) {
    if (typeof a !== typeof b) {
        return {
            isContradiction: true,
            reason: `Type mismatch: ${typeof a} vs ${typeof b}`
        };
    }
    if (typeof a !== 'object' || a === null || b === null) {
        // Primitive
        return {
            isContradiction: a !== b,
            reason: a !== b ? `Values differ: ${a} vs ${b}` : undefined
        };
    }
    // Both objects/arrays, do shallow or deep comparison
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return {
                isContradiction: true,
                reason: `Array lengths differ: ${a.length} vs ${b.length}`
            };
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return {
                    isContradiction: true,
                    reason: `Array elements at [${i}] differ: ${a[i]} vs ${b[i]}`,
                    path: `[${i}]`
                };
        }
        return { isContradiction: false };
    }
    // Objects
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length)
        return {
            isContradiction: true,
            reason: `Object key count differs: ${aKeys.length} vs ${bKeys.length}`
        };
    for (const key of aKeys) {
        if (!bKeys.includes(key))
            return {
                isContradiction: true,
                reason: `Missing key in second object: ${key}`,
                path: key
            };
        if (a[key] !== b[key])
            return {
                isContradiction: true,
                reason: `Values at key \"${key}\" differ: ${a[key]} vs ${b[key]}`,
                path: key
            };
    }
    return { isContradiction: false };
}
/**
 * Example utility: checks for contradiction in an array of statements
 */
function findFirstContradiction(items) {
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            const res = detectContradiction(items[i], items[j]);
            if (res.isContradiction) {
                return { ...res, indexA: i, indexB: j };
            }
        }
    }
    return { isContradiction: false };
}
/**
 * Checks if two statements contradict each other.
 * - For simple strings: direct logical negation (e.g., 'A' vs '!A').
 * - For objects/arrays: shallow comparison (expand as needed).
 */
function findContradictions(statements) {
    const contradictions = [];
    for (let i = 0; i < statements.length; i++) {
        for (let j = i + 1; j < statements.length; j++) {
            if (statements[i] === `!${statements[j]}` || statements[j] === `!${statements[i]}`) {
                contradictions.push({
                    isContradiction: true,
                    reason: `Contradiction between '${statements[i]}' and '${statements[j]}'`,
                });
            }
        }
    }
    return contradictions;
}
//# sourceMappingURL=contradictionEngine.js.map