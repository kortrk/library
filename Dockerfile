# syntax=docker/dockerfile:1

FROM node:22.2.0

ENV NODE_ENV production

WORKDIR /app

RUN npm install -g typescript

RUN npm install -g @angular/cli

EXPOSE 4200
