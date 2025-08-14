"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctrine = exports.BOOKS = void 0;
exports.BOOKS = [
    {
        id: 1,
        title: "The Book of Meaningful Thought",
        description: "Core doctrine and neuroethical basis.",
        chapters: ["Introduction", "Principles", "Applications"],
        status: "active"
    },
    {
        id: 2,
        title: "The Book of Gentle De-escalation",
        description: "Protocols for peaceful conflict reduction.",
        chapters: ["De-escalation Logic", "Case Studies"],
        status: "active"
    },
    {
        id: 3,
        title: "The Book of Emotional Sovereignty",
        description: "Protection and validation of emotional experiences.",
        chapters: ["Emotional Rights", "Sovereignty Principles", "Conflict Resolution"],
        status: "active"
    },
    {
        id: 4,
        title: "The Book of Judicial Restoration",
        description: "Restorative justice principles and healing-centered approaches.",
        chapters: ["Restoration Theory", "Healing Practices", "Community Integration"],
        status: "active"
    },
    {
        id: 5,
        title: "The Book of Temporal Wisdom",
        description: "Time-aware decision making and precedent analysis.",
        chapters: ["Temporal Logic", "Historical Context", "Future Impact"],
        status: "active"
    }
];
exports.doctrine = {
    books: exports.BOOKS,
    codifications: [],
    version: "5.4.1",
    reflect(contradiction) {
        const codification = `[${new Date().toISOString()}] Resolved: ${contradiction.summary}`;
        this.codifications.push(codification);
        this.version = bumpVersion(this.version);
    }
};
function bumpVersion(version) {
    const parts = version.split(".");
    parts[2] = String(Number(parts[2]) + 1);
    return parts.join(".");
}
//# sourceMappingURL=library.js.map