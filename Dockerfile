### STAGE 1: BUILD ###
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular app
RUN npm run build

### STAGE 2: RUN ###
FROM nginx:alpine

# Remove the default NGINX config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app to NGINX's public directory
COPY --from=build /app/dist/order-ecommerce-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
