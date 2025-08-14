import { useEffect, useState } from "react";
import { getGrowthState, getGrowthFeed, setGrowthMode, type GrowthState, type GrowthFeed } from "../lib/growth";

export default function GrowthAdmin() {
  const [state, setState] = useState<GrowthState | null>(null);
  const [feed, setFeed] = useState<GrowthFeed | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchData() {
    const [stateData, feedData] = await Promise.all([
      getGrowthState(),
      getGrowthFeed()
    ]);
    setState(stateData);
    setFeed(feedData);
  }

  async function handleModeChange(mode: "standard" | "high_growth" | "emergency") {
    setLoading(true);
    setMessage(null);
    
    try {
      const success = await setGrowthMode(mode);
      setMessage(success ? `Mode set to ${mode}` : "Failed to change mode");
      if (success) {
        await fetchData();
      }
    } catch (error) {
      setMessage("Failed to change mode");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  useEffect(() => { 
    fetchData(); 
  }, []);

  const modeDescriptions = {
    standard: "Weekly growth cycles every Monday",
    high_growth: "Bi-weekly cycles (Monday + Thursday)",
    emergency: "Manual runs only - no scheduled cycles"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-emerald-300">Growth Engine Admin</h1>
        <p className="text-slate-400 mt-1">Manage the Veritas Growth Engine scheduling and modes</p>
      </div>

      {/* Status Overview */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-sm text-slate-400">Mode</div>
            <div className="text-xl font-semibold text-emerald-300">
              {state?.mode || "—"}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-sm text-slate-400">Status</div>
            <div className="text-xl font-semibold">
              {state?.status || "—"}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-sm text-slate-400">Cycles Run</div>
            <div className="text-xl font-semibold text-sky-400">
              {state?.cycle_count || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Mode Control</h2>
        <div className="space-y-4">
          {Object.entries(modeDescriptions).map(([mode, description]) => (
            <div key={mode} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
              <div className="flex-1">
                <div className="font-medium capitalize">{mode.replace('_', ' ')}</div>
                <div className="text-sm text-slate-400">{description}</div>
              </div>
              <button
                onClick={() => handleModeChange(mode as any)}
                disabled={loading || state?.mode === mode}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${state?.mode === mode 
                    ? 'bg-emerald-600 text-white cursor-not-allowed' 
                    : 'bg-slate-700 hover:bg-emerald-600 text-slate-300 hover:text-white'
                  } disabled:opacity-60`}
              >
                {state?.mode === mode ? "Active" : "Select"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Info */}
      {state?.next_runs && state.next_runs.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Scheduled Runs</h2>
          <div className="space-y-2">
            {state.next_runs.map((run, idx) => (
              <div key={idx} className="text-sm font-mono bg-slate-900 px-3 py-2 rounded">
                {run}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Cycle Summary */}
      {feed && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Last Cycle Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{feed.items_count}</div>
              <div className="text-sm text-slate-400">Items Collected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{feed.contradictions.length}</div>
              <div className="text-sm text-slate-400">Contradictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-400">{feed.doctrine_updates.length}</div>
              <div className="text-sm text-slate-400">Doctrine Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{feed.metadata?.agents_processed?.length || 0}</div>
              <div className="text-sm text-slate-400">Agents Processed</div>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            Generated: {feed.generated_at ? new Date(feed.generated_at).toLocaleString() : "—"}
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-xl border ${
          message.includes('Failed') || message.includes('failed')
            ? 'bg-red-900/50 border-red-700 text-red-300'
            : 'bg-green-900/50 border-green-700 text-green-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
