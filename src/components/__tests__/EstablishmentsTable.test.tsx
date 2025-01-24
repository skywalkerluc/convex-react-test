import { render } from '@testing-library/react';

import EstablishmentsTable from '../establishments/EstablishmentsTable';

const mockEstablishments = [
  {
    id: '1',
    businessName: 'Test Restaurant',
    ratingValue: 5,
    latitude: '51.5074',
    longitude: '-0.1278',
    addressLine1: 'Test Street 1',
    addressLine2: '',
    addressLine3: '',
    postCode: 'TE1 1ST',
  },
];

describe('EstablishmentsTable', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<EstablishmentsTable establishments={mockEstablishments} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
