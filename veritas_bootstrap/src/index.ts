import express from 'express';

const app = express();
const port = 9000;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Audit status endpoint
app.get('/api/audit/status', (req, res) => {
  res.json({ 
    status: 'active',
    mode: 'standard',
    lastCheck: new Date().toISOString()
  });
});

// Contradiction check status
app.get('/api/contradiction/status', (req, res) => {
  res.json({
    status: 'ready',
    checksEnabled: true,
    lastUpdate: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Veritas.O Bootstrap Service running on port ${port}`);
});
