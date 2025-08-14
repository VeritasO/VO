import { Router } from "express";
const router = Router();

router.post("/import-patterns", async (_req, res) => {
  res.json({ ok: true, imported: 16 });
});

export default router;
