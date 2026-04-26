import { findStayById } from "../stays/stays.service.js";
import { HttpError } from "../../shared/utils/http-error.js";
import { bookings } from "./bookings.mock.js";
import type { Booking, CreateBookingInput } from "./bookings.types.js";

const millisecondsPerDay = 24 * 60 * 60 * 1000;

const parseDate = (value: string): Date => {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new HttpError(400, "Invalid booking dates.");
  }

  return date;
};

const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = parseDate(checkIn);
  const checkOutDate = parseDate(checkOut);
  const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / millisecondsPerDay);

  if (nights <= 0) {
    throw new HttpError(400, "checkOut must be after checkIn.");
  }

  return nights;
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
