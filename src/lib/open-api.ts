import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

function openApi(app: Hono) {
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
