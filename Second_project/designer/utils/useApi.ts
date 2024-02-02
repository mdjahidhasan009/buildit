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

// import useSWRMutation from 'swr/mutation';
//
// // Adjusted fetcher function to handle all request types
// const fetcher = (url, { method, data, headers = {} }) => {
//   return fetch(url, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...headers,
//     },
//     body: method !== 'GET' ? JSON.stringify(data) : null,
//     credentials: 'include',
//   }).then((res) => res.json());
// };
//
// // Updated function to handle all types of requests
// const useApiSWRMutation = (path, method, options = {}) => {
//   const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:5000/api/v1';
//
//   return useSWRMutation(
//     `${path}`,
//     // (url, data) => fetcher(`${baseURL}${url}`, { method, data }),
//     (url, data) => fetcher(`${url}`, { method, data }),
//     options
//   );
// };
//
// export default useApiSWRMutation;

// import useSWR from 'swr';
// import useSWRMutation from 'swr/mutation';

// const fetcher = async (url, method = 'GET', data = null, headers = {}) => {
//   console.log('url', url);
//   const config = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...headers,
//     },
//     credentials: 'include',
//   };
//
//   if (data && method !== 'GET') {
//     config.body = JSON.stringify(data);
//   }
//
//   console.log('url', url);
//   const response = await fetch(url, config);
//   console.log('url', url);
//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || 'API request failed');
//   }
//   return result;
// };
//
// const useApi = (path, method = 'GET', data = null, options = {}) => {
//   debugger
//   const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:3000/';
//   const url = `${baseURL}${path}`;
//   // console.log('path', path)
//   // const url = `${path}`;
//
//   if (method === 'GET') {
//     console.log('path', path);
//     // Use SWR for GET requests
//     return useSWR(url, fetcher, options);
//   } else {
//     // Use SWRMutation for non-GET requests
//     return useSWRMutation(url, (url) => fetcher(url, method, data, options.headers), options);
//   }
// };
//
// export default useApi;

// import useSWR from 'swr';
// import useSWRMutation from 'swr/mutation';
//
// const fetcher = async (url, method = 'GET', data = null, headers = {}) => {
//   const config = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...headers,
//     },
//     credentials: 'include',
//   };
//
//   if (data && method !== 'GET') {
//     config.body = JSON.stringify(data);
//   }
//
//   const response = await fetch(url, config);
//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || 'API request failed');
//   }
//   return result;
// };
//
// const useApi = (path, method = 'GET', data = null, options = {}) => {
//   const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:3000/';
//   const url = `${baseURL}${path}`;
//
//   if (method === 'GET') {
//     // Use SWR for GET requests
//     return useSWR(url, fetcher, options);
//   } else {
//     console.log('useapi', url);
//     const mutation = useSWRMutation((url, data) => fetcher(url, method, data, options.headers), options);
//     return mutation;
//   }
// };
//
// export default useApi;


import {useEffect, useState} from "react";

const useApi = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (body) => {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:3000/';
    const apiUrl = `${baseURL}${url}`;
    setLoading(true);
    try {
      const fetchOptions = {
        method,
        headers: {},
        body: null,
      };

      if (method !== 'GET') {
        // if (body instanceof FormData) {
        //   // For FormData, let the browser set the Content-Type
        //   fetchOptions.body = body;
        // } else {
        //   // For JSON data
        //   fetchOptions.headers['Content-Type'] = 'application/json';
        //   fetchOptions.body = JSON.stringify(body);
        // }

        // fetchOptions.headers = {
        //   'Content-Type': contentType || 'application/json'
        //   // ...headers,
        // };
        // for (let [key, value] of body.entries()) {
        //   console.log(key, value);
        // }
        // fetchOptions.body = JSON.stringify(body);

        if (body instanceof FormData) {
          // When body is FormData, we don't set the Content-Type header.
          // The browser will automatically set it with the proper boundary parameter.
          fetchOptions.body = body;
        } else {
          fetchOptions.headers['Content-Type'] = 'application/json';
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(apiUrl, fetchOptions);
      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || 'API request failed');
      setData(jsonData);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data for GET requests
  useEffect(() => {
    if (method === 'GET') fetchData();
  }, [url]);

  return { data, error, loading, fetchData };
};

export default useApi;