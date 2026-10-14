'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { SESSION_API_URL } = require('./sessionBridgeConfig');

const TOKEN_RE = /^[A-HJ-NP-Z2-9]{10}$/;

async function restoreSessionFromShortToken(token) {
  if (!TOKEN_RE.test(String(token || ''))) {
    throw new Error('SESSION_ID must be exactly 10 characters from A-H..Z and 2-9.');
  }
  if (!SESSION_API_URL || SESSION_API_URL.includes('REPLACE-WITH-RENDER-HOST')) {
    throw new Error('Set SESSION_API_URL in lib/sessionBridgeConfig.js to the deployed persistent API URL.');
  }

  const root = path.resolve('./session');
  const markerPath = path.join(root, '.dilshan-session-token');
  const credsPath = path.join(root, 'creds.json');
  if (fs.existsSync(credsPath) && fs.existsSync(markerPath)) {
    try {
      if (fs.readFileSync(markerPath, 'utf8').trim() === token) {
        const existing = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
        if (existing?.registered === true) {
          console.log('[session] Reusing auth files already restored for this 10-character token.');
          return;
        }
      }
    } catch { /* download a fresh copy below */ }
  }

  fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  let response;
  try {
    const base = SESSION_API_URL.replace(/\/+$/, '');
    response = await fetch(`${base}/api/session/${encodeURIComponent(token)}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Cache-Control': 'no-store' },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Session API returned HTTP ${response.status}.`);
  }
  if (payload.ok !== true || payload.token !== token || !Array.isArray(payload.files) || payload.files.length === 0) {
    throw new Error('Session API response is invalid or has no auth files.');
  }

  let wroteCreds = false;
  for (const item of payload.files) {
    if (!item || typeof item.path !== 'string' || typeof item.data !== 'string') {
      throw new Error('Session API returned a malformed auth file.');
    }
    const relative = item.path.replace(/\\/g, '/');
    if (!relative.endsWith('.json') || relative.startsWith('/') || relative.split('/').some((part) => !part || part === '.' || part === '..')) {
      throw new Error('Session API returned an unsafe auth file path.');
    }
    const destination = path.resolve(root, relative);
    if (!destination.startsWith(root + path.sep)) {
      throw new Error('Session API returned a path outside the session folder.');
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, Buffer.from(item.data, 'base64'), { mode: 0o600 });
    if (relative === 'creds.json') wroteCreds = true;
  }

  if (!wroteCreds || !fs.existsSync(credsPath)) throw new Error('Downloaded session is missing creds.json.');
  const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  if (creds?.registered !== true) throw new Error('Downloaded WhatsApp credentials are not registered.');
  fs.writeFileSync(markerPath, token, { mode: 0o600 });
  console.log(`[session] Restored ${payload.files.length} complete auth files from 10-character token.`);
}

module.exports = { restoreSessionFromShortToken, TOKEN_RE };
