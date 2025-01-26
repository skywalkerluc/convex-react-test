import { render } from '@testing-library/react';

import { createWrapper } from '../../test-utils';
import EstablishmentDetailsPage from '../features/establishments/DetailsPage';

jest.mock('../../hooks/useEstablishmentDetails', () => ({
  useEstablishmentDetails: jest.fn(),
}));

const mockUseEstablishmentDetails = jest.requireMock(
  '../../hooks/useEstablishmentDetails',
).useEstablishmentDetails;

const mockDetails = {
  id: 123,
  businessName: 'Test Restaurant',
  ratingValue: '5',
  ratingDate: '2024-01-01T00:00:00',
  addressLine1: 'Test Street 1',
  addressLine2: 'Test Line 2',
  addressLine3: 'Test Line 3',
  addressLine4: 'Test Line 4',
  postCode: 'TE5 5TP',
  scores: {
    Hygiene: 5,
    Structural: 5,
    ConfidenceInManagement: 5,
  },
};

describe('EstablishmentDetailsPage', () => {
  it('matches snapshot', () => {
    mockUseEstablishmentDetails.mockReturnValue({
      details: mockDetails,
      loading: false,
      error: null,
    });

    const { asFragment } = render(<EstablishmentDetailsPage />, { wrapper: createWrapper() });
    expect(asFragment()).toMatchSnapshot();
  });

  it('shows loading state', () => {
    mockUseEstablishmentDetails.mockReturnValue({
      details: null,
      loading: true,
      error: null,
    });

    const { container } = render(<EstablishmentDetailsPage />, { wrapper: createWrapper() });
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseEstablishmentDetails.mockReturnValue({
      details: null,
      loading: false,
      error: new Error('Test error'),
    });

    const { getByText } = render(<EstablishmentDetailsPage />, { wrapper: createWrapper() });
    expect(getByText('Error: Test error')).toBeInTheDocument();
  });
});
