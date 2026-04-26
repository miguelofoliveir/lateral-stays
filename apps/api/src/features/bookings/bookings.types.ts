export type BookingStatus = "confirmed";

export interface Booking {
  id: string;
  stayId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingInput {
  stayId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
