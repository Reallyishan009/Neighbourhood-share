import apiClient from "@/lib/axios";

export const getAllItems = async () => {
  try {
    const response = await apiClient.get("/items");
    return response.data;
  } catch (error) {
    console.error(error); // log actual error object for better debugging
    throw error;          // use semicolon here, not comma
  }
};
