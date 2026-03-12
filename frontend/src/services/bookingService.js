/**
 * BookingService  –  Model layer
 *
 * GET   /resiflow/bookings              → array (admin=all, resident=own)
 * POST  /resiflow/bookings              → created booking
 * PATCH /resiflow/bookings/:id/approve  → updated booking (admin)
 * PATCH /resiflow/bookings/:id/reject   → updated booking (admin)
 *
 * Booking shape: { _id, facilityId: { _id, name, capacity }, userId: { name, email },
 *                  date, startTime, endTime, status: PENDING|APPROVED|REJECTED }
 */
import { API_ENDPOINTS } from "../config/api";

export class BookingService {
  static async #handleResponse(res) {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.msg || data.error || `HTTP ${res.status}`);
    return data;
  }

  static #authHeaders(token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  /** GET /resiflow/bookings */
  static async getBookings(token) {
    const res = await fetch(API_ENDPOINTS.bookings.list, {
      headers: BookingService.#authHeaders(token),
    });
    return BookingService.#handleResponse(res);
  }

  /** POST /resiflow/bookings — { facilityId, date, startTime, endTime } */
  static async createBooking(token, { facilityId, date, startTime, endTime }) {
    const res = await fetch(API_ENDPOINTS.bookings.create, {
      method: "POST",
      headers: BookingService.#authHeaders(token),
      body: JSON.stringify({ facilityId, date, startTime, endTime }),
    });
    return BookingService.#handleResponse(res);
  }

  /** PATCH /resiflow/bookings/:id/approve */
  static async approveBooking(token, id) {
    const res = await fetch(API_ENDPOINTS.bookings.approve(id), {
      method: "PATCH",
      headers: BookingService.#authHeaders(token),
    });
    return BookingService.#handleResponse(res);
  }

  /** PATCH /resiflow/bookings/:id/reject */
  static async rejectBooking(token, id) {
    const res = await fetch(API_ENDPOINTS.bookings.reject(id), {
      method: "PATCH",
      headers: BookingService.#authHeaders(token),
    });
    return BookingService.#handleResponse(res);
  }
}
