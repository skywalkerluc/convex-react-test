import { useState, useEffect, useRef } from 'react';

import { getEstablishmentRatings } from '../api/foodRatingsApi';
import { UseEstablishmentsReturn } from '../types/establishment';
import { PaginationParams } from '../types/pagination';

export const useEstablishments = (params: PaginationParams): UseEstablishmentsReturn => {
  const [state, setState] = useState<UseEstablishmentsReturn>({
    establishments: [],
    totalPages: 0,
    loading: true,
    error: null,
  });

  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      abortControllerRef.current?.abort();
      const newController = new AbortController();
      abortControllerRef.current = newController;

      try {
        const data = await getEstablishmentRatings(params, newController.signal);

        if (!newController.signal.aborted) {
          setState({
            establishments: data.establishments,
            totalPages: data.meta.totalPages,
            loading: true,
            error: null,
          });
        }
      } catch (error) {
        if (!newController.signal.aborted) {
          setState({
            establishments: [],
            totalPages: 0,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    };

    fetchData();

    return () => abortControllerRef.current?.abort();
  }, [params.page, params.pageSize, params.authority]);

  return state;
};
