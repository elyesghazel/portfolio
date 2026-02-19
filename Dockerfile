# Stage 1: Build
FROM node:20-slim AS build

WORKDIR /app

# Wir kopieren die package.json, aber IGNORIEREN die pnpm-lock.yaml
COPY package.json ./

# Wir nutzen npm install (das generiert eine temporäre package-lock im Container)
RUN npm install

# Rest kopieren
COPY . .

# Build ausführen
RUN npm run build

# Stage 2: Production (bleibt gleich)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]