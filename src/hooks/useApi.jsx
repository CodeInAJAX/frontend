import { useState, useCallback } from 'react';
import { callAPI, callAPIWithMeta } from '../utils/helpers';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async ({ method, path, data, withMeta = false }) => {
    setLoading(true);
    setError(null);
    try {
      const result = withMeta 
        ? await callAPIWithMeta({ method, path, data })
        : await callAPI({ method, path, data });
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Terjadi kesalahan';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error, setError };
};