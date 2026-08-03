# Stage 1: Build
# node:22 — pnpm 10+ requires Node >= 22.13
FROM node:22-slim AS build
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Dependencies first, so this layer caches across content-only changes
COPY elyesghazel-site/package.json elyesghazel-site/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY elyesghazel-site/ ./
RUN pnpm build

# Stage 2: Production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
