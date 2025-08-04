// client/src/lib/axios.js
import axios from "axios";

/**
 * Pre-configured Axios instance for all API calls.
 * Change the baseURL only if your backend runs on a different host/port.
 */
const apiClient = axios.create({
  baseURL: "http://localhost:500/api", // ⬅️ use http, port 500
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
