import type { z, ZodError, ZodSchema } from "zod";

export function prettifyZodError(error: ZodError): string {
  if (error instanceof Error && "issues" in error) {
    return error.issues
      .map((issue) => {
        const path = issue.path.length ? ` at ${issue.path.join(".")}` : "";
        return `- [${issue.code}]: ${issue.message}${path}`;
      })
      .join("\n");
  }
  return error || "Unknown error occurred";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prettySyncParse<TSchema extends ZodSchema<any>>(
  schema: TSchema,
  data: unknown,
  sourceName = "Input",
): z.infer<TSchema> {
  const parseResult = schema.safeParse(data);

  if (!parseResult.success) {
    const error = new Error(
      `${sourceName} validation failed:\n${prettifyZodError(
        parseResult.error,
      )}`,
    );
    Error.captureStackTrace?.(error, prettySyncParse);
    throw error;
  }

  return parseResult.data;
}
