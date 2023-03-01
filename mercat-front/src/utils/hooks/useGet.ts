import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

export function useGet<T>(url: string): [T | null, boolean, string | null, any] {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  useEffect(() => {
    axios
      .get<T>(url)
      .then((res) => {
        setData(res.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [url, axios]);

  return [data, isPending, error, setData];
}
