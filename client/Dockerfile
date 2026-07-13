# Stage 1: Install workspace dependencies
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
COPY scripts/ ./scripts/
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN bun install --frozen-lockfile

# Stage 2: Build Next.js standalone app
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bunfig.toml tsconfig.json ./
COPY client/ ./client/
COPY shared/ ./shared/
WORKDIR /app/client
RUN bun run build

# Stage 3: Production runtime using Next.js standalone output
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/client/.next/standalone ./
COPY --from=builder /app/client/.next/static ./client/.next/static
COPY --from=builder /app/client/public ./client/public
EXPOSE 5000
CMD ["node", "client/server.js"]
