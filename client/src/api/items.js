import apiClient from "@/lib/axios";

// Items API with fallback
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
      console.error('Fallback endpoint also failed:', fallbackError);
      
      // If both fail, try to return mock data for development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock data due to API failure');
        return [
          {
            id: "itm001",
            name: "Cordless Drill",
            description: "18V cordless drill, lightly used.",
            category: "Tools",
            owner: "Alice Johnson",
            condition: "Good",
            available: true,
            image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
            borrowedBy: null
          }
        ];
      }
      
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
