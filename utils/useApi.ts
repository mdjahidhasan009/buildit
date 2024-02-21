import {useEffect, useState} from "react";

const useApi = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
          fetchOptions.headers['Content-Type'] = 'application/json';
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