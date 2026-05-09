#!/bin/sh
set -e

# Apply schema to SQLite DB at /app/data/prod.db (mounted volume).
# `db push` is idempotent — safe to run on every boot.
echo "[entrypoint] Applying Prisma schema to $DATABASE_URL ..."
node node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss=false || {
  echo "[entrypoint] prisma db push failed" >&2
  exit 1
}

# Optional one-time seed: set RUN_SEED=1 to populate the DB on first boot.
if [ "${RUN_SEED:-0}" = "1" ]; then
  echo "[entrypoint] RUN_SEED=1 — seeding database..."
  node node_modules/.bin/tsx prisma/seed.ts || echo "[entrypoint] seed exited non-zero (continuing)"
fi

echo "[entrypoint] Starting: $@"
exec "$@"
