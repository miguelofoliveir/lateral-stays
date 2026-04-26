import type { ZodType } from "zod";

import { HttpError } from "./http-error.js";

export const validate = <TValue>(schema: ZodType<TValue>, value: unknown): TValue => {
  const result = schema.safeParse(value);

  if (!result.success) {
    const details = result.error.issues.map((issue) => {
      const path = issue.path.join(".");

      return path ? `${path}: ${issue.message}` : issue.message;
    });

    throw new HttpError(400, "Invalid request payload.", details);
  }

  return result.data;
};
