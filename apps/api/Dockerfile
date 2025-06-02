##############################
######## BUILD STAGE #########
##############################
FROM node:22.16.0-alpine AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY libs/*/package.json ./libs/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the API application
RUN pnpm --filter @fsm/api build

##############################
######## RUNNER STAGE ########
##############################
FROM node:22.16.0-alpine AS runner

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the build stage
COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/apps/api/package.json ./apps/api/
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/libs/*/dist ./libs/*/dist
COPY --from=build /app/libs/*/package.json ./libs/*/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Set the user to node for security
USER node

EXPOSE 3000

CMD ["node", "apps/api/dist/index.js"]
