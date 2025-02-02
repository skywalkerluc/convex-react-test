import { render } from '@testing-library/react';

import EstablishmentsTableNavigation from '../features/establishments/ListPage/EstablishmentsTableNavigation';

describe('EstablishmentsTableNavigation', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <EstablishmentsTableNavigation
        currentPage={2}
        totalPages={5}
        onPrevious={() => {}}
        onNext={() => {}}
        loading={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
