import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useEstablishmentDetails } from '../useEstablishmentDetails';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

jest.mock('../../api/foodRatingsApi', () => ({
  getEstablishmentDetails: jest.fn(),
}));

const mockGetEstablishmentDetails = jest.requireMock(
  '../../api/foodRatingsApi',
).getEstablishmentDetails;

describe('useEstablishmentDetails', () => {
  const mockDetails = {
    id: 123,
    businessName: 'Test Restaurant',
    ratingValue: '5',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch establishment details', async () => {
    mockGetEstablishmentDetails.mockResolvedValue(mockDetails);

    const { result } = renderHook(() => useEstablishmentDetails());

    await waitFor(() => {
      expect(result.current.details).toEqual(mockDetails);
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle invalid ID', async () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    mockGetEstablishmentDetails.mockRejectedValue(new Error('Invalid ID'));

    const { result } = renderHook(() => useEstablishmentDetails());

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.loading).toBe(false);
    });

    console.error.mockRestore();
  });
});
