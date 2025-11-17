const API_BASE_URL = "https://api.zonion.fun";
const WS_BASE_URL = "http://proj.zonion.fun";

export const API_URLS = {
  authTest: `${API_BASE_URL}/auth/auth/jwt/test`,
  adminGate: `${API_BASE_URL}/admin/dashboard/admin`,
  adminSalesReport: `${API_BASE_URL}/auth/admin/dashboard/sales-report`,
  updateFcmToken: `${API_BASE_URL}/auth/auth/update-fcm-token`,
};

export const SOCKET_URLS = {
  call: `${WS_BASE_URL}/ws`,
};

export const BASE_URLS = {
  api: API_BASE_URL,
  ws: WS_BASE_URL,
};

