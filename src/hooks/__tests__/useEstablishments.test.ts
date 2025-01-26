/* eslint-disable @typescript-eslint/no-empty-function */
import { renderHook, act } from '@testing-library/react-hooks';

import * as foodRatingsApi from '../../api/foodRatingsApi';
import { useEstablishments } from '../useEstablishments';

jest.mock('../../api/foodRatingsApi');

describe('useEstablishments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockReset();
  });

  it('should fetch establishments', async () => {
    const mockData = {
      establishments: [{ id: 1, businessName: 'Test Restaurant' }],
      meta: { totalPages: 1 },
      links: [],
    };

    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEstablishments({ page: 1, pageSize: 10, authority: 'test' }),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.establishments).toEqual(mockData.establishments);
    expect(result.current.totalPages).toBe(1);
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEstablishments({ page: 1, pageSize: 10 }),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error?.message).toBe('Test error');
  });

  it('should abort previous request on params change', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    const mockData = {
      establishments: [],
      meta: { totalPages: 1 },
      links: [],
    };

    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockImplementation(
      (_, signal) =>
        new Promise((resolve) => {
          signal.addEventListener('abort', () => {});
          setTimeout(() => resolve(mockData), 100);
        }),
    );

    const { rerender, waitForNextUpdate } = renderHook((props) => useEstablishments(props), {
      initialProps: { page: 1, pageSize: 10 },
    });

    rerender({ page: 2, pageSize: 10 });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(abortSpy).toHaveBeenCalled();
  });
});
