# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app

# 1. Copy package files
COPY package.json package-lock.json* ./

# 2. Copy Prisma schema specifically (Required for postinstall scripts)
COPY prisma ./prisma/

# 3. Install dependencies (This will now trigger 'prisma generate' successfully)
RUN npm ci

# 4. Copy the rest of your source code
COPY . .

# 5. Build the Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Runner (Production Image)
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Security: Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]