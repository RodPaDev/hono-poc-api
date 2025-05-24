import { Hono, type Env } from "hono";
import { openAPISpecs } from "hono-openapi";

function openApi<E extends Env = Env>(app: Hono<E>) {
  return openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono API",
        version: "1.0.0",
        description: "Greeting API",
      },

      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  });
}

export { openApi };
