# syntax=docker/dockerfile:1

FROM node:22.2.0

WORKDIR /app

# Angular
RUN npm install -g typescript
RUN npm install -g @angular/cli
COPY ./frontend/package.json .
RUN npm install

# Temporary/Dev
RUN apt-get update
RUN apt-get install -y vim
RUN echo 'alias ll="ls -alF"' >> ~/.bashrc

EXPOSE 4200
