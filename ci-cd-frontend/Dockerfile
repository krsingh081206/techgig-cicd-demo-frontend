## Stage 1
# Use an official Node.js runtime as the base image
FROM node:18.16.0-alpine as build-step

# Create and Set the working directory in the container to /app
RUN mkdir -p /app

# Set app as working directory
WORKDIR /app

# Copy the package.json and package-lock.json files from your local machine to the container
COPY package.json /app
COPY package-lock.json /app

# Set environment variable before running npm install
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install the Angular CLI and the project's dependencies in the container
RUN npm install --legacy-peer-deps

# Copy the rest of the project files from your local machine to the container
COPY . /app

# Build the Angular project in production mode
RUN npm run build

## Stage 2
# Use an official NGINX runtime as the base image for the second stage of the build
FROM nginx:1.17.1-alpine
EXPOSE 80

# Copy the built Angular files from the first stage of the build to the NGINX HTML folder
COPY --from=build-step /app/dist/MyAngularClient /usr/share/nginx/html

# Run nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
