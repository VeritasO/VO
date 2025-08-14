import { Router } from "express";
import { scheduleFromMode, setMode, runNow } from "../jobs/scheduler";
import path from "path";
import fs from "fs";

const router = Router();
const STATE_PATH = path.resolve(__dirname, "../config/growth_state.json");
const SPEC_PATH = path.resolve(__dirname, "../config/growth_engine.json");

router.get("/state", (_req, res) => {
  try {
    const state = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
    res.json(state);
  } catch (error) {
    console.error("Failed to read growth state:", error);
    res.status(500).json({ ok: false, error: "Failed to read state" });
  }
});

router.get("/config", (_req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8"));
    res.json(config);
  } catch (error) {
    console.error("Failed to read growth config:", error);
    res.status(500).json({ ok: false, error: "Failed to read config" });
  }
});

router.post("/mode", async (req, res) => {
  try {
    const mode = (req.body?.mode || "standard").toLowerCase();
    if (!["standard", "high_growth", "emergency"].includes(mode)) {
      return res.status(400).json({ ok: false, error: "invalid mode" });
    }
    await setMode(mode as any);
    res.json({ ok: true, mode });
  } catch (error) {
    console.error("Failed to set mode:", error);
    res.status(500).json({ ok: false, error: "Failed to set mode" });
  }
});

router.post("/run", async (_req, res) => {
  try {
    const ok = await runNow();
    res.json({ ok });
  } catch (error) {
    console.error("Failed to run growth cycle:", error);
    res.status(500).json({ ok: false, error: "Failed to run cycle" });
  }
});

router.get("/logs", (_req, res) => {
  try {
    const logsDir = path.resolve(__dirname, "../data/growth_logs");
    if (!fs.existsSync(logsDir)) {
      return res.json({ logs: [] });
    }
    
    const files = fs.readdirSync(logsDir)
      .filter(f => f.endsWith(".json"))
      .map(f => ({
        filename: f,
        path: path.join(logsDir, f),
        modified: fs.statSync(path.join(logsDir, f)).mtime
      }))
      .sort((a, b) => b.modified.getTime() - a.modified.getTime());
    
    res.json({ logs: files.slice(0, 10) }); // Return latest 10
  } catch (error) {
    console.error("Failed to list logs:", error);
    res.status(500).json({ ok: false, error: "Failed to list logs" });
  }
});

router.get("/logs/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const logPath = path.resolve(__dirname, "../data/growth_logs", filename);
    
    if (!fs.existsSync(logPath) || !filename.endsWith(".json")) {
      return res.status(404).json({ ok: false, error: "Log file not found" });
    }
    
    const logData = JSON.parse(fs.readFileSync(logPath, "utf8"));
    res.json(logData);
  } catch (error) {
    console.error("Failed to read log file:", error);
    res.status(500).json({ ok: false, error: "Failed to read log file" });
  }
});

// Initialize scheduler on module load
try {
  scheduleFromMode();
} catch (error) {
  console.error("Failed to initialize growth scheduler:", error);
}

export default router;
