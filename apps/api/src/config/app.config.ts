import { Env } from "@/env";

export const AppConfig = {
  EXPOSE_OPEN_API: Env.NODE_ENV === "development",
  EMAIL: {
    EMAIL_FROM: "delivered@resend.dev",
    COMPANY_NAME: "Seed",
  },
};
