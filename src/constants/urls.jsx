const API_BASE_URL = "https://20.239.224.236:8080";
const WS_BASE_URL = "https://20.239.224.236:8050";

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

