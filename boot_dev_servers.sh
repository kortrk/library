#!/bin/bash

if [ -f /.dockerenv ]; then
  printf "\nKilling running processes. "
  printf "You'll see harmless error messages if there are no dev servers running.\n\n"
  kill $(cat /app/backend/tmp/pids/server.pid)
  rm /app/backend/tmp/pids/server.pid
  kill $(lsof -t -i:4200)
  printf "\nDone clearing those processes.\n"
  
  printf "\nNow starting the servers\n"

  cd /app/backend/
  rails s &

  cd /app/frontend/
  ./serve.sh &
else
    echo "Usage: run this script inside the dev environment Docker container";
fi
