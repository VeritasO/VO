export async function runGrowthNow(): Promise<boolean> {
  try {
    const res = await fetch("/api/growth/run", { method: "POST" });
    const data = await res.json().catch(() => ({ ok: false }));
    return !!data?.ok;
  } catch (error) {
    console.error("Failed to run growth cycle:", error);
    return false;
  }
}

export type GrowthState = { 
  mode: string; 
  last_run: string | null; 
  next_runs: string[]; 
  status?: string;
  cycle_count?: number;
};

export async function getGrowthState(): Promise<GrowthState | null> {
  try {
    const res = await fetch("/api/growth/state");
    if (!res.ok) return null;
    return (await res.json()) as GrowthState;
  } catch (error) {
    console.error("Failed to get growth state:", error);
    return null;
  }
}

export async function setGrowthMode(mode: "standard" | "high_growth" | "emergency"): Promise<boolean> {
  try {
    const res = await fetch("/api/growth/mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode })
    });
    const data = await res.json();
    return !!data?.ok;
  } catch (error) {
    console.error("Failed to set growth mode:", error);
    return false;
  }
}

export type GrowthItem = {
  agent: string;
  summary: string;
  region?: string;
  date?: string;
  source?: string;
  book_ref?: string[];
  justice_tier?: string;
  harm_type?: string;
  cultural_context?: string;
  confidence?: number;
};

export type Contradiction = {
  id: string;
  description: string;
  severity: number;
  agents_involved: string[];
  proposed_resolutions: string[];
};

export type DoctrineUpdate = {
  id: string;
  book: string;
  change: string;
  rationale?: string;
  agent_source: string;
};

export type GrowthFeed = {
  version: string;
  cycle_date: string;
  generated_at: string;
  items_count: number;
  items: GrowthItem[];
  contradictions: Contradiction[];
  doctrine_updates: DoctrineUpdate[];
  metadata?: {
    agents_processed: string[];
    total_queries: number;
    thresholds_applied: any;
  };
};

export async function getGrowthFeed(): Promise<GrowthFeed | null> {
  try {
    const res = await fetch("/growth_feed.json");
    if (!res.ok) return null;
    return (await res.json()) as GrowthFeed;
  } catch (error) {
    console.error("Failed to get growth feed:", error);
    return null;
  }
}
