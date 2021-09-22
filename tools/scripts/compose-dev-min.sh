#!/usr/bin/env bash

docker-compose \
-p chatapp \
--env-file .env \
-f ./docker/backend/docker-compose.yml \
"$@"
