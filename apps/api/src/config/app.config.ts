import { Env } from "@/env";

export const AppConfig = {
  EXPOSE_OPEN_API: Env.NODE_ENV === "development",
};
