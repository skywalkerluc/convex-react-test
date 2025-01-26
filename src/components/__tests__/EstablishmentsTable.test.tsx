import { render } from '@testing-library/react';

import { createWrapper } from '../../test-utils';
import EstablishmentsTable from '../features/establishments/ListPage/EstablishmentsTable';

const mockEstablishments = [
  {
    id: 1,
    businessName: 'Test Restaurant',
    ratingValue: '5',
  },
];

describe('EstablishmentsTable', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <EstablishmentsTable establishments={mockEstablishments} loading={false} />,
      { wrapper: createWrapper() },
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
