import "dotenv/config";
import { z } from "zod";

export const environment = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),
  })
  .parse(process.env);
