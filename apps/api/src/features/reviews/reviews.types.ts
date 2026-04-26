export interface Review {
  id: string;
  stayId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewInput {
  author: string;
  rating: number;
  comment: string;
}
