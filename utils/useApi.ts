import {useEffect, useState} from "react";

interface UseApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetchData: (body: BodyInit | object | FormData | null, urlParams?: string) => Promise<any>;
}

const useApi = <T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  contentType = 'application/json'
): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  //For get as we execute the api call immediately, for this reason only for GET request loading initially will true
  //also it will help to reduce the amount of rerendering
  const [loading, setLoading] = useState<boolean>(method === 'GET');

  const fetchData = async (body: any, urlParams = '') => {
    const baseURL = (process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}` : `${process.env.NEXT_PUBLIC_LOCAL_URL}`) + '/';
    let tempUrl = urlParams !== '' ? url + urlParams : url;
    const apiUrl = `${baseURL}${tempUrl}`;
    setLoading(true);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {}, // Initialize headers object
        body,
      };

      if (method !== 'GET') {
        if (!body) throw new Error('Body is required for non-GET requests');

        if (body instanceof FormData) {
          // When body is FormData, we don't set the Content-Type header.
          // The browser will automatically set it with the proper boundary parameter.
          fetchOptions.body = body;
        } else {
          fetchOptions.headers = {
            ...(fetchOptions.headers as Record<string, string>),
            'Content-Type': contentType
          };
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(apiUrl, fetchOptions);
      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || 'API request failed');
      setData(jsonData);
      return jsonData;
    } catch (e: any) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data for GET requests
  useEffect(() => {
    if (method === 'GET') fetchData(null);
  }, [url]);

  return { data, error, loading, fetchData };
};

export default useApi;