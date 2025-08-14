import React from "react";
import { AGENTS } from "../agents/registry";

export function AgentDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {Object.values(AGENTS).map((agent) => (
        <div key={agent.id} className="rounded-xl shadow p-4 bg-white border border-gray-200">
          <div className="text-2xl mb-2">
            {agent.glyphs.join(" ")} <strong>{agent.name}</strong>
          </div>
          <div className="text-sm text-gray-600 mb-2">{agent.domain}</div>
          <div className="text-sm mb-3">{agent.description}</div>
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded text-xs ${
              agent.webAccess === "full" ? "bg-green-100 text-green-800" :
              agent.webAccess === "relay" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {agent.webAccess} access
            </span>
            <span className="text-xs text-gray-500">
              {agent.protocols.length} protocols
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
