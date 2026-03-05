// ─── Domain / Base URL ────────────────────────────────────────────────────────
// Change this one constant to point to any environment (dev, staging, prod).
export const BASE_URL = "http://localhost:3000";

// ─── Auth endpoints ───────────────────────────────────────────────────────────
export const API_ENDPOINTS = {
  auth: {
    login:            `${BASE_URL}/resiflow/auth/login`,
    registerSociety:  `${BASE_URL}/resiflow/auth/register-society`,
  },
};
