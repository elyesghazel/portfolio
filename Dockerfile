# Stage 1: Build
FROM node:20-slim AS build

WORKDIR /app

# Kopiere die Abhängigkeiten (beachte das npm lockfile!)
COPY package.json package-lock.json ./

# Installiere Abhängigkeiten mit npm
RUN npm ci

# Kopiere den Rest des Codes
COPY . .

# Baue das Projekt
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
# Kopiere das Ergebnis (Vite baut standardmäßig nach /dist)
COPY --from=build /app/dist /usr/share/nginx/html
# Kopiere deine nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80