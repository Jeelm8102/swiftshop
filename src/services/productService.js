import axiosInstance from "../api/axiosInstance";

export const getProducts = async (limit = 12, skip = 0) => {
  const response = await axiosInstance.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/products/categories");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axiosInstance.get(`/products/category/${category}`);
  return response.data;
};