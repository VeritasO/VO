import fs from "fs";
import path from "path";
import cron from "node-cron";
import dayjs from "dayjs";
import { spawn } from "child_process";

const SPEC_PATH = path.resolve(__dirname, "../config/growth_engine.json");
const STATE_PATH = path.resolve(__dirname, "../config/growth_state.json");

let tasks: any[] = [];

function readSpec() { 
  return JSON.parse(fs.readFileSync(SPEC_PATH, "utf8")); 
}

function readState() { 
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); 
}

function writeState(data: any) { 
  fs.writeFileSync(STATE_PATH, JSON.stringify(data, null, 2)); 
}

function runJobOnce(): Promise<number> {
  return new Promise((resolve) => {
    const job = path.resolve(__dirname, "./runGrowthEngine.ts");
    console.log(`[Growth Scheduler] Starting job: ${job}`);
    const child = spawn("node", [job], { stdio: "inherit" });
    child.on("close", (code) => {
      console.log(`[Growth Scheduler] Job completed with code: ${code}`);
      resolve(code ?? 1);
    });
  });
}

export function clearSchedule() {
  tasks.forEach((t) => {
    console.log("[Growth Scheduler] Stopping scheduled task");
    t.stop();
  });
  tasks = [];
}

export function scheduleFromMode(mode?: string) {
  const spec = readSpec();
  const state = readState();
  const m = mode || state.mode || "standard";
  
  console.log(`[Growth Scheduler] Setting up schedule for mode: ${m}`);
  clearSchedule();

  const schedules: string[] = [];
  if (m === "standard") schedules.push(spec.schedule.standard);
  if (m === "high_growth") schedules.push(spec.schedule.standard, spec.schedule.high_growth);
  // emergency = manual only

  schedules.forEach((cronExpr, idx) => {
    if (cronExpr && cronExpr !== "manual") {
      console.log(`[Growth Scheduler] Creating cron task ${idx + 1}: ${cronExpr}`);
      const task = cron.schedule(cronExpr, async () => {
        console.log(`[Growth Scheduler] Cron triggered: ${cronExpr}`);
        await runJobOnce();
        // Update state after successful run
        const currentState = readState();
        writeState({
          ...currentState,
          last_run: new Date().toISOString(),
          cycle_count: (currentState.cycle_count || 0) + 1
        });
      }, undefined);
      
      task.start();
      tasks.push(task);
    }
  });

  // Update next_runs in state
  const nextRuns = schedules.filter(s => s !== "manual").map(s => `cron:${s}`);
  writeState({
    ...state,
    mode: m,
    next_runs: nextRuns,
    status: m === "emergency" ? "manual_only" : "scheduled"
  });

  console.log(`[Growth Scheduler] Schedule active. Next runs: ${nextRuns.join(", ")}`);
}

export async function setMode(mode: "standard" | "high_growth" | "emergency"): Promise<void> {
  console.log(`[Growth Scheduler] Switching to mode: ${mode}`);
  scheduleFromMode(mode);
}

export async function runNow(): Promise<boolean> {
  console.log("[Growth Scheduler] Manual run triggered");
  try {
    const code = await runJobOnce();
    if (code === 0) {
      const state = readState();
      writeState({
        ...state,
        last_run: new Date().toISOString(),
        cycle_count: (state.cycle_count || 0) + 1
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("[Growth Scheduler] Manual run failed:", error);
    return false;
  }
}

// Initialize on module load
try {
  scheduleFromMode();
} catch (error) {
  console.error("[Growth Scheduler] Failed to initialize:", error);
}
