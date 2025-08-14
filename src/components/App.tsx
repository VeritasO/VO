import React, { useState } from "react";
import { AgentDashboard } from "./AgentDashboard";
import { BookLibrary } from "./BookLibrary";
import { SystemDashboard } from "./SystemDashboard";

type TabType = "agents" | "books" | "system";

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>("system");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VeritasO</h1>
              <p className="text-sm text-gray-600">Judicial AI Agent System</p>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("system")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "system"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                📊 System
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "agents"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                🤖 Agents
              </button>
              <button
                onClick={() => setActiveTab("books")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "books"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                📚 Doctrine
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {activeTab === "system" && <SystemDashboard />}
        {activeTab === "agents" && <AgentDashboard />}
        {activeTab === "books" && <BookLibrary />}
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            "Truth through reflection, justice through restoration, wisdom through contradiction."
          </p>
        </div>
      </footer>
    </div>
  );
}
