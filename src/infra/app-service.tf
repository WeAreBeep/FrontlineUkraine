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
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.insights.instrumentation_key
    ASPNETCORE_ENVIRONMENT = var.environment_name,
    DeploymentContext = var.environment_name
  })

  connection_string {
    name = "DataContext"
    type = "SQLServer"
    value = "Server=tcp:${azurerm_sql_server.sql_svr.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.sql_db.name};Persist Security Info=False;User ID=${var.sql_admin_login};Password=${var.sql_admin_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }

  connection_string {
    name = "Redis"
    // Connection string cannot be injected to container if the type is RedisCache
    // Configure it to be `Custom` is a workaround
    type = "Custom"
    value = azurerm_redis_cache.redis_web.primary_connection_string
  }

  depends_on = [
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

resource "azurerm_app_service_custom_hostname_binding" "customHostnameBindng" {
  count = length(var.app_service_custom_domain_list)

  hostname            = var.app_service_custom_domain_list[count.index]
  app_service_name    = azurerm_app_service.web.name
  resource_group_name = data.azurerm_resource_group.rg.name

  depends_on          = [
        azurerm_app_service.web,
  ]
}
