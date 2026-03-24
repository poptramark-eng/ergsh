# ---------- BUILD STAGE ----------
FROM node:24 AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Copy prisma BEFORE npm install (important!)
COPY prisma ./prisma

# Install dependencies (postinstall will now find schema)
RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build



# ---------- PRODUCTION STAGE ----------
FROM node:24-slim AS runner

WORKDIR /app

# Copy only what is needed for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

# Copy environment file (local dev)
COPY .env .env

EXPOSE 3000

CMD ["npm", "start"]
