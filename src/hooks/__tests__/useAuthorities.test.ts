import { renderHook, act } from '@testing-library/react-hooks';

import * as foodRatingsApi from '../../api/foodRatingsApi';
import { useAuthorities } from '../useAuthorities';

jest.mock('../../api/foodRatingsApi');

describe('useAuthorities', () => {
  const mockAuthorities = [{ id: 1, name: 'Authority 1' }];
  const mockResponse = {
    authorities: mockAuthorities,
    meta: {},
    links: [],
  };

  beforeEach(() => {
    (foodRatingsApi.getAuthorities as jest.Mock).mockReset();
  });

  it('should fetch authorities', async () => {
    (foodRatingsApi.getAuthorities as jest.Mock).mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuthorities());

    expect(result.current).toEqual({
      authorities: [],
      loading: true,
      error: null,
    });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual({
      authorities: mockAuthorities,
      loading: false,
      error: null,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    (foodRatingsApi.getAuthorities as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useAuthorities());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual({
      authorities: [],
      loading: false,
      error: 'Test error',
    });
  });
});
