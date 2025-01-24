import { render } from '@testing-library/react';

import PaginatedEstablishmentsTable from '../establishments/PaginatedEstablishmentsTable';

jest.mock('../../hooks/useEstablishments', () => ({
  useEstablishments: () => ({
    establishments: [],
    totalPages: 5,
    loading: false,
    error: null,
  }),
}));

describe('PaginatedEstablishmentsTable', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PaginatedEstablishmentsTable />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with error', () => {
    jest
      .spyOn(require('../../hooks/useEstablishments'), 'useEstablishments')
      .mockImplementation(() => ({
        establishments: [],
        totalPages: 0,
        loading: false,
        error: 'Erro de conexão',
      }));

    const { asFragment } = render(<PaginatedEstablishmentsTable />);
    expect(asFragment()).toMatchSnapshot();
  });
});
