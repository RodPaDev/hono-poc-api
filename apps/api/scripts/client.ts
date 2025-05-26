import { createAuthClient } from "better-auth/client";

// login to the Better Auth client
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

const session = await authClient.getSession();

console.log("Session:", session);
