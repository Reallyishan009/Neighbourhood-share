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
  timeout: 15_000, // Increased timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default apiClient;
