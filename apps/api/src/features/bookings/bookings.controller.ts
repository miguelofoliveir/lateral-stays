import type { RequestHandler } from "express";

import { validate } from "../../shared/utils/validate.js";
import { createBookingSchema } from "./bookings.schemas.js";
import { createBooking } from "./bookings.service.js";

export const postBooking: RequestHandler = (request, response) => {
  const input = validate(createBookingSchema, request.body);
  const booking = createBooking(input);

  response.status(201).json({
    data: booking
  });
};
