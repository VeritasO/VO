import { useEffect, useState } from "react";
import { getGrowthState, runGrowthNow, type GrowthState } from "../lib/growth";

export default function GrowthNowButton() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [state, setState] = useState<GrowthState | null>(null);

  async function refresh() {
    const s = await getGrowthState();
    setState(s);
  }

  async function onClick() {
    setBusy(true);
    setStatus(null);
    
    try {
      const ok = await runGrowthNow();
      setStatus(ok ? "Growth cycle completed ✓" : "Growth cycle failed ✗");
      
      // Refresh state after a delay to allow server to update
      setTimeout(refresh, 1000);
    } catch (error) {
      setStatus("Growth cycle failed ✗");
    } finally {
      setBusy(false);
      
      // Clear status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    }
  }

  useEffect(() => { 
    refresh(); 
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <button
          onClick={onClick}
          disabled={busy}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 
                   disabled:opacity-60 rounded-lg shadow text-sm font-medium text-white
                   transition-all duration-200 flex items-center gap-2"
          title="Run the Veritas Growth Engine now"
        >
          {busy ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Running…
            </>
          ) : (
            <>
              🌱 Run Growth Now
            </>
          )}
        </button>
        
        {status && (
          <div className={`absolute top-full mt-2 left-0 px-3 py-1 rounded text-xs whitespace-nowrap
                         ${status.includes('✓') 
                           ? 'bg-green-100 text-green-800 border border-green-200' 
                           : 'bg-red-100 text-red-800 border border-red-200'
                         }`}>
            {status}
          </div>
        )}
      </div>
      
      <div className="text-xs text-slate-400 hidden sm:block">
        <div>
          Mode: <span className="text-slate-300 font-medium">
            {state?.mode || "unknown"}
          </span>
        </div>
        <div>
          Last run: <span className="text-slate-300">
            {state?.last_run 
              ? new Date(state.last_run).toLocaleDateString() + " " + 
                new Date(state.last_run).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : "—"
            }
          </span>
        </div>
      </div>
    </div>
  );
}
