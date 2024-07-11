#!/bin/bash

if [ -f /.dockerenv ]; then
  kill $(cat /app/backend/tmp/pids/server.pid)
  rm /app/backend/tmp/pids/server.pid
  kill $(lsof -t -i:4200)

  cd /app/backend/
  rails s &

  cd /app/frontend/
  ./serve.sh &
else
    echo "Usage: run this script inside the dev environment Docker container";
fi
