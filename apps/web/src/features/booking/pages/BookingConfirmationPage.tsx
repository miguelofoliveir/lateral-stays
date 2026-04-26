import { Link, useLocation, useParams } from "react-router-dom";

import { formatCurrency } from "../../../shared/utils/formatters";
import type { Booking } from "../types/booking.types";

interface BookingLocationState {
  booking?: Booking;
}

export const BookingConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as BookingLocationState | null;
  const booking = state?.booking;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-10 sm:px-8">
      <section className="w-full rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Confirmed</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Your booking is confirmed.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Booking reference <span className="font-semibold">{booking?.id ?? id}</span>
        </p>
        {booking ? (
          <dl className="mx-auto mt-6 grid max-w-md gap-3 rounded-2xl bg-white p-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Status</dt>
              <dd className="font-semibold text-slate-950">{booking.status}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Total</dt>
              <dd className="font-semibold text-slate-950">{formatCurrency(booking.totalPrice)}</dd>
            </div>
          </dl>
        ) : null}
        <Link
          to="/stays"
          className="mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Back to stays
        </Link>
      </section>
    </main>
  );
};
