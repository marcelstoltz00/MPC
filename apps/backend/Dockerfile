# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./

COPY packages ./packages

COPY apps/backend ./apps/backend

RUN yarn install --frozen-lockfile

RUN yarn --cwd apps/backend build

# ==========================================
# Stage 2: Runner
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 3001

CMD ["yarn", "--cwd", "apps/backend", "start:prod"]