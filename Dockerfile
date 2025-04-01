# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including dev dependencies needed for build
RUN npm ci

# Copy source code
COPY . .

# Build the application with production configuration
RUN npm run build -- --configuration=production

# Production stage
FROM nginx:alpine

# Set proper permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Copy built assets from build stage
COPY --from=build /app/dist/store-ui/browser /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 