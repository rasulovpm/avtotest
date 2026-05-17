#!/usr/bin/env bash
# avtoimtixon.uz — server-side deploy helper.
# Run this from the `app/` directory ON THE SERVER (not locally).
# Usage:
#   ./deploy.sh up        # build & start (default)
#   ./deploy.sh restart   # rebuild & restart only the app container
#   ./deploy.sh logs      # tail logs
#   ./deploy.sh down      # stop everything
#   ./deploy.sh seed      # run a one-shot DB seed inside the running container

set -euo pipefail

CMD="${1:-up}"
COMPOSE="docker compose -f docker-compose.prod.yml"

require_env() {
  if [ ! -f .env.production ]; then
    echo "ERROR: .env.production not found in $(pwd)." >&2
    echo "Copy .env.production.example -> .env.production and fill it in:" >&2
    echo "  cp .env.production.example .env.production && nano .env.production" >&2
    exit 1
  fi
}

case "$CMD" in
  up)
    require_env
    echo ">>> Pulling base images and building app..."
    $COMPOSE pull nginx || true
    $COMPOSE build app
    echo ">>> Starting stack..."
    $COMPOSE up -d
    echo ">>> Status:"
    $COMPOSE ps
    echo ">>> Last 50 app log lines:"
    $COMPOSE logs --tail=50 app || true
    ;;
  restart)
    require_env
    $COMPOSE build app
    $COMPOSE up -d --no-deps app
    $COMPOSE ps
    ;;
  logs)
    $COMPOSE logs -f --tail=200
    ;;
  down)
    $COMPOSE down
    ;;
  seed)
    require_env
    echo ">>> Running prisma seed inside app container..."
    $COMPOSE exec app node node_modules/.bin/tsx prisma/seed.ts
    ;;
  *)
    echo "Unknown command: $CMD" >&2
    echo "Usage: $0 {up|restart|logs|down|seed}" >&2
    exit 1
    ;;
esac
