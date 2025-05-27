import type app from "@/lib/server";
import { hc } from "hono/client";

// assign the client to a variable to calculate the type when compiling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = hc<typeof app>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);
