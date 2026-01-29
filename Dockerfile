# Stage 1: Build
FROM node:20-slim AS build
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Kopiere die Abhängigkeiten aus dem Unterordner
COPY elyesghazel-site/package.json elyesghazel-site/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Kopiere den gesamten Unterordner-Inhalt
COPY elyesghazel-site/ ./

RUN pnpm build

# Stage 2: Production
FROM nginx:alpine
# Beachte: Vite baut standardmäßig nach /app/dist, wenn du im root des Projekts baust
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80