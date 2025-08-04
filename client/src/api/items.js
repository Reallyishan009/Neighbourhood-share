import apiClient from "@/lib/axios";

// Items API
export const getAllItems = async () => {
  const { data } = await apiClient.get("/items");
  return data;
};

export const getItemById = async (id) => {
  const { data } = await apiClient.get(`/items/${id}`);
  return data;
};

export const addItem = async (itemData) => {
  const { data } = await apiClient.post("/items", itemData);
  return data;
};

export const requestBorrow = async (itemId, userData) => {
  const { data } = await apiClient.post(`/items/${itemId}/request`, userData);
  return data;
};

// Bonus APIs
export const getMyRequests = async () => {
  const { data } = await apiClient.get("/my-requests");
  return data;
};

export const cancelRequest = async (requestId) => {
  const { data } = await apiClient.delete(`/my-requests/${requestId}`);
  return data;
};

export const getMapItems = async () => {
  const { data } = await apiClient.get("/map-items");
  return data;
};

export const getTrustScore = async (userId) => {
  const { data } = await apiClient.get(`/trust-score/${userId}`);
  return data;
};
