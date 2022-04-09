# TODO: Move Web to src and refactor Makefiles

SELF_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

DOCKER_COMPOSE_CMD := docker-compose -f $(SELF_DIR)../../../docker-compose.dev.yml

ifeq (,${NO_DOCKER})
DOCKER_RUN := $(DOCKER_COMPOSE_CMD) run -w /app --rm core
else
DOCKER_RUN := poetry run
endif

.PHONY: dev
dev:
	$(DOCKER_RUN) uvicorn "app.main:app" --reload --proxy-headers --host "0.0.0.0" --port 3001

.PHONY: vendor
vendor:
	$(DOCKER_RUN) poetry install

.PHONY: dist
dist:
	@

.PHONY: format
format:
	$(DOCKER_RUN) isort --recursive  --force-single-line-imports --apply app
	$(DOCKER_RUN) autoflake --remove-all-unused-imports --recursive --remove-unused-variables --in-place app --exclude=__init__.py
	$(DOCKER_RUN) black app
	$(DOCKER_RUN) isort --recursive --apply app

.PHONY: lint
lint:
	$(DOCKER_RUN) mypy app
	$(DOCKER_RUN) black app --check
	$(DOCKER_RUN) isort --recursive --check-only app
	$(DOCKER_RUN) flake8

.PHONY: test-cov
test-cov:
	$(DOCKER_RUN) pytest --cov=app --cov-report=html

.PHONY: test
test:
	$(DOCKER_RUN) pytest --cov=app --cov-report=term-missing app/tests

.PHONY: db-migrate-up
db-migrate-up:
	$(DOCKER_RUN) alembic upgrade head

.PHONY: db-init-data
db-init-data:
	$(DOCKER_RUN) python ./app/initial_data.py
