import type { Review } from "./reviews.types.js";

export const reviews: Review[] = [
  {
    id: "review-lisbon-1",
    stayId: "stay-lisbon-riverside-loft",
    author: "Maya Chen",
    rating: 5,
    comment: "Beautiful location, easy check-in and a very comfortable space for remote work.",
    createdAt: "2026-02-12T10:30:00.000Z"
  },
  {
    id: "review-lisbon-2",
    stayId: "stay-lisbon-riverside-loft",
    author: "Jon Bell",
    rating: 4,
    comment: "Great river views and close to restaurants. The stairs are worth noting.",
    createdAt: "2026-03-03T14:15:00.000Z"
  },
  {
    id: "review-kyoto-1",
    stayId: "stay-kyoto-wooden-machiya",
    author: "Sofia Ramos",
    rating: 5,
    comment: "Quiet, thoughtful and close to excellent food. The garden was a highlight.",
    createdAt: "2026-01-28T08:45:00.000Z"
  },
  {
    id: "review-tulum-1",
    stayId: "stay-tulum-beach-villa",
    author: "Alex Turner",
    rating: 5,
    comment: "Perfect for a group trip. The outdoor space made the stay feel special.",
    createdAt: "2026-03-18T19:20:00.000Z"
  }
];
