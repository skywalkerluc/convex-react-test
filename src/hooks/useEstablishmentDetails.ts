import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getEstablishmentDetails } from '../api/foodRatingsApi';
import { EstablishmentDetails } from '../types/establishment';

export const useEstablishmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<EstablishmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (!id) throw new Error('ID não fornecido');

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) throw new Error('ID inválido');

        const data = await getEstablishmentDetails(numericId, controller.signal);
        setDetails(data);
        setError(null);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Erro ao carregar detalhes'));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [id]);

  return { details, loading, error };
};
