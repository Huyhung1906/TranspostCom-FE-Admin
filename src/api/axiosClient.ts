import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("accesstoken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Ví dụ: redirect login hoặc logout
      console.log("Unauthorized! Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
