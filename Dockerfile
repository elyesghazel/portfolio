# Stage 1: Build
FROM node:20-slim AS build
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
# Kopiere die Abhängigkeiten
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Kopiere den Rest und builde
COPY . .
RUN pnpm build

# Stage 2: Production
FROM nginx:alpine
# Hier kopieren wir das Ergebnis INTERN von Stage 1 zu Stage 2
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80