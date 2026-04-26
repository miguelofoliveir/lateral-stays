import type { Stay } from "./stays.types.js";

export const stays: Stay[] = [
  {
    id: "stay-lisbon-riverside-loft",
    name: "Riverside Loft in Alfama",
    location: {
      city: "Lisbon",
      country: "Portugal"
    },
    shortDescription: "Bright loft near the Tagus river and historic tram lines.",
    longDescription:
      "A calm, design-led loft in Alfama with river views, a compact kitchen and easy access to restaurants, viewpoints and public transport.",
    pricePerNight: 148,
    rating: 4.8,
    reviewCount: 42,
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "River view"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ],
    availableFrom: "2026-05-01",
    availableTo: "2026-10-31",
    maxGuests: 3,
    category: "apartment"
  },
  {
    id: "stay-barcelona-garden-house",
    name: "Garden House near Gracia",
    location: {
      city: "Barcelona",
      country: "Spain"
    },
    shortDescription: "Family-friendly house with patio close to cafes and parks.",
    longDescription:
      "A spacious home with a private patio, dedicated workspace and quick metro access to central Barcelona and the beach.",
    pricePerNight: 212,
    rating: 4.7,
    reviewCount: 31,
    amenities: ["Wi-Fi", "Washer", "Patio", "Workspace"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    availableFrom: "2026-04-15",
    availableTo: "2026-09-30",
    maxGuests: 5,
    category: "house"
  },
  {
    id: "stay-kyoto-wooden-machiya",
    name: "Restored Wooden Machiya",
    location: {
      city: "Kyoto",
      country: "Japan"
    },
    shortDescription: "Traditional stay with modern comforts in a quiet lane.",
    longDescription:
      "A restored machiya with tatami rooms, a small garden and walkable access to temples, tea houses and local markets.",
    pricePerNight: 275,
    rating: 4.9,
    reviewCount: 56,
    amenities: ["Wi-Fi", "Garden", "Bathtub", "Kitchenette"],
    images: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186"
    ],
    availableFrom: "2026-06-01",
    availableTo: "2026-12-15",
    maxGuests: 4,
    category: "house"
  },
  {
    id: "stay-reykjavik-northern-cabin",
    name: "Northern Lights Cabin",
    location: {
      city: "Reykjavik",
      country: "Iceland"
    },
    shortDescription: "Minimal cabin outside the city with wide-open sky views.",
    longDescription:
      "A warm cabin built for slow travel, featuring panoramic windows, a compact kitchen and an easy route to day trips around Iceland.",
    pricePerNight: 320,
    rating: 4.6,
    reviewCount: 24,
    amenities: ["Wi-Fi", "Heating", "Parking", "Mountain view"],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    ],
    availableFrom: "2026-09-01",
    availableTo: "2027-03-31",
    maxGuests: 2,
    category: "cabin"
  },
  {
    id: "stay-tulum-beach-villa",
    name: "Beachfront Villa in Tulum",
    location: {
      city: "Tulum",
      country: "Mexico"
    },
    shortDescription: "Private villa steps from the beach with a plunge pool.",
    longDescription:
      "A relaxed beachfront villa with outdoor dining, a plunge pool and room for a small group looking for a quiet coastal escape.",
    pricePerNight: 410,
    rating: 4.85,
    reviewCount: 38,
    amenities: ["Pool", "Beach access", "Wi-Fi", "Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    ],
    availableFrom: "2026-05-20",
    availableTo: "2026-11-20",
    maxGuests: 6,
    category: "villa"
  }
];
