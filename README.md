# Hono API Monorepo

A monorepo containing a Hono-based API and a client application.

## Project Structure

- `apps/api`: Hono API server
- `apps/client`: Client application
- `libs/types`: Shared TypeScript types

## Getting Started

```bash
# Install dependencies
pnpm install

# Start both API and client application concurrently
pnpm dev

# Or start them individually:
# Start the API server only
pnpm api:dev

# Start the client application only
pnpm client:dev

# Build all packages
pnpm build

# Build individual packages
pnpm api:build
pnpm client:build
```

## License

MIT