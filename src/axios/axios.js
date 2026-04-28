import axios from 'axios';

const api = axios.create({
  baseURL: 'https://registerapi.ytgaa.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const login = (credentials) => api.post('/login', credentials);
export const register = (data) => api.post('/register', data);

// REGISTRATIONS
export const getRegistrations = (page = 1) => api.get(`/registrations?page=${page}`);

export default api;
