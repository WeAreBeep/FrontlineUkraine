#!/bin/bash

set -eu

function main {
    envsubst < /app/appConfig.js.template > /usr/share/nginx/html/appConfig.js
    cat /usr/share/nginx/html/appConfig.js

    echo 'Replacing __PUBLIC_URL__ by real public URL'
    rg '__PUBLIC_URL__'  /usr/share/nginx/html --files-with-matches | xargs sed -i'' "s;__PUBLIC_URL__;${PUBLIC_URL};g"
}

main
