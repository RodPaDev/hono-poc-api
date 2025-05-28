import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
    ALLOWED_ORIGINS: z
      .string()
      .default(["http://localhost:5173", "http://localhost:3000"].join(","))
      .transform((val) => val.split(",")),
  })
  .parse(process.env);
