import { Link } from "react-router-dom";

import { formatCurrency, formatDate } from "../../../shared/utils/formatters";
import type { Stay } from "../../stays/types/stay.types";

interface StayHeroProps {
  stay: Stay;
}

export const StayHero = ({ stay }: StayHeroProps) => (
  <section className="space-y-6">
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
        {stay.location.city}, {stay.location.country}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{stay.name}</h1>
      <p className="max-w-3xl text-base leading-7 text-slate-600">{stay.shortDescription}</p>
    </div>

    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <img className="h-80 w-full rounded-3xl object-cover" src={stay.images[0]} alt="" />
      <img className="hidden h-80 w-full rounded-3xl object-cover md:block" src={stay.images[1]} alt="" />
    </div>

    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-4">
      <div>
        <p className="text-sm text-slate-500">Price</p>
        <p className="font-semibold text-slate-950">{formatCurrency(stay.pricePerNight)} / night</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Rating</p>
        <p className="font-semibold text-slate-950">
          {stay.rating.toFixed(1)} ({stay.reviewCount} reviews)
        </p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Availability</p>
        <p className="font-semibold text-slate-950">
          {formatDate(stay.availableFrom)} - {formatDate(stay.availableTo)}
        </p>
      </div>
      <Link
        to={`/stays/${stay.id}/checkout`}
        className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        Start checkout
      </Link>
    </div>
  </section>
);
