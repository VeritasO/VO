"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omniMemory = void 0;
exports.omniMemory = {
    logs: [],
    contradictions: [],
    snapshots: [],
    write(entry) {
        this.logs.push(`[${new Date().toISOString()}] ${entry}`);
    },
    logContradiction(contradiction) {
        this.contradictions.push(contradiction);
        this.write(`Contradiction logged: ${contradiction.summary}`);
    }
};
//# sourceMappingURL=OmniMemory.js.map