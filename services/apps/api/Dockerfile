FROM node:lts-alpine AS base

RUN apk update && apk upgrade && apk add --no-cache openssl \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apk/*
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

FROM base AS builder

WORKDIR /app

RUN npm i -g pnpm
    
COPY . .
RUN rm -rf node_modules **/node_modules .env **/.env 
RUN pnpm i --ignore-scripts
RUN pnpm build:api

FROM base AS runtime

WORKDIR /app

COPY --from=builder /app/services/apps/api/dist ./

CMD ["node", "/app/server.js"]