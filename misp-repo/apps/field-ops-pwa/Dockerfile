# Dockerfile for field-ops-pwa (Next.js or similar)
FROM node:20-alpine
WORKDIR /app
COPY apps/field-ops-pwa/package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY apps/field-ops-pwa/. .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
