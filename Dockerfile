# Multi-stage Dockerfile for full-stack Veritas.O system
# Stage 1: Build frontend and backend
FROM node:16 AS build
WORKDIR /app
# Copy source code
COPY . .
# Install dependencies and build frontend
RUN npm install --prefix frontend && npm run build --prefix frontend
# Install dependencies and build backend
RUN npm install --prefix backend && npm run build --prefix backend

# Stage 2: Production image
FROM node:16-alpine AS prod
WORKDIR /app
# Copy backend build output
COPY --from=build /app/backend/dist ./dist
# Copy frontend build output into backend public directory
COPY --from=build /app/frontend/dist ./dist/public
# Copy backend production dependencies
COPY --from=build /app/backend/node_modules ./node_modules
# Copy any additional needed files (e.g., package.json for reference)
COPY backend/package.json ./package.json

EXPOSE 8080
CMD [ "node", "dist/core/boot.js" ]
