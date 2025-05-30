import { db } from "@/lib/db";
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";
import * as schema from "./models";

import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

async function clearAllTables() {
  return await db.transaction(async (tx) => {
    await tx.delete(schema.user);
    await tx.delete(schema.organization);
  });
}
logger.info("Clearing all tables...");
await clearAllTables();
logger.info("All tables cleared");

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [organizationClient()],
});
logger.info("Auth client created");

logger.info("Creating users...");
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
  const member = await db.query.member.findFirst({
    where: (m, { eq }) => eq(m.userId, data1.user.id),
  });
  await auth.api.addMember({
    body: {
      userId: data2.user.id,
      organizationId: member?.organizationId || "",
      role: "user",
    },
  });
}
