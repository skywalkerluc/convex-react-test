import { useState, useEffect } from 'react';

import { getAuthorities } from '../api/foodRatingsApi';
import { UseAuthoritiesReturn } from '../types/authority';

export const useAuthorities = (): UseAuthoritiesReturn => {
  const [state, setState] = useState<UseAuthoritiesReturn>({
    authorities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        authorities: [],
        loading: true,
        error: null,
      }));

      try {
        const data = await getAuthorities(controller.signal);

        setState({
          authorities: data.authorities,
          loading: false,
          error: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setState({
            authorities: [],
            loading: false,
            error: error.message || 'Error when fetching authorities',
          });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return state;
};
