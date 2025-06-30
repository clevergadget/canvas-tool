# --- Frontend Dockerfile ---
FROM node:22-alpine AS builder
WORKDIR /app

# First, set up shared-types
WORKDIR /app/shared-types
COPY shared-types/package.json shared-types/package-lock.json* ./
COPY shared-types/tsconfig.json ./
COPY shared-types/src ./src
RUN npm ci
RUN npm run build

# Set up frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
# Link to the local shared-types package
RUN npm link ../shared-types
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
