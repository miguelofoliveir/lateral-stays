export type StayCategory = "apartment" | "house" | "villa" | "cabin" | "hotel";

export type StaySort = "price_asc" | "price_desc" | "rating_desc";

export interface StayLocation {
  city: string;
  country: string;
}

export interface Stay {
  id: string;
  name: string;
  location: StayLocation;
  shortDescription: string;
  longDescription: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  images: string[];
  availableFrom: string;
  availableTo: string;
  maxGuests: number;
  category: StayCategory;
}

export interface StaySearchParams {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  guests?: string;
  sort?: StaySort;
}
