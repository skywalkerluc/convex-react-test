import { render, screen } from '@testing-library/react';

import { createWrapper } from '../../test-utils';
import PaginatedEstablishmentsTable from '../features/establishments/ListPage/PaginatedEstablishmentsTable';

jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({
    state: {
      establishments: [
        {
          id: 1,
          businessName: 'Test Restaurant',
          ratingValue: '5',
          addressLine1: 'Test Street 1',
          postCode: 'TE5 5TP',
        },
      ],
      authorities: [],
      totalPages: 1,
      pagination: { page: 1, pageSize: 5 },
      isLoading: false,
      error: null,
    },
    dispatch: jest.fn(),
  }),
}));

describe('PaginatedEstablishmentsTable', () => {
  it('should render establishments', () => {
    render(<PaginatedEstablishmentsTable />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
