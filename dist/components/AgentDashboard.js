"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentDashboard = AgentDashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const registry_1 = require("../agents/registry");
function AgentDashboard() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-4 gap-4 p-4", children: Object.values(registry_1.AGENTS).map((agent) => ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl shadow p-4 bg-white border border-gray-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl mb-2", children: [agent.glyphs.join(" "), " ", (0, jsx_runtime_1.jsx)("strong", { children: agent.name })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600 mb-2", children: agent.domain }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm mb-3", children: agent.description }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("span", { className: `px-2 py-1 rounded text-xs ${agent.webAccess === "full" ? "bg-green-100 text-green-800" :
                                agent.webAccess === "relay" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-red-100 text-red-800"}`, children: [agent.webAccess, " access"] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500", children: [agent.protocols.length, " protocols"] })] })] }, agent.id))) }));
}
//# sourceMappingURL=AgentDashboard.js.map