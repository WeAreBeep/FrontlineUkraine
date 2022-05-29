#!/usr/bin/env bash

set -e

echo "Writing GitHub secrets to app-settings.json..."

echo "{
    \"APP_DATA_SUPPLIERS_SHEET\": \"$APP_DATA_SUPPLIERS_SHEET\",
    \"Emails__FromAddress\": \"$APP_EMAIL_FROMADDRESS\",
    \"Emails__SendGridKey\": \"$APP_EMAIL_SENDGRIDKEY\",
    \"Emails__ToAddresses\": \"$APP_EMAIL_TOADDRESS\",
    \"AuthMessageSender__SendGridUser\": \"$APP_EMAIL_SENDGRIDUSER\",
    \"AuthMessageSender__SendGridKey\": \"$APP_EMAIL_SENDGRIDKEY\",
    \"APP_MAPBOX_TOKEN\": \"$APP_MAPBOX_TOKEN\",
    \"ReCaptcha__SecretKey\": \"$APP_RECAPTCHA_SECRETKEY\",
    \"ReCaptcha__SiteKey\": \"$APP_RECAPTCHA_SITEKEY\",
    \"APP_DATACONTEXT\": \"$APP_DATACONTEXT\",
    \"WEB_USERSECRETSID\": \"$WEB_USERSECRETSID\",
    \"ContentfulOptions__DeliveryApiKey\": \"$CONTENTFUL_DELIVERY_ACCESS_TOKEN\",
    \"ContentfulOptions__SpaceId\": \"$CONTENTFUL_SPACE_ID\",
    \"ContentfulOptions__Environment\": \"$CONTENTFUL_ENVIRONMENT\",
    \"ContentfulOptions__UsePreviewApi\": false,
    \"PosttagEndpoint\": \"$POSTTAG_ENDPOINT\",
    \"PosttagId\": \"$POSTTAG_ID\",
    \"PosttagApiKey\": \"$POSTTAG_API_KEY\",
    \"WebsiteCanonicalUrl\": \"$WEBSITE_CANONICAL_URL\",
    \"What3wordsApiKey\": \"$WHAT3WORDS_API_KEY\",
    \"AuthgearAppAdminPortalUrl\": \"$AUTHGEAR_ADMIN_PORTAL\",
    \"PublicWebPublicMapUrl\": \"$PUBLIC_WEB_PUBLIC_MAP_URL\",
    \"PublicWebSupplierMapUrl\": \"$PUBLIC_WEB_SUPPLIER_MAP_URL\"
}" > ./app-settings.json

echo "Initializing Terraform..."

terraform init

echo "Selecting Terraform Workspace ($DEPLOY_WORKSPACE)..."

terraform workspace select $DEPLOY_WORKSPACE

echo "Planning Terraform Deployment..."

terraform plan \
    -var "container_image_tag=$GITHUB_RUN_NUMBER" \
    -var "public_web_image_tag=$GITHUB_RUN_NUMBER" \
    -var "core_image_tag=$GITHUB_RUN_NUMBER" \
    -var "mapbox_token=$APP_MAPBOX_TOKEN" \
    -var "core_api_key=$APP_CORE_API_KEY" \
    -var "contentful_delivery_access_token=$CONTENTFUL_DELIVERY_ACCESS_TOKEN"\
    -var "contentful_space_id=$CONTENTFUL_SPACE_ID"\
    -var "contentful_environment=$CONTENTFUL_ENVIRONMENT"\
    -var "environment_name=$ENVIRONMENT_NAME" \
    -var "sql_admin_password=$SQL_ADMIN_PASSWORD" \
    -var "core_custom_domain_list=$CORE_CUSTOM_DOMAIN_LIST" \
    -var "core_server_host=$CORE_SERVER_HOST" \
    -var "core_cors_allowed_origins=$CORE_CORS_ALLOWED_ORIGINS" \
    -var "publicweb_custom_domain_list=$PUBLICWEB_CUSTOM_DOMAIN_LIST" \
    -var "publicweb_public_url=$PUBLICWEB_PUBLIC_URL" \
    -var "publicweb_api_endpoint=$PUBLICWEB_API_ENDPOINT" \
    -var "web_custom_domain_list=$WEB_CUSTOM_DOMAIN_LIST" \
    -var "posttag_endpoint=$POSTTAG_ENDPOINT" \
    -var "posttag_id=$POSTTAG_ID" \
    -var "posttag_api_key=$POSTTAG_API_KEY" \
    -var "authgear_client_id=$AUTHGEAR_CLIENT_ID" \
    -var "authgear_endpoint=$AUTHGEAR_ENDPOINT" \
    -var "what3words_api_key=$WHAT3WORDS_API_KEY" \
    -var "google_translation_api_key=$GOOGLE_TRANSLATION_API_KEY"

echo "Applying Terraform Deployment..."

terraform apply -auto-approve \
    -var "container_image_tag=$GITHUB_RUN_NUMBER" \
    -var "public_web_image_tag=$GITHUB_RUN_NUMBER" \
    -var "core_image_tag=$GITHUB_RUN_NUMBER" \
    -var "mapbox_token=$APP_MAPBOX_TOKEN" \
    -var "core_api_key=$APP_CORE_API_KEY" \
    -var "contentful_delivery_access_token=$CONTENTFUL_DELIVERY_ACCESS_TOKEN"\
    -var "contentful_space_id=$CONTENTFUL_SPACE_ID"\
    -var "contentful_environment=$CONTENTFUL_ENVIRONMENT"\
    -var "environment_name=$ENVIRONMENT_NAME" \
    -var "sql_admin_password=$SQL_ADMIN_PASSWORD" \
    -var "core_custom_domain_list=$CORE_CUSTOM_DOMAIN_LIST" \
    -var "core_server_host=$CORE_SERVER_HOST" \
    -var "core_cors_allowed_origins=$CORE_CORS_ALLOWED_ORIGINS" \
    -var "publicweb_custom_domain_list=$PUBLICWEB_CUSTOM_DOMAIN_LIST" \
    -var "publicweb_public_url=$PUBLICWEB_PUBLIC_URL" \
    -var "publicweb_api_endpoint=$PUBLICWEB_API_ENDPOINT" \
    -var "web_custom_domain_list=$WEB_CUSTOM_DOMAIN_LIST" \
    -var "posttag_endpoint=$POSTTAG_ENDPOINT" \
    -var "posttag_id=$POSTTAG_ID" \
    -var "posttag_api_key=$POSTTAG_API_KEY" \
    -var "authgear_client_id=$AUTHGEAR_CLIENT_ID" \
    -var "authgear_endpoint=$AUTHGEAR_ENDPOINT" \
    -var "what3words_api_key=$WHAT3WORDS_API_KEY" \
    -var "google_translation_api_key=$GOOGLE_TRANSLATION_API_KEY"
