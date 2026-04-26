import { findStayById } from "../stays/stays.service.js";
import { HttpError } from "../../shared/utils/http-error.js";
import { parseDateOnly } from "../../shared/utils/date.js";
import { bookings } from "./bookings.mock.js";
import type { Booking, CreateBookingInput } from "./bookings.types.js";

const millisecondsPerDay = 24 * 60 * 60 * 1000;

const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = parseDateOnly(checkIn);
  const checkOutDate = parseDateOnly(checkOut);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / millisecondsPerDay);

  if (nights <= 0) {
    throw new HttpError(400, "checkOut must be after checkIn.");
  }

  return nights;
};

const validateStayAvailability = (input: CreateBookingInput, availableFrom: string, availableTo: string): void => {
  if (input.checkIn < availableFrom || input.checkOut > availableTo) {
    throw new HttpError(400, "Booking dates must be within the stay availability window.");
  }
};

export const createBooking = (input: CreateBookingInput): Booking => {
  const stay = findStayById(input.stayId);

  if (!stay) {
    throw new HttpError(404, "Stay not found.");
  }

  if (input.guests > stay.maxGuests) {
    throw new HttpError(400, "Guest count exceeds stay capacity.");
  }

  const nights = calculateNights(input.checkIn, input.checkOut);
  validateStayAvailability(input, stay.availableFrom, stay.availableTo);
  const booking: Booking = {
    id: `booking-${crypto.randomUUID()}`,
    stayId: input.stayId,
    guestName: input.guestName,
    guestEmail: input.guestEmail,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    totalPrice: nights * stay.pricePerNight,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  return booking;
};
