#!/bin/bash
service postgresql start

cd backend
echo "rake db:create"
rake db:create
echo "rake db:migrate"
rake db:migrate
echo "rake db:seed"
rake db:seed

bash
