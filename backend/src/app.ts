import express from "express";
import cors from "cors";
import path from "path";
import growth from "./routes/growth";
import biasProfilesRouter from "./routes/biasProfiles";
import thaleaRouter from "./routes/thalea";
import metricsRouter from "./routes/metrics";
import { startCvtCron } from "./cvtCron";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// Routes
app.use("/api/growth", growth);
app.use("/api/bias-profiles", biasProfilesRouter);
app.use("/api/thalea", thaleaRouter);
app.use("/api/metrics", metricsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    service: "Veritas.O Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Veritas.O Backend listening on port ${PORT}`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}/dashboard.html`);
  console.log(`🔧 Growth API available at: http://localhost:${PORT}/api/growth`);
});

// Start CVT cron for weekly IEEE-7003 checkpoints
try { startCvtCron(); } catch (e) { console.error('Failed to start CVT cron', e); }

export default app;
