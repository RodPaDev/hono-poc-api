import "dotenv/config";
import { z } from "zod";

export const Env = z
  .object({
    NODE_ENV: z
      .enum(["test", "development", "staging", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    ALLOWED_ORIGINS: z
      .string()
      .default(["http://localhost:5173", "http://localhost:3000"].join(","))
      .transform((val) => val.split(",")),
    EXPOSE_OPEN_API: z
      .string()
      .optional()
      .transform((val) => val === "true"),
  })
  .parse(process.env);
