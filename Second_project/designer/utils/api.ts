// import axios, { AxiosInstance } from 'axios';
//
// const localAPI: string = 'http://localhost:5000/api/v1';
// const productionAPI = 'https://api.example.com/api/v1';
//
// // const token: string = localStorage.getItem('buildit-token');
//
// const api: AxiosInstance = axios.create({
//   baseURL: localAPI,
//   headers: {
//     'Authorization': `Bearer ${token}`,
//   },
//   withCredentials: true,
// });
//
// export default api;

import useSWRMutation from 'swr/mutation';

// Adjusted fetcher function to handle all request types
const fetcher = (url, { method, data, headers = {} }) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method !== 'GET' ? JSON.stringify(data) : null,
    credentials: 'include',
  }).then((res) => res.json());
};

// Updated function to handle all types of requests
const useApiSWRMutation = (path, method, options = {}) => {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:5000/api/v1';

  return useSWRMutation(
    `${path}`,
    // (url, data) => fetcher(`${baseURL}${url}`, { method, data }),
    (url, data) => fetcher(`${url}`, { method, data }),
    options
  );
};

export default useApiSWRMutation;
