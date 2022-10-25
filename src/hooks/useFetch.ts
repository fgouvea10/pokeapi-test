import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { client } from '../lib/client';

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    client
      .get(url, options)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err);
        setHasError(true);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return {
    data,
    isFetching,
    error,
    hasError,
  };
}
