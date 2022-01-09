FROM node:16.0-buster AS builder

WORKDIR /app

ENV PUBLIC_URL=__PUBLIC_URL__

COPY ./Makefile ./package.json ./package-lock.json ./
COPY ./patches/ ./patches/

RUN make vendor

COPY ./ ./

RUN NODE_OPTIONS="--max-old-space-size=4096" make dist

FROM nginx:stable

RUN apt-get update && \
    apt-get install -y ripgrep

COPY --from=builder /app/build/ /usr/share/nginx/html/

COPY ./nginx/docker-entrypoint.d/ /docker-entrypoint.d/
COPY ./nginx/templates/ /etc/nginx/templates/
COPY ./appConfig.js.template /app/
