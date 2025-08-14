"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AgentDashboard_1 = require("./AgentDashboard");
const BookLibrary_1 = require("./BookLibrary");
const SystemDashboard_1 = require("./SystemDashboard");
function App() {
    const [activeTab, setActiveTab] = (0, react_1.useState)("system");
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)("header", { className: "bg-white shadow-sm border-b border-gray-200", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center py-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900", children: "VeritasO" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "Judicial AI Agent System" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab("system"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "system"
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"}`, children: "\uD83D\uDCCA System" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab("agents"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "agents"
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"}`, children: "\uD83E\uDD16 Agents" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab("books"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "books"
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"}`, children: "\uD83D\uDCDA Doctrine" })] })] }) }) }), (0, jsx_runtime_1.jsxs)("main", { className: "max-w-7xl mx-auto", children: [activeTab === "system" && (0, jsx_runtime_1.jsx)(SystemDashboard_1.SystemDashboard, {}), activeTab === "agents" && (0, jsx_runtime_1.jsx)(AgentDashboard_1.AgentDashboard, {}), activeTab === "books" && (0, jsx_runtime_1.jsx)(BookLibrary_1.BookLibrary, {})] }), (0, jsx_runtime_1.jsx)("footer", { className: "mt-12 border-t border-gray-200 bg-white", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: (0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm text-gray-500", children: "\"Truth through reflection, justice through restoration, wisdom through contradiction.\"" }) }) })] }));
}
//# sourceMappingURL=App.js.map