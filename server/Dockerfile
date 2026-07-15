FROM node:24-alpine AS development

WORKDIR /app/server

COPY server/package.json server/package-lock.json* ./
RUN npm install

COPY server ./

EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:24-alpine AS build

WORKDIR /app/server

COPY server/package.json server/package-lock.json* ./
RUN npm ci

COPY server ./
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

FROM node:24-alpine AS production

WORKDIR /app/server
ENV NODE_ENV=production

COPY --from=build /app/server/package.json ./package.json
COPY --from=build /app/server/node_modules ./node_modules
COPY --from=build /app/server/dist ./dist
COPY --from=build /app/server/prisma ./prisma

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
