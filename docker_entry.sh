#!/bin/bash
service postgresql start

cd /app/backend
echo "rake db:create"
rake db:create
echo "rake db:migrate"
rake db:migrate
echo "rake db:seed"
rake db:seed

cd /app/frontend
echo "npm install"
npm install

cd /app

./boot_dev_servers.sh

bash
