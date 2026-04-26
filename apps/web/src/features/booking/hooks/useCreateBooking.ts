import { useMutation } from "@tanstack/react-query";

import { postJson, type ApiResponse } from "../../../shared/api/http-client";
import type { CreateBookingInput } from "../schemas/booking.schema";
import type { Booking } from "../types/booking.types";

export const useCreateBooking = () =>
  useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      const response = await postJson<ApiResponse<Booking>, CreateBookingInput>("/bookings", input);

      return response.data;
    }
  });
