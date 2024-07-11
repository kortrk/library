# syntax=docker/dockerfile:1

FROM node:22.2.0

WORKDIR /app

# Angular
RUN npm install -g typescript
RUN npm install -g @angular/cli
COPY ./frontend/package.json .
RUN npm install

# Ruby
RUN \
  apt-get update && \
  apt-get install -y ruby ruby-dev
RUN gem install bundler
COPY backend/Gemfile backend/Gemfile.lock ./
RUN bundle install

# Postgres
RUN apt install -y postgresql
RUN rm /etc/postgresql/15/main/pg_hba.conf
COPY backend/pg_hba.conf ./
RUN cp pg_hba.conf /etc/postgresql/15/main/

# Dev Utilities
RUN apt-get update
RUN apt-get install -y vim lsof
RUN echo 'alias ll="ls -alF"' >> ~/.bashrc

EXPOSE 4200

COPY docker_entry.sh ./
ENTRYPOINT ["./docker_entry.sh"]
