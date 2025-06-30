# --- Backend Dockerfile ---
FROM node:22-alpine AS base
WORKDIR /app

# First, set up shared-types
WORKDIR /app/shared-types
COPY shared-types/package.json shared-types/package-lock.json* ./
COPY shared-types/tsconfig.json ./
COPY shared-types/src ./src
RUN npm ci
RUN npm run build

# Set up backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ ./
# Link to the local shared-types package
RUN npm link ../shared-types
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=base /app/backend/dist ./dist
COPY backend/package.json ./
COPY backend/package-lock.json ./
# Install production dependencies
RUN npm ci --omit=dev
# Copy the shared-types package for production
COPY --from=base /app/shared-types /app/shared-types
# Link to the local shared-types package
RUN npm link /app/shared-types
EXPOSE 3001
CMD ["node", "dist/src/index.js"]
