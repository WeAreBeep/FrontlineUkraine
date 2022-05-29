resource "azurerm_app_service_plan" "asp" {
  name                = "${local.prefix}-asp-${terraform.workspace}"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true
  tags                = local.tags

  sku {
    tier     = "Standard"
    size     = "S1"
    capacity = "2"
  }
}

locals {
  pgsql_schema = "frontlinelive"
}

resource "azurerm_app_service" "web" {
  name                = "${local.prefix}-web-${terraform.workspace}"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.asp.id
  tags                = local.tags

  site_config {
    always_on        = "true"
    linux_fx_version = "DOCKER|${local.container_image}"
  }

  app_settings = merge(jsondecode(file("app-settings.json")), {
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = data.azurerm_container_registry.acr.admin_password
    APPINSIGHTS_INSTRUMENTATIONKEY  = azurerm_application_insights.insights.instrumentation_key
    ASPNETCORE_ENVIRONMENT          = var.environment_name,
    DeploymentContext               = var.environment_name
  })

  connection_string {
    name  = "DataContext"
    type  = "Custom"
    value = "Host=${azurerm_postgresql_flexible_server.pgsql_svr.fqdn};Database=${azurerm_postgresql_flexible_server_database.pgsql_db.name};Port=5432;Username=${var.sql_admin_login};Password=${var.sql_admin_password};SearchPath=${local.pgsql_schema},public;SSL Mode=VerifyCA;"
  }

  connection_string {
    name  = "Redis"
    // Connection string cannot be injected to container if the type is RedisCache
    // Configure it to be `Custom` is a workaround
    type  = "Custom"
    value = azurerm_redis_cache.redis_web.primary_connection_string
  }

  depends_on = [
    azurerm_redis_cache.redis_web
  ]
}

locals {
  core_app_service_name                        = "${local.prefix}-core-${terraform.workspace}"
  core_app_service_default_site_hostname       = "${local.core_app_service_name}.azurewebsites.net"
  public_web_app_service_name                  = "${local.prefix}-publicweb-${terraform.workspace}"
  public_web_app_service_default_site_hostname = "${local.public_web_app_service_name}.azurewebsites.net"
}

resource "azurerm_app_service" "public_web" {
  name                = local.public_web_app_service_name
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.asp.id
  tags                = local.tags

  site_config {
    always_on        = "true"
    linux_fx_version = "DOCKER|${local.public_web_image}"
  }

  app_settings = {
    NGINX_PORT                                 = 80
    DOCKER_REGISTRY_SERVER_URL                 = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME            = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD            = data.azurerm_container_registry.acr.admin_password
    PUBLIC_URL                                 = var.publicweb_public_url
    REACT_APP_MAPBOX_TOKEN                     = var.mapbox_token
    REACT_APP_API_ENDPOINT                     = var.publicweb_api_endpoint
    REACT_APP_API_KEY                          = var.core_api_key
    // Contentful
    REACT_APP_CONTENTFUL_DELIVERY_ACCESS_TOKEN = var.contentful_delivery_access_token
    REACT_APP_CONTENTFUL_SPACE_ID              = var.contentful_space_id
    REACT_APP_CONTENTFUL_ENVIRONMENT           = var.contentful_environment
    // Authgear
    REACT_APP_AUTHGEAR_CLIENT_ID               = var.authgear_client_id
    REACT_APP_AUTHGEAR_ENDPOINT                = var.authgear_endpoint
    // Google translate
    REACT_APP_GOOGLE_TRANSLATION_API_KEY       = var.google_translation_api_key
  }
}

resource "azurerm_app_service" "core" {
  name                = local.core_app_service_name
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.asp.id
  tags                = local.tags

  site_config {
    always_on        = "true"
    linux_fx_version = "DOCKER|${local.core_image}"
    cors {
      allowed_origins = var.core_cors_allowed_origins
    }
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = data.azurerm_container_registry.acr.admin_password
    PORT                            = 80
    PROJECT_NAME                    = "Frontline.live"
    SERVER_NAME                     = local.core_app_service_default_site_hostname
    SERVER_HOST                     = var.core_server_host
    POSTGRES_SERVER                 = azurerm_postgresql_flexible_server.pgsql_svr.fqdn
    POSTGRES_USER                   = var.sql_admin_login
    POSTGRES_PASSWORD               = var.sql_admin_password
    POSTGRES_DB                     = azurerm_postgresql_flexible_server_database.pgsql_db.name
    POSTGRES_SCHEMA                 = local.pgsql_schema
    BACKEND_CORS_ORIGINS            = jsonencode(var.core_cors_allowed_origins)
    // Specify Sentry DSN if any
    SENTRY_DSN                      = ""
    // Posttag
    POSTTAG_ENDPOINT                = var.posttag_endpoint
    POSTTAG_ID                      = var.posttag_id
    POSTTAG_API_KEY                 = var.posttag_api_key
    // Authgear
    AUTHGEAR_ENDPOINT               = var.authgear_endpoint
    // What3words
    WHAT3WORDS_API_KEY              = var.what3words_api_key
  }

  connection_string {
    name  = "CACHE_BACKEND_URL"
    // Connection string cannot be injected to container if the type is RedisCache
    // Configure it to be `Custom` is a workaround
    type  = "Custom"
    value = "redis://:${azurerm_redis_cache.redis_web.primary_access_key}@${azurerm_redis_cache.redis_web.hostname}:${azurerm_redis_cache.redis_web.enable_non_ssl_port ? azurerm_redis_cache.redis_web.port : azurerm_redis_cache.redis_web.ssl_port}/2?ssl=${!azurerm_redis_cache.redis_web.enable_non_ssl_port}"
  }

  depends_on = [
    azurerm_postgresql_flexible_server.pgsql_svr,
    azurerm_postgresql_flexible_server_database.pgsql_db,
    azurerm_redis_cache.redis_web
  ]
}

resource "azurerm_application_insights" "insights" {
  name                = "${local.prefix}-appi-${terraform.workspace}"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  application_type    = "web"
  tags                = local.tags
}

resource "azurerm_app_service_custom_hostname_binding" "core_custom_hostname_binding" {
  count = length(var.core_custom_domain_list)

  hostname            = var.core_custom_domain_list[count.index]
  app_service_name    = azurerm_app_service.core.name
  resource_group_name = data.azurerm_resource_group.rg.name

  depends_on = [
    azurerm_app_service.core,
  ]
}

resource "azurerm_app_service_custom_hostname_binding" "web_custom_hostname_binding" {
  count = length(var.web_custom_domain_list)

  hostname            = var.web_custom_domain_list[count.index]
  app_service_name    = azurerm_app_service.web.name
  resource_group_name = data.azurerm_resource_group.rg.name

  depends_on = [
    azurerm_app_service.web,
  ]
}

resource "azurerm_app_service_custom_hostname_binding" "publicweb_custom_hostname_binding" {
  count = length(var.publicweb_custom_domain_list)

  hostname            = var.publicweb_custom_domain_list[count.index]
  app_service_name    = azurerm_app_service.public_web.name
  resource_group_name = data.azurerm_resource_group.rg.name

  depends_on = [
    azurerm_app_service.public_web,
  ]
}