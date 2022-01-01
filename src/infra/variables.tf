variable "environment_name" {
  type  = string
}

variable "container_registry_name" {
  type    = string
  default = "frontlineacr2"
}

variable "container_image_name" {
  type    = string
  default = "web"
}

variable "public_web_image_name" {
  type    = string
  default = "public-web"
}

variable "core_image_name" {
  type    = string
  default = "core"
}

variable "public_web_image_tag" {
  type    = string
}

variable "container_image_tag" {
  type    = string
}

variable "core_image_tag" {
  type    = string
}

variable "sql_admin_login" {
  type = string
  default = "frontline"
}

variable "sql_admin_password" {
  type = string
  sensitive = true
}

variable "app_service_custom_domain_list" {
  type = list(string)
}

variable "mapbox_token" {
  type = string
}

variable "core_api_key" {
  type = string
  default = "DUMMY"
}