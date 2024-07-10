#!/bin/bash
service postgresql start

cd backend
rake db:setup
rake db:migrate
rake db:seed

bash