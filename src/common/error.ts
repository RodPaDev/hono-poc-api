import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { HTTPResponseError } from "hono/types";

export const ClientError = {
  BadRequest: new HTTPException(400, {
    message: "Bad Request",
  }),
  Unauthorized: new HTTPException(401, {
    message: "Unauthorized",
  }),
  Forbidden: new HTTPException(403, {
    message: "Forbidden",
  }),
  NotFound: new HTTPException(404, {
    message: "Not Found",
  }),
  Conflict: new HTTPException(409, {
    message: "Conflict",
  }),
  UnprocessableEntity: new HTTPException(422, {
    message: "Unprocessable Entity",
  }),
  TooManyRequests: new HTTPException(429, {
    message: "Too Many Requests",
  }),

  InternalServerError: new HTTPException(500, {
    message: "Internal Server Error",
  }),
  NotImplemented: new HTTPException(501, {
    message: "Not Implemented",
  }),
  ServiceUnavailable: new HTTPException(503, {
    message: "Service Unavailable",
  }),
} as const satisfies Record<string, HTTPException>;

export function GlobalErrorHandler(err: Error | HTTPResponseError, c: Context) {
  console.error(err);
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }
  return c.json({ message: ClientError.InternalServerError }, 500);
}
