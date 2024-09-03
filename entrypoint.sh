#!/bin/sh

# Set the default API URL
API_URL_DEFAULT="localhost:3000"
UI_ENVIRONMENT_DEFAULT="Development"
UI_RELEASE_DEFAULT="1.0.0"


# Use the  command line arguments as the API URL or use the default
APISVR_URL=${1:-$API_URL_DEFAULT}
UI_ENV=${2:-$UI_ENVIRONMENT_DEFAULT}
UI_REL=${3:-$UI_RELEASE_DEFAULT}


# Replace the placeholder in the Angular environment file with the actual API URL
sed -i "s|{{SERVER_URL}}|$APISVR_URL|g" /usr/share/nginx/html/main.*.js
sed -i "s|{{UI_ENVIRONMENT}}|$UI_ENV|g" /usr/share/nginx/html/main.*.js
sed -i "s|{{UI_RELEASE}}|$UI_REL|g" /usr/share/nginx/html/main.*.js


# Start the Nginx server
exec nginx -g 'daemon off;'