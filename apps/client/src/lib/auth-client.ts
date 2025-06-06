import {
  ORGANIZATION_ROLES,
  organizationAC,
  USER_ROLES,
  userAC,
} from "@fsm/common";
import {
  adminClient,
  emailOTPClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    emailOTPClient(),
    organizationClient({
      ac: organizationAC,
      roles: ORGANIZATION_ROLES,
    }),
    adminClient({
      ac: userAC,
      roles: USER_ROLES,
    }),
  ],
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  forgetPassword,
  resetPassword,
  organization,
  getSession,
  emailOtp,
} = authClient;
