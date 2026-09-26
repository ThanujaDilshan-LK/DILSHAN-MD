# 🤖 DILSHAN-MD

<p align="center"><b>Multidevice WhatsApp Bot — Speed • Power • Control</b></p>

A fast, lightweight WhatsApp bot built on the **Baileys** multi-device API. DILSHAN-MD helps group admins manage large WhatsApp groups — tagging, moderation, anti-link/anti-badword protection, fun commands, an AI chatbot mode, and more — all from a clean, self-hosted codebase.

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Ribeye&size=40&pause=1000&color=33FF00&center=true&width=910&height=80&lines=DILSHAN-MD;Multi+Device+WhatsApp+Bot;Coded+by+ThanujaDilshan-LK" alt="Typing SVG" />
  </a>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/ThanujaDilshan-LK/QUEENHANSI-l-Md-web/c8f9914d90feeba7118e056d45df8ae528719785/assets/file_00000000c9fc8211b757193ae356dd0b.png" alt="DILSHAN-MD" height="280">
</div>

<div align="center">

![Followers](https://img.shields.io/github/followers/ThanujaDilshan-LK?style=for-the-badge&label=Followers)
![Stars](https://img.shields.io/github/stars/ThanujaDilshan-LK/DILSHAN-MD?style=for-the-badge&label=Stars)
![Forks](https://img.shields.io/github/forks/ThanujaDilshan-LK/DILSHAN-MD?style=for-the-badge&label=Forks)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=for-the-badge&logo=node.js)

</div>

<div align="center">

![Commands](https://img.shields.io/badge/Commands-223%2B-blueviolet?style=flat-square)
![Uptime](https://img.shields.io/badge/Uptime-24%2F7-success?style=flat-square)
![Baileys](https://img.shields.io/badge/Engine-Baileys%20v7-informational?style=flat-square)

</div>

<p align="center">
  <a href="#-quick-deploy">Quick Deploy</a> •
  <a href="#-step-by-step-setup">Setup</a> •
  <a href="#-key-features">Features</a> •
  <a href="#%EF%B8%8F-local-development">Local Dev</a> •
  <a href="#-community">Community</a>
</p>

---

## 🚀 Quick Deploy

Pick whichever platform you're using — all three run this repo out of the box (`npm install && npm start`).

<div align="center">

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?template=https://github.com/ThanujaDilshan-LK/DILSHAN-MD)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ThanujaDilshan-LK/DILSHAN-MD)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ThanujaDilshan-LK/DILSHAN-MD)

</div>

> ⚠️ Heroku no longer has a free tier — you'll need an Eco/Basic dyno. On Heroku, scale the **worker** dyno (`heroku ps:scale worker=1`), not `web`, since this bot doesn't listen on an HTTP port.
> Railway/Render are recommended if you want persistent disk for the `session/` folder across restarts.

---

## 🔗 Step-by-step Setup

### 1. Fork this repository

<div align="center">
  <a href="https://github.com/ThanujaDilshan-LK/DILSHAN-MD/fork">
    <img src="https://img.shields.io/badge/Fork-Repository-blue?style=for-the-badge&logo=github" alt="Fork the repository"/>
  </a>
</div>

### 2. Get your Session ID / Pair Code

Use the pairing site to link your WhatsApp number and generate a `creds.json` / Session ID:

<div align="center">
  <a href="https://YOUR-PAIR-SITE-URL.example" target="_blank">
    <img src="https://img.shields.io/badge/GET%20PAIR%20CODE-Easy%20Method-ff4d4d?style=for-the-badge" alt="Generate Pair Code"/>
  </a>
</div>

*(Replace the link above with your deployed [DILSHAN-MD-Pair](https://github.com/ThanujaDilshan-LK/DILSHAN-MD-Pair) site URL once it's live.)*

Two ways to use what you get:
- **`creds.json` file** → drop it into the bot's `session/` folder.
- **`SESSION_ID` string** (`DILSHAN-MD~...`) → set it as an environment variable on your host — no manual file upload needed, and it survives redeploys even on platforms with ephemeral disks.

### 3. Set environment variables

| Variable | Required | Description |
|---|---|---|
| `SESSION_ID` | Recommended | Portable session string from the pair site. If set, the bot restores `session/creds.json` from this on every boot. |
| `PORT` | No | Only needed if you add a keep-alive HTTP server; not required for the bot itself. |

### 4. Deploy & connect

Use one of the Quick Deploy buttons above, or run locally:

```bash
git clone https://github.com/ThanujaDilshan-LK/DILSHAN-MD.git
cd DILSHAN-MD
npm install
npm start
```

Once running, the console prints a pairing code (or QR, depending on config) — link it from **WhatsApp → Settings → Linked Devices**.

---

## ⚡ Key Features

<table>
<tr>
<td valign="top" width="50%">

**🛡️ Group Management**
- `.tagall` — tag every member in the group
- `.ban` / `.clear` — moderation tools for admins
- `.antilink` / `.antibadword` — auto-moderation
- `.antitag`, `.anticall`, `.antidelete` — extra protection
- `.sudo` — grant owner-level access to trusted numbers

**🎙️ Voice & Media**
- `.voice <text>` — text-to-speech voice notes (English & Sinhala)
- `.sticker`, `.attp` — sticker & animated-text creation
- `.play`, `.song`, `.video` — music & movie downloads
- Files over WhatsApp's 2GB cap auto-deliver as a cloud link instead

</td>
<td valign="top" width="50%">

**🧩 Custom & Config**
- `.addcmd` — build your own commands, no coding needed
- `.setup` / `.cfgset` / `.apply` — live bot configuration
- `.channelpost` — post updates straight to your channel
- `.changelog` — see what's new after every update

**⏳ Managed Hosting**
- `SESSION_ID` env-var support — sessions survive redeploys
- Automatic plan expiry with a renewal reminder beforehand
- Docker-ready — isolate every customer's bot in its own container
- 223 commands total across group tools, downloaders, AI, and fun

</td>
</tr>
</table>

---

## 🛠️ Local Development

### Prerequisites
- Node.js ≥ 18
- Git

### Setup

```bash
git clone https://github.com/ThanujaDilshan-LK/DILSHAN-MD.git
cd DILSHAN-MD
npm install
npm start
```

Scan the QR code (or enter the pair code) shown in the terminal to link your WhatsApp account.

---

## 🌐 Related Projects

- **[DILSHAN-MD-Pair](https://github.com/ThanujaDilshan-LK/DILSHAN-MD-Pair)** — the standalone pair-code/QR web app used in Step 2 above.

---

## 📢 Community

<div align="center">
  <a href="https://whatsapp.com/channel/0029Vb8jflCCBtxFCDITOm1J">
    <img src="https://img.shields.io/badge/Join%20WhatsApp%20Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Join WhatsApp"/>
  </a>
</div>

---

## 📄 License & Credits

Licensed under the [MIT License](https://opensource.org/licenses/MIT). This project started as a rebrand and customization of the open-source **Knight-Bot-MD** codebase; the underlying Baileys integration and original command structure are credited to their original authors below, as required by the MIT license:

- [Baileys](https://github.com/WhiskeySockets/Baileys) — WhatsApp Web API library
- Original base project: Knight-Bot-MD by Professor / MR UNIQUE HACKER

Copyright (c) 2026 ThanujaDilshan-LK. See individual files for any remaining third-party notices.

---

## ⚠️ Important Warning

This bot is **not an official WhatsApp product**. It uses WhatsApp's unofficial multi-device Web API (via Baileys), which is against WhatsApp's Terms of Service to automate. Using it carries a real risk of your number being banned or rate-limited. Use at your own risk — don't use it for spam, bulk messaging, or anything illegal. The maintainers of this repo are not liable for any misuse or account action taken against you.

---

## 🙌 Contributions

Issues and pull requests are welcome — check the [issues page](https://github.com/ThanujaDilshan-LK/DILSHAN-MD/issues).

If you find this useful, consider giving it a ⭐️ on GitHub!
