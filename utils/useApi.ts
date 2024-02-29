import {useEffect, useState} from "react";

interface UseApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | object | FormData | null;
  headers?: HeadersInit;
}

interface UseApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetchData: (body, urlParams?: string) => Promise<any>;
}

// const useApi = (url, method = 'GET') => {
const useApi = <T = any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET", contentType = 'application/json'): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (body, urlParams = '') => {
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com/api/v1' : 'http://localhost:3000/';
    let tempUrl = urlParams !== '' ? url + urlParams : url;
    const apiUrl = `${baseURL}${tempUrl}`;
    setLoading(true);
    try {
      const fetchOptions = {
        method,
        headers: {},
        body: null,
      };

      if (method !== 'GET') {
        if (body instanceof FormData) {
          // When body is FormData, we don't set the Content-Type header.
          // The browser will automatically set it with the proper boundary parameter.
          fetchOptions.body = body;
        } else {
          fetchOptions.headers['Content-Type'] = contentType;
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(apiUrl, fetchOptions);
      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || 'API request failed');
      setData(jsonData);
      return jsonData;
    } catch (e) {
      setError(e);
      return null;
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