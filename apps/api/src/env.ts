import { prettySyncParse } from "@/lib/zod";
import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["test", "development", "staging", "production"])
    .default("development"),
  PORT: z.coerce
    .number({
      message: "Port must be a number, e.g. 3000",
    })
    .int(),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required").url({
    message: "Invalid DB URL, e.g. 'postgres://user:pass@host:5432/db'",
  }),
  API_URL: z.string().nonempty("API_URL is required").url({
    message: "Invalid API URL, e.g. 'http://localhost:3000'",
  }),
  ALLOWED_ORIGINS: z
    .string()
    .nonempty("ALLOWED_ORIGINS is required")
    .refine(
      (val) => val.split(",").every((url) => url.trim().length > 0),
      "ALLOWED_ORIGINS must contain comma-separated URLs, e.g. 'http://localhost:5173,http://localhost:3000'",
    )
    .transform((val) => val.split(",").map((url) => url.trim())),
});

export const Env: z.infer<typeof EnvSchema> = prettySyncParse(
  EnvSchema,
  process.env,
  "Environment Variables",
);
