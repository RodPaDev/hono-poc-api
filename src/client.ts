import { hc } from "hono/client";
import { type AppType } from "./server.js";

const client = hc<AppType>("http://localhost:3000/");

const res = await client.api.$get({
  query: {
    page: "1",
    pageSize: "2",
  },
});

if (res.ok) {
  const { data } = await res.json();
  console.log(data);
}
