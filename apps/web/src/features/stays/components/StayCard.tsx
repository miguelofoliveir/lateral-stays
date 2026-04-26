import { Link } from "react-router-dom";

import { formatCurrency } from "../../../shared/utils/formatters";
import type { Stay } from "../types/stay.types";

interface StayCardProps {
  stay: Stay;
}

export const StayCard = ({ stay }: StayCardProps) => (
  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <img
      className="h-52 w-full object-cover"
      src={stay.images[0]}
      alt={`${stay.name} in ${stay.location.city}, ${stay.location.country}`}
    />
    <div className="space-y-4 p-5">
      <div>
        <p className="text-sm text-slate-500">
          {stay.location.city}, {stay.location.country}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-950">{stay.name}</h2>
      </div>
      <p className="text-sm leading-6 text-slate-600">{stay.shortDescription}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-950">
          {formatCurrency(stay.pricePerNight)} <span className="font-normal text-slate-500">/ night</span>
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-800">
          {stay.rating.toFixed(1)} rating
        </span>
      </div>
      <Link
        to={`/stays/${stay.id}`}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        View details
      </Link>
    </div>
  </article>
);
