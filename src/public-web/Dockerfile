FROM node:16.0-buster AS builder

WORKDIR /app

COPY ./Makefile ./package.json ./package-lock.json ./

RUN make vendor

COPY ./ ./

RUN make dist

FROM nginx:stable

COPY --from=builder /app/build/ /usr/share/nginx/html/
