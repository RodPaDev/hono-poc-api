import { serve } from "@hono/node-server";
import { create } from "domain";
import app from "./server.js";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
