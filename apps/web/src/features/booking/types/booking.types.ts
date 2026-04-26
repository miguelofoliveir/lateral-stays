export interface Booking {
  id: string;
  stayId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "confirmed";
  createdAt: string;
}
