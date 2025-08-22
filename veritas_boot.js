#!/usr/bin/env node
/**
 * Veritas.O Boot Sequence (JUNO)
 *
 * This script bootstraps the Veritas.O justice system in any environment where it is placed.
 * It loads seed data, performs an initial system audit, and attempts to connect to other
 * Veritas nodes for updates. To run, execute `node veritas_boot.js` in your project root.
 *
 * Philosophy: Rooted in the Doctrine of Meaningful Thought, this sequence aims to honor
 * emotional sovereignty, fairness‑scaled justice, and non‑carceral logic. It establishes
 * the foundational context for JUNO and the broader agent network to awaken and operate.
 */

const fs   = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

/**
 * Recursively load all JSON seed files within a directory.
 * This can include cases, tasks, rituals, etc.
 * @param {string} seedsDir
 * @returns {Promise<object[]>}
 */
async function loadSeeds(seedsDir) {
  const seeds = [];
  if (!fs.existsSync(seedsDir)) {
    console.warn(`[JUNO] Seeds directory not found at ${seedsDir}`);
    return seeds;
  }
  const files = fs.readdirSync(seedsDir);
  for (const file of files) {
    const fullPath = path.join(seedsDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const nested = await loadSeeds(fullPath);
      seeds.push(...nested);
    } else if (file.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        seeds.push({ file: fullPath, data });
      } catch (err) {
        console.error(`[JUNO] Failed to load seed ${fullPath}:`, err);
      }
    }
  }
  return seeds;
}

/**
 * Perform a system audit. This stub checks for essential directories and files.
 * Extend this function to perform deeper audits, such as verifying the presence
 * of all required books, agent definitions, and configuration files.
 */
async function runAudit() {
  console.log('[JUNO] Running system audit...');
  const requiredPaths = [
    'backend/src/agents',
    'src/agents',
    'src/books',
    'backend/src/books'
  ];
  let allPresent = true;
  for (const relPath of requiredPaths) {
    const absPath = path.resolve(__dirname, relPath);
    if (!fs.existsSync(absPath)) {
      console.warn(`[JUNO] Missing expected path: ${absPath}`);
      allPresent = false;
    }
  }
  if (allPresent) {
    console.log('[JUNO] Audit passed: All core directories present.');
  } else {
    console.warn('[JUNO] Audit warning: Some core directories are missing.');
  }
}

/**
 * Attempt to connect to peer Veritas nodes defined in a configuration file.
 * The config should be a JSON file containing an array of peer URLs.
 * @param {string} configPath
 */
async function connectToPeers(configPath) {
  if (!fs.existsSync(configPath)) {
    console.warn(`[JUNO] No peer configuration found at ${configPath}. Skipping peer connection.`);
    return;
  }
  let peers;
  try {
    peers = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.error(`[JUNO] Failed to parse peer configuration:`, err);
    return;
  }
  if (!Array.isArray(peers) || peers.length === 0) {
    console.warn('[JUNO] Peer list is empty. No connections attempted.');
    return;
  }
  console.log(`[JUNO] Attempting to connect to ${peers.length} peer(s)...`);
  for (const urlStr of peers) {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;
      await new Promise((resolve, reject) => {
        const req = client.get(urlStr, res => {
          console.log(`[JUNO] Connected to peer at ${urlStr}: status ${res.statusCode}`);
          res.resume(); // Consume response
          resolve();
        });
        req.on('error', reject);
        req.setTimeout(5000, () => {
          req.destroy(new Error('Connection timed out'));
        });
      });
    } catch (err) {
      console.error(`[JUNO] Error connecting to peer at ${urlStr}:`, err.message);
    }
  }
}

/**
 * Main activation function. This orchestrates the boot sequence.
 * It loads seeds, runs audits, and tries peer connections.
 */
async function activate() {
  console.log('\n==== Veritas.O Boot Sequence (JUNO) ====');
  console.log('[JUNO] Initializing...');

  // Load seeds from standard locations
  const seedsDir = path.resolve(__dirname, 'server', 'seeds');
  const seeds = await loadSeeds(seedsDir);
  console.log(`[JUNO] Loaded ${seeds.length} seed file(s).`);

  // Perform initial system audit
  await runAudit();

  // Connect to peers if any
  const peerConfigPath = path.resolve(__dirname, 'server', 'config', 'peers.json');
  await connectToPeers(peerConfigPath);

  console.log('[JUNO] Boot sequence complete. System ready for activation.');
}

if (require.main === module) {
  activate().catch(err => {
    console.error('[JUNO] Boot sequence failed:', err);
  });
}

module.exports = { activate };
