import { Router } from "express";
const router = Router();

router.get("/system-dials", (_req, res) => {
  res.json({
    headwinds: [{ label: "RJ school policy controversy", value: 65 }],
    evidence: [
      { label: "RCT youth felonies", value: 80 },
      { label: "CoSA reintegration evidence", value: 75 }
    ]
  });
});

export default router;
