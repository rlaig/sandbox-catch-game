import axios from 'axios'

export const apiClient = axios.create({
  baseURL: String(import.meta.env.VITE_APP_API_BASE_URL || ''),
})