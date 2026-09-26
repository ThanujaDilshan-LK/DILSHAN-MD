# THANUVA-MD — Dockerfile
# One image, reused for every customer container (their data/session
# lives in a mounted volume, not baked into the image).

FROM node:18-slim

# ffmpeg is needed for stickers/voice notes/video processing
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg git ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first (better layer caching — only re-installs
# when package.json actually changes, not on every code edit)
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

# Now copy the rest of the bot's code
COPY . .

# Session/data are meant to be mounted as volumes (see docker-compose.yml)
# so they survive container restarts and rebuilds.
VOLUME ["/app/session", "/app/data"]

# No HTTP port needed — this is a WhatsApp Web socket client, not a web server.
CMD ["node", "index.js"]
