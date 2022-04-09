resource "azurerm_postgresql_flexible_server" "pgsql_svr" {
  name                = "${local.prefix}-pgsqlsvr-${terraform.workspace}"
  resource_group_name = data.azurerm_resource_group.rg.name
  location            = data.azurerm_resource_group.rg.location

  sku_name = "B_Standard_B2s"

  storage_mb                   = 131072
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  administrator_login    = var.sql_admin_login
  administrator_password = var.sql_admin_password

  version = "11"
  zone = "3"

  # No need to migrate the server back to primary zone after failover
  lifecycle {
    ignore_changes = [
      zone,
      high_availability.0.standby_availability_zone,
    ]
  }
}

resource "azurerm_postgresql_flexible_server_database" "pgsql_db" {
  name                = "${local.prefix}-pgsqldb-${terraform.workspace}"
  server_id           = azurerm_postgresql_flexible_server.pgsql_svr.id
  charset             = "UTF8"
  collation           = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "pgsql_fw" {
  name                = "AllowAzure"
  server_id           = azurerm_postgresql_flexible_server.pgsql_svr.id
  // REF: https://docs.microsoft.com/en-us/rest/api/sql/2021-02-01-preview/firewall-rules/create-or-update
  // The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses.
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}