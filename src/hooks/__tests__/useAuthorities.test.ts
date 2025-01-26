import { renderHook, act } from '@testing-library/react-hooks';

import * as foodRatingsApi from '../../api/foodRatingsApi';
import { useAuthorities } from '../useAuthorities';

jest.mock('../../api/foodRatingsApi');

describe('useAuthorities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch authorities', async () => {
    (foodRatingsApi.getAuthorities as jest.Mock).mockResolvedValue({
      authorities: [{ id: 1, name: 'Authority 1' }],
      meta: {},
      links: [],
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuthorities());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.authorities).toEqual([{ id: 1, name: 'Authority 1' }]);
  });

  it('should handle errors', async () => {
    (foodRatingsApi.getAuthorities as jest.Mock).mockRejectedValue(new Error('Test error'));

    const { result, waitForNextUpdate } = renderHook(() => useAuthorities());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toBe('Test error');
  });
});
