import { stays } from "./stays.mock.js";
import type { Stay, StaySearchParams } from "./stays.types.js";

export const listStays = (params: StaySearchParams): Stay[] => {
  const filteredStays = stays.filter((stay) => {
    const matchesQuery =
      !params.query ||
      [stay.name, stay.location.city, stay.location.country]
        .join(" ")
        .toLowerCase()
        .includes(params.query.toLowerCase());
    const matchesMinPrice = params.minPrice === undefined || stay.pricePerNight >= params.minPrice;
    const matchesMaxPrice = params.maxPrice === undefined || stay.pricePerNight <= params.maxPrice;
    const matchesGuests = params.guests === undefined || stay.maxGuests >= params.guests;

    return matchesQuery && matchesMinPrice && matchesMaxPrice && matchesGuests;
  });

  return [...filteredStays].sort((firstStay, secondStay) => {
    if (params.sort === "price_asc") {
      return firstStay.pricePerNight - secondStay.pricePerNight;
    }

    if (params.sort === "price_desc") {
      return secondStay.pricePerNight - firstStay.pricePerNight;
    }

    if (params.sort === "rating_desc") {
      return secondStay.rating - firstStay.rating;
    }

    return 0;
  });
};

export const findStayById = (stayId: string): Stay | undefined =>
  stays.find((stay) => stay.id === stayId);

export const updateStayReviewStats = (stayId: string, rating: number): Stay | undefined => {
  const stay = findStayById(stayId);

  if (!stay) {
    return undefined;
  }

  const currentRatingTotal = stay.rating * stay.reviewCount;
  stay.reviewCount += 1;
  stay.rating = Number(((currentRatingTotal + rating) / stay.reviewCount).toFixed(2));

  return stay;
};
