/* eslint-disable no-console */
import { environment } from "@/env";
import app from "@/lib/server";
import { serve } from "@hono/node-server";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`\nServer is running!`);
    console.log(`\t- Listening: ${`http://localhost:${info.port}`}`);
    console.log(`\t- API Docs: ${`http://localhost:${info.port}/api/v1/docs`}`);
    console.log(`\t- DB Connection: ${environment.DATABASE_URL}`);
  },
);
