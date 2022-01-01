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
    value = "Host=${azurerm_postgresql_server.pgsql_svr.fqdn};Database=${azurerm_postgresql_database.pgsql_db.name};Port=5432;Username=${var.sql_admin_login}@${azurerm_postgresql_database.pgsql_db.name};Password=${var.sql_admin_password};SearchPath=frontlinelive,public;"
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
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = data.azurerm_container_registry.acr.admin_password
    REACT_APP_MAPBOX_TOKEN : var.mapbox_token
    REACT_APP_API_ENDPOINT : "https://${azurerm_app_service.core.default_site_hostname}/api"
    REACT_APP_API_KEY : var.core_api_key
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
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.azurerm_container_registry.acr.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = data.azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = data.azurerm_container_registry.acr.admin_password
    PORT                            = 80
    PROJECT_NAME                    = "Frontline.live"
    SERVER_NAME                     = local.core_app_service_default_site_hostname
    SERVER_HOST                     = "https://${local.core_app_service_default_site_hostname}"
    POSTGRES_SERVER                 = azurerm_postgresql_server.pgsql_svr.fqdn
    POSTGRES_USER                   = var.sql_admin_login
    POSTGRES_PASSWORD               = var.sql_admin_password
    POSTGRES_DB                     = azurerm_postgresql_database.pgsql_db.name
    POSTGRES_SCHEMA                 = "frontlinelive"
    // To prevent cycle, we should register custom domain later
    BACKEND_CORS_ORIGINS            = "[\"${local.core_app_service_default_site_hostname}\"]"
  }

  depends_on = [
    azurerm_postgresql_server.pgsql_svr,
    azurerm_postgresql_database.pgsql_db
  ]
}

resource "azurerm_application_insights" "insights" {
  name                = "${local.prefix}-appi-${terraform.workspace}"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  application_type    = "web"
  tags                = local.tags
}

resource "azurerm_app_service_custom_hostname_binding" "customHostnameBindng" {
  count = length(var.app_service_custom_domain_list)

  hostname            = var.app_service_custom_domain_list[count.index]
  app_service_name    = azurerm_app_service.web.name
  resource_group_name = data.azurerm_resource_group.rg.name

  depends_on = [
    azurerm_app_service.web,
  ]
}
