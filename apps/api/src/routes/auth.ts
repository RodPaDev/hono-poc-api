import { auth } from "@/lib/auth";
import { type HonoContext } from "@/lib/context";
import { Hono } from "hono";

export const betterAuthRouter = new Hono<HonoContext>({
  strict: false,
});

betterAuthRouter.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
