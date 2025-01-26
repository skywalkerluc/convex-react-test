import { renderHook, act } from '@testing-library/react-hooks';

import * as foodRatingsApi from '../../api/foodRatingsApi';
import { useEstablishments } from '../useEstablishments';

jest.mock('../../api/foodRatingsApi');

describe('useEstablishments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch establishments', async () => {
    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockResolvedValue({
      establishments: [{ id: '1', businessName: 'Test Restaurant' }],
      meta: { totalPages: 1 },
      links: [],
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useEstablishments({ page: 1, pageSize: 10 }),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.establishments).toEqual([{ id: '1', businessName: 'Test Restaurant' }]);
    expect(result.current.totalPages).toBe(1);
  });

  it('should handle errors', async () => {
    (foodRatingsApi.getEstablishmentRatings as jest.Mock).mockRejectedValue(
      new Error('Test error'),
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useEstablishments({ page: 1, pageSize: 10 }),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toEqual(new Error('Test error'));
  });

  it('should abort previous request on params change', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    const { rerender, waitForNextUpdate } = renderHook((props) => useEstablishments(props), {
      initialProps: { page: 1, pageSize: 10 },
    });

    rerender({ page: 2, pageSize: 10 });
    await waitForNextUpdate();

    expect(abortSpy).toHaveBeenCalled();
  });
});
