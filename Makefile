.DEFAULT_GOAL := dev

build-dev:
	@tools/scripts/compose-dev.sh build --parallel

build-dev-noparallel:
	@tools/scripts/compose-dev.sh build

down:
	@tools/scripts/compose-dev.sh down

down-volumes:
	@tools/scripts/compose-dev.sh down -v

dev:
	@tools/scripts/compose-dev.sh up

dev-minimal:
	@tools/scripts/compose-dev-min.sh up

db:
	@tools/scripts/compose-db.sh up

staging:
	@tools/scripts/compose-staging.sh up -d

staging-down:
	@tools/scripts/compose-staging.sh down
