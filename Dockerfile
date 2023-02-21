FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

FROM node:18-alpine AS builder
ARG APP_ENV
WORKDIR /app
COPY . .
COPY .env$APP_ENV .env
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3001

RUN npm run build

FROM node:18-alpine AS runner
EXPOSE 3001

WORKDIR /usr/app
ARG APP_ENV
COPY --from=builder /app/build ./build
COPY package.json ./
COPY prisma ./prisma/

COPY .env$APP_ENV .env
RUN npm install --legacy-peer-deps --prod
USER node
ENV NODE_ENV="production"



CMD ["npm", "start"]
