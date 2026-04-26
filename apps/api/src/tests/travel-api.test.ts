import request from "supertest";

import { app } from "../app.js";

describe("Travel API", () => {
  it("returns a JSON 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route").expect(404);

    expect(response.body).toEqual({
      error: {
        message: "Route not found."
      }
    });
  });

  describe("GET /stays", () => {
    it("returns a list of stays", async () => {
      const response = await request(app).get("/stays").expect(200);

      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "stay-lisbon-riverside-loft",
            name: "Riverside Loft in Alfama",
            pricePerNight: 148
          })
        ])
      );
    });

    it("supports search, filters and sorting", async () => {
      const response = await request(app)
        .get("/stays")
        .query({
          query: "lisbon",
          minPrice: 100,
          maxPrice: 200,
          guests: 2,
          sort: "price_asc"
        })
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toEqual(
        expect.objectContaining({
          id: "stay-lisbon-riverside-loft"
        })
      );
    });
  });

  describe("GET /stays/:id", () => {
    it("returns stay details", async () => {
      const response = await request(app).get("/stays/stay-kyoto-wooden-machiya").expect(200);

      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: "stay-kyoto-wooden-machiya",
          location: {
            city: "Kyoto",
            country: "Japan"
          },
          maxGuests: 4
        })
      );
    });

    it("returns 404 when the stay does not exist", async () => {
      const response = await request(app).get("/stays/unknown-stay").expect(404);

      expect(response.body.error.message).toBe("Stay not found.");
    });
  });

  describe("GET /stays/:id/reviews", () => {
    it("returns reviews for an existing stay", async () => {
      const response = await request(app)
        .get("/stays/stay-lisbon-riverside-loft/reviews")
        .expect(200);

      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            stayId: "stay-lisbon-riverside-loft",
            rating: 5
          })
        ])
      );
    });
  });

  describe("POST /stays/:id/reviews", () => {
    it("creates a review", async () => {
      const response = await request(app)
        .post("/stays/stay-barcelona-garden-house/reviews")
        .send({
          author: "Nina Patel",
          rating: 5,
          comment: "Excellent base for exploring the city with a quiet place to unwind."
        })
        .expect(201);

      expect(response.body.data).toEqual(
        expect.objectContaining({
          stayId: "stay-barcelona-garden-house",
          author: "Nina Patel",
          rating: 5
        })
      );
      expect(response.body.data.id).toEqual(expect.stringMatching(/^review-/));
    });

    it("validates an invalid review body", async () => {
      const response = await request(app)
        .post("/stays/stay-barcelona-garden-house/reviews")
        .send({
          author: "N",
          rating: 6,
          comment: "Too short"
        })
        .expect(400);

      expect(response.body.error.message).toBe("Invalid request payload.");
    });
  });

  describe("POST /bookings", () => {
    it("creates a confirmed booking with calculated total price", async () => {
      const response = await request(app)
        .post("/bookings")
        .send({
          stayId: "stay-lisbon-riverside-loft",
          guestName: "Jordan Lee",
          guestEmail: "jordan@example.com",
          checkIn: "2026-06-10",
          checkOut: "2026-06-13",
          guests: 2
        })
        .expect(201);

      expect(response.body.data).toEqual(
        expect.objectContaining({
          stayId: "stay-lisbon-riverside-loft",
          guestName: "Jordan Lee",
          status: "confirmed",
          totalPrice: 444
        })
      );
      expect(response.body.data.id).toEqual(expect.stringMatching(/^booking-/));
    });

    it("validates check-out after check-in", async () => {
      const response = await request(app)
        .post("/bookings")
        .send({
          stayId: "stay-lisbon-riverside-loft",
          guestName: "Jordan Lee",
          guestEmail: "jordan@example.com",
          checkIn: "2026-06-13",
          checkOut: "2026-06-10",
          guests: 2
        })
        .expect(400);

      expect(response.body.error.message).toBe("checkOut must be after checkIn.");
    });

    it("rejects invalid calendar dates", async () => {
      const response = await request(app)
        .post("/bookings")
        .send({
          stayId: "stay-lisbon-riverside-loft",
          guestName: "Jordan Lee",
          guestEmail: "jordan@example.com",
          checkIn: "2026-02-31",
          checkOut: "2026-03-03",
          guests: 2
        })
        .expect(400);

      expect(response.body.error.message).toBe("Invalid booking dates.");
    });

    it("validates stay availability", async () => {
      const response = await request(app)
        .post("/bookings")
        .send({
          stayId: "stay-lisbon-riverside-loft",
          guestName: "Jordan Lee",
          guestEmail: "jordan@example.com",
          checkIn: "2026-11-01",
          checkOut: "2026-11-05",
          guests: 2
        })
        .expect(400);

      expect(response.body.error.message).toBe("Booking dates must be within the stay availability window.");
    });

    it("validates stay capacity", async () => {
      const response = await request(app)
        .post("/bookings")
        .send({
          stayId: "stay-reykjavik-northern-cabin",
          guestName: "Casey Morgan",
          guestEmail: "casey@example.com",
          checkIn: "2026-10-01",
          checkOut: "2026-10-05",
          guests: 4
        })
        .expect(400);

      expect(response.body.error.message).toBe("Guest count exceeds stay capacity.");
    });
  });
});
