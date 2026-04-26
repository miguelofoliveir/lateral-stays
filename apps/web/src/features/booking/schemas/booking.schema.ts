import { z } from "zod";

export const bookingSchema = z
  .object({
    guestName: z.string().trim().min(2, "Enter the guest name.").max(100, "Name is too long."),
    guestEmail: z.email("Enter a valid email."),
    checkIn: z.string().min(1, "Choose a check-in date."),
    checkOut: z.string().min(1, "Choose a check-out date."),
    guests: z.coerce.number().int().positive("Guests must be at least 1.")
  })
  .refine((value) => !value.checkIn || !value.checkOut || value.checkOut > value.checkIn, {
    message: "Check-out must be after check-in.",
    path: ["checkOut"]
  });

export type BookingFormInput = z.input<typeof bookingSchema>;
export type BookingFormValues = z.output<typeof bookingSchema>;

export type CreateBookingInput = BookingFormValues & {
  stayId: string;
};
