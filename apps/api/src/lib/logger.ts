import { Env } from "@/env";
import { pino } from "pino";

export const logger = pino({
  ...(Env.NODE_ENV === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "dd/mm/yyyy - HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
  level: Env.NODE_ENV === "production" ? "info" : "debug",
});
