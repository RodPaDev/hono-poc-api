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
      .string({
        message:
          "Required string with URLs separated by commas, e.g. 'http://localhost:5173,http://localhost:3000'",
      })
      .transform((val) => val.split(",").map((url) => url.trim())),
  })
  .parse(process.env);
