# Multi-stage Dockerfile for Next.js Dentist Portfolio
# Supports both development and production builds

# ============================================
# BASE STAGE
# ============================================
FROM node:20-alpine AS base
WORKDIR /app

# ============================================
# DEPENDENCIES STAGE
# ============================================
FROM base AS deps
# Install dependencies needed for node-gyp
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
# Use npm ci if lock file exists, otherwise npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ============================================
# DEVELOPMENT STAGE
# ============================================
FROM base AS dev
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start development server
CMD ["npm", "run", "dev"]

# ============================================
# BUILD STAGE
# ============================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# ============================================
# PRODUCTION STAGE
# ============================================
FROM base AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application + production dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/content ./content

USER nextjs

EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
