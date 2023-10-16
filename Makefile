dc\:build:
	docker compose build

dc\:dev:
	docker compose up

setup:
	cp .env.dist .env
	make dc:build
