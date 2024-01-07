import axios, { AxiosInstance } from 'axios';

const localAPI: string = 'http://localhost:5000/api/v1';
const productionAPI = 'https://api.example.com/api/v1';

const token: string = localStorage.getItem('buildit-token');

const api: AxiosInstance = axios.create({
  baseURL: localAPI,
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  withCredentials: true,
});

export default api;