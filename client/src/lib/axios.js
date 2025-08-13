// client/src/lib/axios.js
import axios from "axios";

/**
 * Pre-configured Axios instance for all API calls.
 * Change the baseURL only if your backend runs on a different host/port.
 */
const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://neighbourhood-backend-theta.vercel.app/api" 
    : "http://localhost:5000/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
