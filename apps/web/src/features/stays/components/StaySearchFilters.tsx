import type { FormEvent } from "react";

import type { StaySearchParams, StaySort } from "../types/stay.types";

interface StaySearchFiltersProps {
  filters: StaySearchParams;
  onChange: (filters: StaySearchParams) => void;
}

export const StaySearchFilters = ({ filters, onChange }: StaySearchFiltersProps) => {
  const updateFilter = (key: keyof StaySearchParams, value: string): void => {
    onChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <form
      className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-6"
      onSubmit={handleSubmit}
      aria-label="Search and filter stays"
    >
      <label className="md:col-span-2">
        <span className="text-sm font-medium text-slate-700">Search</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          value={filters.query ?? ""}
          onChange={(event) => updateFilter("query", event.target.value)}
          placeholder="City, country or stay name"
        />
      </label>

      <label>
        <span className="text-sm font-medium text-slate-700">Min price</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          type="number"
          min="0"
          value={filters.minPrice ?? ""}
          onChange={(event) => updateFilter("minPrice", event.target.value)}
          placeholder="100"
        />
      </label>

      <label>
        <span className="text-sm font-medium text-slate-700">Max price</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          type="number"
          min="0"
          value={filters.maxPrice ?? ""}
          onChange={(event) => updateFilter("maxPrice", event.target.value)}
          placeholder="300"
        />
      </label>

      <label>
        <span className="text-sm font-medium text-slate-700">Guests</span>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          type="number"
          min="1"
          value={filters.guests ?? ""}
          onChange={(event) => updateFilter("guests", event.target.value)}
          placeholder="2"
        />
      </label>

      <label>
        <span className="text-sm font-medium text-slate-700">Sort</span>
        <select
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
          value={filters.sort ?? ""}
          onChange={(event) => updateFilter("sort", event.target.value as StaySort | "")}
        >
          <option value="">Recommended</option>
          <option value="price_asc">Price low to high</option>
          <option value="price_desc">Price high to low</option>
          <option value="rating_desc">Top rated</option>
        </select>
      </label>
    </form>
  );
};
