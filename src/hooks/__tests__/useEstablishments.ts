import { renderHook, act } from '@testing-library/react-hooks';
import fetch from 'jest-fetch-mock';
import { useEstablishments } from '../useEstablishments';
import { EstablishmentsResponse } from '../../types/establishment';

const mockApiResponse: EstablishmentsResponse = {
  establishments: [
    {
      id: '123',
      businessName: 'Test Restaurant',
      ratingValue: 5,
      latitude: '51.5074',
      longitude: '-0.1278',
      addressLine1: 'Test Street 1',
      addressLine2: '',
      addressLine3: '',
      postCode: 'TE1 1ST',
    },
  ],
  meta: {
    dataSource: 'API',
    extractDate: '2023-10-01',
    itemCount: 1,
    returncode: 'OK',
    totalCount: 100,
    totalPages: 10,
    pageSize: 10,
    pageNumber: 1,
  },
  links: [],
};

describe('useEstablishments Hook', () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should maintain initial state after unmount', async () => {
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
    fetch.mockRejectOnce(new Error('Network failed'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useEstablishments({ page: 1, pageSize: 10 }),
    );

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      loading: false,
      error: 'Network failed',
    });
  });
});
