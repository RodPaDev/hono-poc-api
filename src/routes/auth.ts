import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { type HonoContext } from "../lib/context.js";


export const betterAuthRouter = new Hono<HonoContext>({
  strict: false,
});

betterAuthRouter.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
