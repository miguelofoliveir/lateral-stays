import { HttpError } from "./http-error.js";

export const parseDateOnly = (value: string): Date => {
  const date = new Date(`${value}T00:00:00.000Z`);
  const roundTrippedDate = date.toISOString().slice(0, 10);

  if (Number.isNaN(date.getTime()) || roundTrippedDate !== value) {
    throw new HttpError(400, "Invalid booking dates.");
  }

  return date;
};
