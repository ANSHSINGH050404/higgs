# Higgs

**AI text-to-video SaaS** — generate videos from prompts with a modern web app and queue-backed workers.

## What it does

Higgs lets users turn text (and optional reference images) into generated videos. The stack is a Turborepo monorepo:

| Piece | Role |
|-------|------|
| `apps/web` | Next.js UI — generate, play back, profile, admin |
| `apps/backend` | Express + TypeScript REST API, JWT auth, job orchestration |
| Redis / Bull | Async video generation queue |
| PostgreSQL | Users, videos, metadata |
| MinIO | S3-compatible storage for media |
| OpenRouter | Video model inference |

## Architecture (high level)

1. User submits a generation request from the web UI  
2. Backend authenticates (JWT) and enqueues a job  
3. Worker processes the job via OpenRouter (and optional face-fusion services)  
4. Output is stored in MinIO; status updates surface in the UI  

See [`agent.md`](./agent.md) for the full workflow notes.

## Monorepo layout

```
higgs/
├── apps/
│   ├── web/          # Next.js frontend
│   └── backend/      # Express API
├── packages/         # shared ESLint + TS configs
├── docker-compose.yml
├── turbo.json
└── agent.md
```

## Getting started

```bash
git clone https://github.com/ANSHSINGH050404/higgs.git
cd higgs
bun install          # or npm / pnpm
cp .env.example .env # fill keys (OpenRouter, DB, Redis, MinIO)
docker compose up -d # Postgres, Redis, MinIO, etc.
bun run dev          # turbo dev for apps
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Develop all apps |
| `bun run build` | Build monorepo |
| `bun run lint` | Lint |
| `bun run check-types` | Typecheck |

## Author

[ANSHSINGH050404](https://github.com/ANSHSINGH050404)