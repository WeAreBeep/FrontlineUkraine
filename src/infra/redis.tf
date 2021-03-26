resource "azurerm_redis_cache" "redis_web" {
  name                = "${local.prefix}-redisweb-${terraform.workspace}"
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = data.azurerm_resource_group.rg.location
  capacity            = 0
  family              = "C"
  sku_name            = "Basic"
  enable_non_ssl_port = false
  tags                = local.tags
}
