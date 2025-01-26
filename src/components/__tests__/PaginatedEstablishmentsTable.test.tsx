import { render, fireEvent, screen } from '@testing-library/react';

import * as useEstablishmentsModule from '../../hooks/useEstablishments';
import PaginatedEstablishmentsTable from '../features/establishments/PaginatedEstablishmentsTable';

jest.mock('../../hooks/useEstablishments', () => ({
  useEstablishments: jest.fn(),
}));

describe('PaginatedEstablishmentsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    (useEstablishmentsModule.useEstablishments as jest.Mock).mockReturnValue({
      establishments: [],
      totalPages: 0,
      loading: true,
      error: null,
    });

    render(<PaginatedEstablishmentsTable />);
    expect(screen.getByText('Loading establishments...')).toBeInTheDocument();
  });

  it('should render establishments', () => {
    (useEstablishmentsModule.useEstablishments as jest.Mock).mockReturnValue({
      establishments: [
        {
          id: '1',
          businessName: 'Test Restaurant',
          ratingValue: 5,
          latitude: '51.5074',
          longitude: '-0.1278',
          addressLine1: 'Test Street 1',
          postCode: 'TE5 5TP',
        },
      ],
      totalPages: 1,
      loading: false,
      error: null,
    });

    render(<PaginatedEstablishmentsTable />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render error message', () => {
    (useEstablishmentsModule.useEstablishments as jest.Mock).mockReturnValue({
      establishments: [],
      totalPages: 0,
      loading: false,
      error: new Error('Test error'),
    });

    render(<PaginatedEstablishmentsTable />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should handle pagination', () => {
    (useEstablishmentsModule.useEstablishments as jest.Mock).mockReturnValue({
      establishments: [],
      totalPages: 5,
      loading: false,
      error: null,
    });

    render(<PaginatedEstablishmentsTable />);

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });
});
