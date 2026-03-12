/**
 * PaymentService  –  Model layer
 *
 * GET  /resiflow/payments/key              → { key: RAZORPAY_KEY_ID }
 * POST /resiflow/payments/create-order/:id → { orderId, amount (paise), currency, paymentId }
 * POST /resiflow/payments/verify           → { success, msg, payment }
 * GET  /resiflow/payments                  → Payment[] (admin=all, resident=own)
 */
import { API_ENDPOINTS } from "../config/api";

export class PaymentService {
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

  /** GET /resiflow/payments/key */
  static async getKey(token) {
    const res = await fetch(API_ENDPOINTS.payments.key, {
      headers: PaymentService.#authHeaders(token),
    });
    return PaymentService.#handleResponse(res); // { key }
  }

  /**
   * POST /resiflow/payments/create-order/:billId
   * Returns { orderId, amount (paise), currency, paymentId }
   */
  static async createOrder(token, billId) {
    const res = await fetch(API_ENDPOINTS.payments.createOrder(billId), {
      method: "POST",
      headers: PaymentService.#authHeaders(token),
    });
    return PaymentService.#handleResponse(res);
  }

  /**
   * POST /resiflow/payments/verify
   * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   */
  static async verifyPayment(token, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    const res = await fetch(API_ENDPOINTS.payments.verify, {
      method: "POST",
      headers: PaymentService.#authHeaders(token),
      body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
    });
    return PaymentService.#handleResponse(res);
  }

  /** GET /resiflow/payments */
  static async getPayments(token) {
    const res = await fetch(API_ENDPOINTS.payments.list, {
      headers: PaymentService.#authHeaders(token),
    });
    return PaymentService.#handleResponse(res);
  }
}
