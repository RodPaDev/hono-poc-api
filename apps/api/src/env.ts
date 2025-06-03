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
  BETTER_AUTH_SECRET: z.string().nonempty("BETTER_AUTH_SECRET is required"),
  RESEND_API_KEY: z.string().nonempty("RESEND_API_KEY is required"),
  ALLOWED_ORIGINS: z
    .string()
    .nonempty("ALLOWED_ORIGINS is required")
    .transform((val) => val.split(",").map((url) => url.trim()))
    .refine((origins) => origins.length > 0 && origins.every((url) => url), {
      message:
        "Required string with URLs separated by commas, e.g. 'http://localhost:5173,http://localhost:3000'",
    }),
});

export const Env: z.infer<typeof EnvSchema> = prettySyncParse(
  EnvSchema,
  process.env,
  "Environment Variables",
);
