import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'https://api.example.com'

export const loginUser = async (username: string, password: string) => {
  return await axios.post(`${API}/login`, { username, password })
}