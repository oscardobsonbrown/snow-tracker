/**
 * Hook for fetching weather/snow data
 */

import { useState, useEffect } from 'react';
import type { SnowConditions } from '@/types';
import { fetchSnowData } from '@/services/weather';

interface UseSnowDataOptions {
  lat: number;
  lng: number;
  enabled?: boolean;
}

interface UseSnowDataResult {
  data: Partial<SnowConditions> | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSnowData({ lat, lng, enabled = true }: UseSnowDataOptions): UseSnowDataResult {
  const [data, setData] = useState<Partial<SnowConditions> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchSnowData(lat, lng);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch snow data'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [lat, lng, enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
