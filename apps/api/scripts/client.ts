import { hc } from "hono/client";
import { type AppType } from "../src/lib/server.js";

const client = hc<AppType>("http://localhost:3000/");

const res = await client.api.v1["meteorite-landing"].$get({ query: {} });

if (res.ok) {
  const data = await res.json();
  // eslint-disable-next-line no-console
  console.log(data);
} else {
  const errMsg = await res.text();
  // eslint-disable-next-line no-console
  console.error(errMsg);
}
