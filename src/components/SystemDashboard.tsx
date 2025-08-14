import React from "react";
import { omniMemory } from "../memory/OmniMemory";
import { calculateMetrics } from "../metrics/metrics";

export function SystemDashboard() {
  const metrics = calculateMetrics(omniMemory);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {(metrics.judicialRestorationScore * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Judicial Restoration</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {(metrics.fairnessIndex * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Fairness Index</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {(metrics.griefWeight * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Grief Weight</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">
            {(metrics.contradictionRate * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Contradiction Rate</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-2xl font-bold text-pink-600">
            {(metrics.emotionalSovereigntyIndex * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Emotional Sovereignty</div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Memory Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Logs:</span>
              <span className="font-mono">{omniMemory.logs.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Contradictions:</span>
              <span className="font-mono">{omniMemory.contradictions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Snapshots:</span>
              <span className="font-mono">{omniMemory.snapshots.length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {omniMemory.logs.slice(-10).reverse().map((log, index) => (
              <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
