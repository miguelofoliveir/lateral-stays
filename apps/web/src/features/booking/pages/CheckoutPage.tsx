import { useNavigate, useParams } from "react-router-dom";

import { PageState } from "../../../shared/components/PageState";
import { formatCurrency } from "../../../shared/utils/formatters";
import { useStayDetails } from "../../stay-details/hooks/useStayDetails";
import { CheckoutForm } from "../components/CheckoutForm";
import { useCreateBooking } from "../hooks/useCreateBooking";
import type { BookingFormValues } from "../schemas/booking.schema";

export const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stayQuery = useStayDetails(id ?? "");
  const createBookingMutation = useCreateBooking();

  const handleSubmit = (values: BookingFormValues): void => {
    if (!id) {
      return;
    }

    createBookingMutation.mutate(
      {
        ...values,
        stayId: id
      },
      {
        onSuccess: (booking) => {
          navigate(`/booking-confirmation/${booking.id}`, { state: { booking } });
        }
      }
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-10">
      {stayQuery.isPending ? (
        <PageState title="Loading checkout" description="Preparing your booking form." />
      ) : null}
      {stayQuery.isError ? (
        <PageState title="Stay not found" description="Return to stays and choose another option." />
      ) : null}
      {stayQuery.isSuccess ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <img
              className="h-56 w-full rounded-2xl object-cover"
              src={stayQuery.data.images[0]}
              alt={`${stayQuery.data.name} in ${stayQuery.data.location.city}, ${stayQuery.data.location.country}`}
            />
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{stayQuery.data.name}</h1>
            <p className="mt-2 text-sm text-slate-600">
              {stayQuery.data.location.city}, {stayQuery.data.location.country}
            </p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Nightly price</dt>
                <dd className="font-semibold text-slate-950">
                  {formatCurrency(stayQuery.data.pricePerNight)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Max guests</dt>
                <dd className="font-semibold text-slate-950">{stayQuery.data.maxGuests}</dd>
              </div>
            </dl>
          </aside>
          <div>
            {createBookingMutation.isError ? (
              <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                We could not confirm this booking. Check the dates and guest count.
              </div>
            ) : null}
            <CheckoutForm
              stay={stayQuery.data}
              isSubmitting={createBookingMutation.isPending}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
};
