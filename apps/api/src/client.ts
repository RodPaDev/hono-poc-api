import { db } from "@/lib/db";
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";
import { hc } from "hono/client";
import { type AppType } from "./lib/server";
import * as schema from "./models";

import { auth } from "@/lib/auth";

async function clearAllTables() {
  return await db.transaction(async (tx) => {
    await tx.delete(schema.user);
    await tx.delete(schema.organization);
  });
}
await clearAllTables();

const apiClient = hc<AppType>("http://localhost:3000/");

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [organizationClient()],
});

const { data: data1 } = await authClient.signUp.email({
  email: "dev1@altar.io",
  password: "devpassword",
  name: "Dev1 User",
});

const { data: data2 } = await authClient.signUp.email({
  email: "dev2@altar.io",
  password: "devpassword",
  name: "Dev2 User",
});

if (data1?.user && data2?.user) {
  console.log("Here 1");
  const member = await db.query.member.findFirst({
    where: (m, { eq }) => eq(m.userId, data1.user.id),
  });
  console.log("Here 2", member);
  const x = await auth.api.addMember({
    body: {
      userId: data2.user.id,
      organizationId: member?.organizationId || "",
      role: "member",
    },
  });
  console.log("Here 3", x);
}

// auth.api.createInvitation({
//   body: {
//     email: "",
//     organizationId: user1.organizationId,
//   }
// })
// authClient.organization.in

// const x = await apiClient.api.v1.
