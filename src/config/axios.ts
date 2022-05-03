import axios from "axios";

const petsApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});

petsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default petsApi;
