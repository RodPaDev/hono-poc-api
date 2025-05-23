import type { BuildSchema } from "drizzle-zod";
import type { ValidationTargets } from "hono";
import { validator } from "hono/validator";

/**
 * A middleware to validate request data using drizzle-zod generated schemas.
 * This exists because of drizzle-zod and hono's own zod-validator use different Zod versions.
 * @param target - The target to validate (e.g., "query", "body", "param").
 * @param {} schema - The Zod schema to validate against.
 * @returns A middleware function that validates the request data.
 */
export function drizzleZodValidator<
  T extends object,
  Mode extends "select" | "insert" | "update"
>(target: keyof ValidationTargets, schema: BuildSchema<Mode, T, any, any>) {
  return validator(target, (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json(
        {
          message: "Validation failed",
          errors: parsed.error.message,
        },
        400
      );
    }
    return parsed.data;
  });
}
