import { hc } from "hono/client";
import { type AppType } from "./server.js";

const client = hc<AppType>("http://localhost:3000/");

const res = await client["meteorite-landing"].years.$get();

if (res.ok) {
  const data = await res.json();
  console.log(data);
} else {
  const errMsg = await res.text();
  console.error(errMsg);
}
