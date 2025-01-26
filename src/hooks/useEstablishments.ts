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
      const previousController = abortControllerRef.current;
      if (previousController) {
        previousController.abort();
      }

      const newController = new AbortController();
      abortControllerRef.current = newController;

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const data = await getEstablishmentRatings(params, newController.signal);

        if (!newController.signal.aborted) {
          setState({
            establishments: data.establishments,
            totalPages: data.meta.totalPages,
            loading: false,
            error: null,
          });
        }
      } catch (error: unknown) {
        if (newController.signal.aborted) return;

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        setState({
          establishments: [],
          totalPages: 0,
          loading: false,
          error: new Error(errorMessage),
        });
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [params.authority, params.page, params.pageSize]);

  return state;
};
