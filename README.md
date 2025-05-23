# Hono POC API

This is a REST API built with Hono.js and PostgreSQL using Drizzle ORM.

## Setup Instructions

1. Start the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

2. Apply database migrations:
   ```bash
   pnpm drizzle-kit push
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. In a separate terminal, run the client to test the API:
   ```bash
   pnpm run client
   ```

## API Access

```
http://localhost:3000
```
