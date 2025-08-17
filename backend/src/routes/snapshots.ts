import express from "express";
import { collectSnapshot } from "../snapshotter";
import db from "../db";
import { snapshots } from "../schema/models/snapshots";

const router = express.Router();

// Create a snapshot (manual trigger)
router.post("/run", async (req, res) => {
  const { kind = "manual", payload = {}, notes } = req.body || {};
  try {
    const row = await collectSnapshot(kind, payload, notes);
    res.json({ success: true, snapshot: row });
  } catch (e) {
    res.status(500).json({ success: false, error: String(e) });
  }
});

// List recent snapshots
router.get("/", async (_req, res) => {
  try {
    const rows = await db.select().from(snapshots).orderBy(snapshots.createdAt.desc()).limit(100);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Get single snapshot
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [row] = await db.select().from(snapshots).where(snapshots.id.eq(id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
