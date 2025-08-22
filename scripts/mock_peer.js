#!/usr/bin/env node
const http = require('http');
const port = process.argv[2] || process.env.PORT || 9001;
const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', node: `mock-peer:${port}` }));
    return;
  }
  res.writeHead(404);
  res.end('not found');
});
server.listen(port, () => console.log(`mock peer listening on http://localhost:${port}/api/health`));
