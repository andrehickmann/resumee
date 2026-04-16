#!/usr/bin/env sh
set -e

if [ ! -x node_modules/.bin/vite ] || ! npm ls vite >/dev/null 2>&1 || ! node_modules/.bin/vite --version >/dev/null 2>&1; then
  npm install
fi

exec "$@"
