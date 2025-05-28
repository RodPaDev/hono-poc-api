import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HTTPResponseError } from "hono/types";
import type { ContentfulStatusCode } from "hono/utils/http-status";

class BaseAppError extends HTTPException {
  constructor(status: ContentfulStatusCode, message: string) {
    super(status, { message });
  }
}

export const AppError = {
  BadRequest: class extends BaseAppError {
    constructor(message: string = "Bad Request") {
      super(400, message);
    }
  },
  Unauthorized: class extends BaseAppError {
    constructor(message: string = "Unauthorized") {
      super(401, message);
    }
  },
  Forbidden: class extends BaseAppError {
    constructor(message: string = "Forbidden") {
      super(403, message);
    }
  },
  NotFound: class extends BaseAppError {
    constructor(message: string = "Not Found") {
      super(404, message);
    }
  },
  Conflict: class extends BaseAppError {
    constructor(message: string = "Conflict") {
      super(409, message);
    }
  },
  UnprocessableEntity: class extends BaseAppError {
    constructor(message: string = "Unprocessable Entity") {
      super(422, message);
    }
  },
  TooManyRequests: class extends BaseAppError {
    constructor(message: string = "Too Many Requests") {
      super(429, message);
    }
  },
  NotImplemented: class extends BaseAppError {
    constructor(message: string = "Not Implemented") {
      super(501, message);
    }
  },
  ServiceUnavailable: class extends BaseAppError {
    constructor(message: string = "Service Unavailable") {
      super(503, message);
    }
  },
} as const;

export function GlobalErrorHandler(
  err: Error | HTTPResponseError,
  c: Context,
): Response {
  if (err instanceof BaseAppError) {
    return c.json({ error: err.message }, err.status);
  }

  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  return c.json({ error: "Internal Server Error" }, 500);
}
