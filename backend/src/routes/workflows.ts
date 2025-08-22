import express from "express";
import path from "path";
import fs from "fs/promises";
import { runWorkflowByFile } from "../workflowRunner";

const router = express.Router();

const WORKFLOWS_DIR = path.resolve(__dirname, "../../server/workflows");

async function findWorkflowFile(base: string) {
  const candidates = [
    path.join(WORKFLOWS_DIR, `${base}.workflow.json`),
    path.join(WORKFLOWS_DIR, `${base}.json`),
    path.join(WORKFLOWS_DIR, `${base}.workflow`),
  ];
  for (const c of candidates) {
    try {
      await fs.access(c);
      return c;
    } catch (e) {
      // ignore
    }
  }

  // fallback: search directory for files that include base in filename
  const list = await fs.readdir(WORKFLOWS_DIR);
  const matched = list.find((f) => f.includes(base));
  if (matched) return path.join(WORKFLOWS_DIR, matched);
  return null;
}

function normalizeWorkflowId(id: string) {
  if (!id) return id;
  if (id.includes(":")) {
    const parts = id.split(":");
    return parts.slice(-2).join("_");
  }
  return id.replace(/[^a-zA-Z0-9_\-]/g, "_");
}

// POST /run -> { workflowId, input }
router.post("/run", async (req, res) => {
  const { workflowId, input } = req.body || {};
  if (!workflowId || typeof workflowId !== "string") {
    return res.status(400).json({ error: "workflowId (string) is required" });
  }

  try {
    const normalized = normalizeWorkflowId(workflowId);
    const file = await findWorkflowFile(normalized);
    if (!file) return res.status(404).json({ error: "workflow not found" });

    const result = await runWorkflowByFile(file, input);

    // Return artifact file names relative to workflows dir
    const rel = result.artifacts.map((p) => path.relative(WORKFLOWS_DIR, p));
    return res.json({ ok: true, artifacts: rel });
  } catch (e: any) {
    console.error("Failed to run workflow", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
});

// GET /list -> list available workflows
router.get("/list", async (_req, res) => {
  try {
    const files = await fs.readdir(WORKFLOWS_DIR);
    const workflows = files.filter((f) => f.endsWith(".workflow.json") || f.endsWith(".json"));
    return res.json({ workflows });
  } catch (e: any) {
    console.error("Failed to list workflows", e);
    return res.status(500).json({ error: e.message || String(e) });
  }
});

export default router;

// POST /tribunal/run -> trigger the veritas-tribunal Apify Actor
import axios from "axios";

router.post("/tribunal/run", async (req, res) => {
  const { caseNarrative, jurisdiction, options, modelName } = req.body || {};
  const token = process.env.APIFY_TOKEN;
  const actorSlug = process.env.APIFY_TRIBUNAL_ACTOR || "veritas-tribunal";
  if (!token) return res.status(400).json({ error: "Missing APIFY_TOKEN" });

  try {
    const url = `https://api.apify.com/v2/acts/${actorSlug}/runs?token=${token}`;
    const input = { caseNarrative, jurisdiction, options, modelName };
    const r = await axios.post(url, input);
    return res.json({ runId: r.data?.data?.id, status: r.data?.data?.status });
  } catch (e: any) {
    console.error("Failed to start tribunal actor", e?.response?.data || e.message || e);
    return res.status(500).json({ error: e?.response?.data || e.message || String(e) });
  }
});
