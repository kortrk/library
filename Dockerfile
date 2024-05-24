# syntax=docker/dockerfile:1

FROM node:22.2.0

WORKDIR /app

RUN npm install -g typescript

RUN npm install -g @angular/cli

COPY ./frontend/package.json .

RUN npm install

EXPOSE 4200
