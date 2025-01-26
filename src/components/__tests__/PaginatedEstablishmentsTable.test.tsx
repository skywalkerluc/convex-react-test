import { render, screen } from '@testing-library/react';

import * as useEstablishmentsModule from '../../hooks/useEstablishments';
import { createWrapper } from '../../test-utils';
import PaginatedEstablishmentsTable from '../features/establishments/ListPage/PaginatedEstablishmentsTable';

jest.mock('../../hooks/useEstablishments');

describe('PaginatedEstablishmentsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render establishments', () => {
    (useEstablishmentsModule.useEstablishments as jest.Mock).mockReturnValue({
      establishments: [
        {
          id: 1,
          businessName: 'Test Restaurant',
          ratingValue: '5',
          addressLine1: 'Test Street 1',
          postCode: 'TE5 5TP',
        },
      ],
      totalPages: 1,
      loading: false,
      error: null,
    });

    render(<PaginatedEstablishmentsTable />, { wrapper: createWrapper() });

    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
