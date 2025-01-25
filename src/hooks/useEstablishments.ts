import { useState, useEffect } from 'react';

import { getEstablishmentRatings } from '../api/ratingsAPI';
import { PaginationParams, UseEstablishmentsReturn } from '../types/establishment';

export const useEstablishments = (params: PaginationParams): UseEstablishmentsReturn => {
  const [state, setState] = useState<UseEstablishmentsReturn>({
    establishments: [],
    totalPages: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        establishments: [],
        loading: true,
        error: null,
      }));

      try {
        const data = await getEstablishmentRatings(params, controller.signal);

        setState({
          establishments: data.establishments,
          totalPages: data.meta.totalPages,
          loading: false,
          error: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setState({
            establishments: [],
            totalPages: 0,
            loading: false,
            error: error.message || 'Error when fetching establishments',
          });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [params.page, params.pageSize]);

  return state;
};
