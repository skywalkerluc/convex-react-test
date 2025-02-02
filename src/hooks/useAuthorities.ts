import { useState, useEffect } from 'react';

import { getAuthorities } from '../api/foodRatingsApi';

export const useAuthorities = () => {
  const [state, setState] = useState<{
    authorities: Array<{ id: number; name: string }>;
    loading: boolean;
    error: string | null;
  }>({
    authorities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getAuthorities(controller.signal);
        if (isMounted) {
          setState({
            authorities: data.authorities,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted && !controller.signal.aborted) {
          setState({
            authorities: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return state;
};
