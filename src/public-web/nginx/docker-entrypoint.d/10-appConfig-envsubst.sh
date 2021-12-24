#!/bin/bash

set -eu

function main {
    envsubst < /app/appConfig.js.template > /usr/share/nginx/html/appConfig.js
    cat /usr/share/nginx/html/appConfig.js
}

main
