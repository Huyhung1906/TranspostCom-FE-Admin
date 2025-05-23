import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseAxiosProps<T> {
  url: string;
  config?: AxiosRequestConfig;
  manual?: boolean; // nếu true thì không tự động gọi API
}

export function useAxios<T>({ url, config, manual = false }: UseAxiosProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!manual);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (manual) return;

    setLoading(true);
    axiosClient
      .get<T>(url, config)
      .then((res: AxiosResponse<T>) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url, config, manual]);

  return { data, loading, error };
}
