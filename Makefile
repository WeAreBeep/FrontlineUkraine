# Supported environment: Unix-like / Powershell
SELF_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

DOCKER_COMPOSE_CMD := docker-compose -f $(SELF_DIR)docker-compose.dev.yml -f $(SELF_DIR)docker-compose.override.yml

ifeq (,${NO_DOCKER})
DOCKER_RUN := $(DOCKER_COMPOSE_CMD) run --rm web
else
DOCKER_RUN :=
endif

SERVICES := web core celeryworker public-web

.PHONY: setup
setup:
	@cp ./docker-compose.override.yml.template ./docker-compose.override.yml
	@cp Web/appsettings.Development.json.template Web/appsettings.Development.json
	@echo "Please update Web/appsettings.Development.json for your local development"
	@echo "Your .env now is"
	@echo "================"
	@cat Web/appsettings.Development.json
	@echo "================"
	@echo "Please choose either docker-based or localhost setup before starting server"
	@echo "export NO_DOCKER=1 and replace Database part in ConnectionStrings.DataContext to 'localhost,1433' in Web/appsettings.Development.json if you use local development"
	@$(MAKE) db-setup
	@cp ./src/public-web/appConfig.js.template ./src/public-web/public/appConfig.js
	@echo '[public-web]: Please update public/appConfig.js for your local development'
	@echo "Your public/appConfig.js now is"
	@echo "================"
	@cat ./src/public-web/public/appConfig.js
	@echo "================"
	@echo '[general]: Please update docker-compose.override.yml for your local development'
	@echo "Your docker-compose.override.yml now is"
	@echo "================"
	@cat ./docker-compose.override.yml
	@echo "================"


.PHONY: db-setup
db-setup:
	$(DOCKER_COMPOSE_CMD) up -d db
	@echo "IMPORTANT: You need to set up the database by using Data-application Wizard. Use the Database project by Azure Data Studio on Mac or Visual Studio on Windows to finish the setup."
	@echo "Check https://docs.microsoft.com/en-us/sql/azure-data-studio/extensions/sql-database-project-extension?view=sql-server-ver15"
	@echo "TODO: Automate database setup"

.PHONY: dev
dev:
	if [ "${NO_DOCKER}" = "" ]; then \
		$(DOCKER_COMPOSE_CMD) up; \
	else \
		make -f Makefile.nodocker.mk dev; \
	fi

.PHONY: docker-build
docker-build:
	docker-compose -f $(SELF_DIR)docker-compose.build.yml build $(SERVICES)

.PHONY: docker-push
docker-push:
	docker-compose -f $(SELF_DIR)docker-compose.build.yml push $(SERVICES)
