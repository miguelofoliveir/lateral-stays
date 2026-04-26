import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formatCurrency } from "../../../shared/utils/formatters";
import type { Stay } from "../../stays/types/stay.types";
import { bookingSchema, type BookingFormInput, type BookingFormValues } from "../schemas/booking.schema";

interface CheckoutFormProps {
  stay: Stay;
  isSubmitting: boolean;
  onSubmit: (values: BookingFormValues) => void;
}

export const CheckoutForm = ({ stay, isSubmitting, onSubmit }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      checkIn: "",
      checkOut: "",
      guests: 1
    }
  });

  return (
    <form
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Guest details</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Payment is mocked for this assessment. No card details are collected.
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Guest name</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          {...register("guestName")}
        />
        {errors.guestName ? <p className="mt-1 text-sm text-rose-700">{errors.guestName.message}</p> : null}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          type="email"
          {...register("guestEmail")}
        />
        {errors.guestEmail ? <p className="mt-1 text-sm text-rose-700">{errors.guestEmail.message}</p> : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Check-in</span>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
            type="date"
            {...register("checkIn")}
          />
          {errors.checkIn ? <p className="mt-1 text-sm text-rose-700">{errors.checkIn.message}</p> : null}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Check-out</span>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
            type="date"
            {...register("checkOut")}
          />
          {errors.checkOut ? <p className="mt-1 text-sm text-rose-700">{errors.checkOut.message}</p> : null}
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Guests</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          type="number"
          min="1"
          max={stay.maxGuests}
          {...register("guests")}
        />
        {errors.guests ? <p className="mt-1 text-sm text-rose-700">{errors.guests.message}</p> : null}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        {isSubmitting ? "Confirming..." : `Confirm booking from ${formatCurrency(stay.pricePerNight)} / night`}
      </button>
    </form>
  );
};
