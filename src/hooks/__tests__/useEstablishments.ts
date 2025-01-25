import { renderHook, act } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';

import { useEstablishments } from '../useEstablishments';

const mockApiResponse = {
  establishments: [
    {
      id: '123',
      businessName: 'Test Restaurant',
      ratingValue: 5,
      latitude: '51.5074',
      longitude: '-0.1278',
      addressLine1: 'Test Street 1',
      postCode: 'TE1 1ST',
    },
  ],
  meta: {
    totalPages: 10,
    pageSize: 10,
    pageNumber: 1,
    dataSource: 'API',
    extractDate: '2023-10-01',
    itemCount: 1,
    returncode: 'OK',
    totalCount: 100,
  },
  links: [],
};

describe('useEstablishments', () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should clear data during loading', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

    const { result, rerender } = renderHook(
      ({ page }) => useEstablishments({ page, pageSize: 10 }),
      { initialProps: { page: 1 } },
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.establishments.length).toBeGreaterThan(0);

    fetch.mockResponseOnce(JSON.stringify(mockApiResponse));
    rerender({ page: 2 });

    expect(result.current.establishments).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('should maintain initial state when unmounted', async () => {
    fetch.mockResponseOnce(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(JSON.stringify(mockApiResponse)), 200)),
    );

    const { result, unmount } = renderHook(() => useEstablishments({ page: 1, pageSize: 10 }));
    unmount();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toEqual({
      establishments: [],
      totalPages: 0,
      loading: true,
      error: null,
    });
  });

  it('should handle API errors', async () => {
    fetch.mockReject(new Error('Network failure'));

    const { result } = renderHook(() => useEstablishments({ page: 1, pageSize: 10 }));

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.error).toMatch('Network failure');
    expect(result.current.establishments).toEqual([]);
  });
});
