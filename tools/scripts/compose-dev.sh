#!/usr/bin/env bash

docker-compose \
-p chatapp \
--env-file .env \
-f ./docker/database/docker-compose.yml \
-f ./docker/backend/docker-compose.yml \
-f ./docker/storage/docker-compose.yml \
"$@"
