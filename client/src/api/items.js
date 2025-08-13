import apiClient from "@/lib/axios";

// Items API with comprehensive fallback
export const getAllItems = async () => {
  try {
    const { data } = await apiClient.get("/items");
    return data;
  } catch (error) {
    console.error('Primary items endpoint failed, trying fallback:', error);
    
    // Try the simple endpoint as fallback
    try {
      const { data } = await apiClient.get("/items/simple");
      return data;
    } catch (fallbackError) {
      console.error('All API endpoints failed:', fallbackError);
      // Always throw to let components handle with their own dummy data
      throw fallbackError;
    }
  }
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
  try {
    const { data } = await apiClient.get("/my-requests");
    return data;
  } catch (error) {
    console.error('My requests endpoint failed:', error);
    throw error; // Let components handle with dummy data
  }
};

export const cancelRequest = async (requestId) => {
  const { data } = await apiClient.delete(`/my-requests/${requestId}`);
  return data;
};

export const getMapItems = async () => {
  try {
    const { data } = await apiClient.get("/map-items");
    return data;
  } catch (error) {
    console.error('Map items endpoint failed:', error);
    throw error; // Let components handle with dummy data
  }
};

export const getTrustScore = async (userId) => {
  try {
    const { data } = await apiClient.get(`/trust-score/${userId}`);
    return data;
  } catch (error) {
    console.error('Trust score endpoint failed:', error);
    throw error; // Let components handle with dummy data
  }
};
