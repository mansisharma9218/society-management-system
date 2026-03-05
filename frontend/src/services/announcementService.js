import { API_ENDPOINTS } from "../config/api";

export class AnnouncementService {
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

  /** GET /resiflow/announcements — all authenticated users */
  static async getAnnouncements(token) {
    const res = await fetch(API_ENDPOINTS.announcements.list, {
      headers: AnnouncementService.#authHeaders(token),
    });
    return AnnouncementService.#handleResponse(res);
  }

  /** POST /resiflow/announcements — admin only */
  static async createAnnouncement(token, { title, message, expiryDate }) {
    const res = await fetch(API_ENDPOINTS.announcements.create, {
      method: "POST",
      headers: AnnouncementService.#authHeaders(token),
      body: JSON.stringify({ title, message, expiryDate }),
    });
    return AnnouncementService.#handleResponse(res);
  }
}
