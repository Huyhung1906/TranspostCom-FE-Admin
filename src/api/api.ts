import axiosClient from "./axiosClient";
import { AxiosResponse } from "axios";

interface Params {
  [key: string]: any;
}

const api = {
  get<T>(url: string, params?: Params): Promise<AxiosResponse<T>> {
    return axiosClient.get<T>(url, { params });
  },
  post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return axiosClient.post<T>(url, data);
  },
  put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return axiosClient.put<T>(url, data);
  },
  delete<T>(url: string, params?: Params): Promise<AxiosResponse<T>> {
    return axiosClient.delete<T>(url, { params });
  },
};

export default api;
