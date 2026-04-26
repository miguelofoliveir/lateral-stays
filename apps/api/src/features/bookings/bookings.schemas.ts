import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Date must use YYYY-MM-DD format."
});

export const createBookingSchema = z.object({
  stayId: z.string().trim().min(1),
  guestName: z.string().trim().min(2).max(100),
  guestEmail: z.email(),
  checkIn: dateSchema,
  checkOut: dateSchema,
  guests: z.number().int().positive()
});

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
