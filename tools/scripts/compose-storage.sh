#!/usr/bin/env bash

docker-compose \
-p chatapp \
--env-file .env \
-f ./docker/storage/docker-compose.yml \
"$@"
