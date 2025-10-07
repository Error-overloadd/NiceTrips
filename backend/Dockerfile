# syntax=docker/dockerfile:1.6

FROM node:20-bookworm-slim AS base
WORKDIR /app

FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN npm run build

FROM base AS runner
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci 
COPY --from=builder /app/dist ./dist
COPY migrations ./migrations
COPY config/config.cjs ./config/config.cjs
COPY .sequelizerc ./.sequelizerc
COPY seeders ./seeders
USER node
EXPOSE 3000

CMD ["node", "dist/index.js"]