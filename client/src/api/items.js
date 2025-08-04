import apiClient from "@/lib/axios";

export const getAllItems = async () => {
  try {
    const response = await apiClient.get("/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await apiClient.post("/items", itemData);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const requestBorrow = async (itemId, userData) => {
  try {
    const response = await apiClient.post(`/items/${itemId}/request`, userData);
    return response.data;
  } catch (error) {
    console.error("Error requesting item:", error);
    throw error;
  }
};
