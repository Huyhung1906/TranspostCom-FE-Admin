import api from "../api";

import axios from '../axiosClient'; // file axios đã config baseURL

interface LoginParams {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  fullname: string;
  phone: number;
  role: string | null;
  email: string;
  is_active: boolean;
}

interface LoginResponse {
  message: string;
  status: number;
  data: {
    user: User;
    access_token: string;
  }
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('/user/login/', params);
  return response.data;
};
