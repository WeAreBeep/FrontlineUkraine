resource "azurerm_postgresql_server" "pgsql_svr" {
  name                         = "${local.prefix}-pgsqlsvr-${terraform.workspace}"
  resource_group_name          = data.azurerm_resource_group.rg.name
  location                     = data.azurerm_resource_group.rg.location

  sku_name                     = "B_Gen5_1"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = false

  administrator_login          = var.sql_admin_login
  administrator_login_password = var.sql_admin_password
  version                      = "11"
  ssl_enforcement_enabled      = true
}

resource "azurerm_postgresql_database" "pgsql_db" {
  name                = "${local.prefix}-pgsqldb-${terraform.workspace}"
  resource_group_name = data.azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.pgsql_svr.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

resource "azurerm_postgresql_firewall_rule" "pgsql_fw" {
  name                = "AllowAzure"
  resource_group_name = data.azurerm_resource_group.rg.name
  server_name         = azurerm_postgresql_server.pgsql_svr.name
  // REF: https://docs.microsoft.com/en-us/rest/api/sql/2021-02-01-preview/firewall-rules/create-or-update
  // The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses.
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}