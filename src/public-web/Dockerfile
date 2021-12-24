FROM node:16.0-buster AS builder

WORKDIR /app

COPY ./Makefile ./package.json ./package-lock.json ./

RUN make vendor

COPY ./ ./

RUN NODE_OPTIONS="--max-old-space-size=4096" make dist

FROM nginx:stable

COPY --from=builder /app/build/ /usr/share/nginx/html/

COPY ./nginx/docker-entrypoint.d/ /docker-entrypoint.d/
COPY ./appConfig.js.template /app/
