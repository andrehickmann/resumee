# Development stage
FROM node:24-alpine AS development

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

COPY docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# Build stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
# Vollstaendige Installation, nicht nur die Laufzeit-Abhaengigkeiten: der Build
# laeuft ueber vite-ssg, und das steht unter devDependencies.
RUN npm ci --include=optional

COPY . .

# Der Schalter landet zur Bauzeit fest im Ergebnis, weil Vite ihn einsetzt und
# nicht erst im Browser ausliest. Umstellen heisst also: neu bauen.
ARG VITE_UNDER_CONSTRUCTION=false
ENV VITE_UNDER_CONSTRUCTION=$VITE_UNDER_CONSTRUCTION

RUN npm run build

# Production stage
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Der Healthcheck gehoert hierher und nicht in die compose-Datei: so gilt er
# auch fuer ein einfaches `docker run`.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
