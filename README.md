# FrontLineLive

## Introduction

Frontline.live is a web-based medical supplies matching platform.

General public can submit medical supplies requests at the public site (frontline.live).

Admin can approve and manage all requests at the admin site. (frontline.live/admin).

## Technology

| Component                        | Tech stack   |
|:---------------------------------|:-------------|
| Public site                      | React.js     |
| API server (for the public site) | Python       |
| Admin site                       | Plain HTML   |
| API server (for the admin site)  | ASP.NET Core |
| Deployment                       | Docker       |
| Infrastructure provisioning      | Terraform    |

The public site and the admin site uses different technology because we are in the midst of migrating the whole site to
React.js + Python.

The admin site will be revamped into the said tech stack at a later stage.

## 3rd Party Services Used

| Component                  | Services                                 |
|:---------------------------|:-----------------------------------------|
| Map                        | Map Box (https://www.mapbox.com/)        |
| CMS                        | Contentful (https://www.contentful.com/) |
| Last mile postcode look up | Posttag (https://www.posttag.com)        |

## Initialise local development environment

### Prerequisit for all systems

- Docker ^20.10.8
- Docker Compose ^1.29.2

### For Mac/ Linux

#### Steps

```sh
# Prepare local development settings
$ make setup

# Start servers in Docker
$ make dev

# For those who want to start development on website without Docker
#
# You can start depending services in docker
$ make -f Makefile.nodocker.mk docker-start-db
# And then run the dotnet process in local for admin portal
$ NO_DOCKER=1 MODULE=Web make dev
#
# For public-web
$ NO_DOCKER=1 PORT=3002 MODULE=public-web make dev
# For core API server
$ NO_DOCKER=1 MODULE=core make dev
```

After running above commands,

- visit http://localhost:3000 on browser and you should be able to see the admin portal website;
- visit http://localhost:3002 on browser and you should be able to see the public website.

### For Windows

#### Steps

This setup guide assumes you are using Powershell.

1. Open your Powershell and navigate to the project root directory
2. Run the following commands to copy local configuration files

```shell=Powershell
Copy-Item ".\docker-compose.override.yml.template" -Destination ".\docker-compose.override.yml"

Copy-Item ".\Web\appsettings.Development.json.template" -Destination ".\Web\appsettings.Development.json"

Copy-Item ".\src\public-web\appConfig.js.template" -Destination ".\.\src\public-web\public\appConfig.js"
```

3. Run the following command to start servers

```shell=Powershell
docker-compose -f ".\docker-compose.dev.yml" -f ".\docker-compose.override.yml" up
```

After running above commands,

- visit http://localhost:3000 on browser and you should be able to see the admin portal website;
- visit http://localhost:3002 on browser and you should be able to see the public website.

#### Not yet supported

The Makefiles only support Mac/ Linux environment. We need support to make it Powershell-friendly

## Useful scripts and hints

### Add database migration script

```shell=bash
$ docker-compose -f ./docker-compose.dev.yml -f ./docker-compose.override.yml run --rm core alembic revision -m 'Your message'
```

### Migrate database schema to the latest version

```shell=bash
$ docker-compose -f ./docker-compose.dev.yml -f ./docker-compose.override.yml run --rm core alembic upgrade head
```

### Add environment variables

To add more environment variables, make sure you have already updated the following essential files

- docker-compose.dev.yml
- src/infra/variables.tf
- resource definition in any src/infra/*.tf
- src/infra/deploy_terraform.sh
- .github/workflows/build_and_deploy.yml

## Project Structure

This project is organised in the following structure:

```
|-- Database (Obsoleted SQL Server database project)
|-- Shared  (Shared code for admin portal)
|-- Web (Codebase for API server (for the admin site) and admin site)
|-- docs
`-- src
    |-- core (Codebase for API Server (for the public site))
    |-- infra (Terraform project for infrastructure provisioning and deployment)
    `-- public-web (Codebase for public site)
```

## Deployment

All deployment will be run by the GitHub Action. Changes pushed to `master` branch will be automatically deployed to dev
sites.

To deploy changes to production environment, you need approval from one of the maintainers of the repository.

## GitHub Secrets

\* Should be environment specific.

### Deployment secrets

|Secret Name|Description|
|---|---|
|ARM_ACCESS_KEY|Azure Storage Account used for TF remote state. See [here](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage).|
|ARM_CLIENT_ID*||
|ARM_CLIENT_SECRET*||
|ARM_SUBSCRIPTION_ID*||
|ARM_TENANT_ID*||
|ACR_USERNAME|Username for ACR's [Admin Account](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication#admin-account).|
|ACR_PASSWORD|Password for ACR's [Admin Account](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication#admin-account).|
|ACR_SERVER|The login server for ACR|

### Application secrets

|Secret Name|Description|
|---|---|
|APP_DATA_SUPPLIERS_SHEET*|-|
|APP_EMAIL_FROMADDRESS*|-|
|APP_EMAIL_SENDGRIDKEY*|-|
|APP_EMAIL_SENDGRIDUSER*|-|
|APP_EMAIL_TOADDRESS*|-|
|APP_MAPBOX_TOKEN*|Map Token|
|APP_RECAPTCHA_SECRETKEY*|-|
|APP_RECAPTCHA_SITEKEY*|-|
|APP_DATACONTEXT*|-|
|WEB_USERSECRETSID*|-|
|SQL_ADMIN_PASSWORD*|-|
|CONTENTFUL_DELIVERY_ACCESS_TOKEN*|Content Delivery API - access token|
|CONTENTFUL_SPACE_ID*|Contentful Space ID|
|CONTENTFUL_ENVIRONMENT*|Name of Contentful environment in use|
|POSTTAG_ENDPOINT*|-|
|POSTTAG_ID*|-|
|POSTTAG_API_KEY*|-|

### Domain names and CORS allowed origins setting

Check [build_and_deploy.yml](.github/workflows/build_and_deploy.yml). For list values, they should be JSON encoded.

## Diagrams

- [ER diagram](docs/ERD.svg)
