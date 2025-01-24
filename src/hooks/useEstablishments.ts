import { useState, useEffect } from 'react';

import { getEstablishmentRatings } from '../api/ratingsAPI';
import {
  EstablishmentsResponse,
  PaginationParams,
  UseEstablishmentsReturn,
} from '../types/establishment';

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
      try {
        const data: EstablishmentsResponse = await getEstablishmentRatings(params);

        setState({
          establishments: data.establishments,
          totalPages: data.meta.totalPages,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
          }));
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [params.page]);

  return state;
};
