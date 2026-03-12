/**
 * MaintenanceBillService  –  Model layer
 *
 * GET  /resiflow/billing/my       → Bill[] for the resident's flat
 * GET  /resiflow/billing/all      → Bill[] for the whole society (admin)
 * POST /resiflow/billing/generate → { msg, bills[], skipped[] }
 *
 * Bill shape (populated):
 *   { _id, societyId, flatId: { _id, block, flatNumber, areaSqFt },
 *     month (1-12), year, amount, dueDate, status: "UNPAID"|"PAID" }
 */
import { API_ENDPOINTS } from "../config/api";

export class MaintenanceBillService {
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

  /** GET /resiflow/billing/my — resident: bills for their flat */
  static async getMyBills(token) {
    const res = await fetch(API_ENDPOINTS.billing.my, {
      headers: MaintenanceBillService.#authHeaders(token),
    });
    return MaintenanceBillService.#handleResponse(res);
  }

  /** GET /resiflow/billing/all — admin: all society bills */
  static async getAllBills(token) {
    const res = await fetch(API_ENDPOINTS.billing.all, {
      headers: MaintenanceBillService.#authHeaders(token),
    });
    return MaintenanceBillService.#handleResponse(res);
  }

  /**
   * POST /resiflow/billing/generate — admin only
   * @param {string} token
   * @param {{ month: number, year: number }} params  — month is 1-based (1=Jan)
   */
  static async generateBills(token, { month, year }) {
    const res = await fetch(API_ENDPOINTS.billing.generate, {
      method: "POST",
      headers: MaintenanceBillService.#authHeaders(token),
      body: JSON.stringify({ month, year }),
    });
    return MaintenanceBillService.#handleResponse(res);
  }
}
