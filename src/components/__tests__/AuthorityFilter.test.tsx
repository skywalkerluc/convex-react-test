import { render, fireEvent, screen } from '@testing-library/react';

import * as useAuthoritiesModule from '../../hooks/useAuthorities';
import { AuthorityFilter } from '../features/filters/AuthorityFilter';

jest.mock('../../hooks/useAuthorities', () => ({
  useAuthorities: jest.fn(),
}));

describe('AuthorityFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    (useAuthoritiesModule.useAuthorities as jest.Mock).mockReturnValue({
      authorities: [],
      loading: true,
      error: null,
    });

    render(<AuthorityFilter value='' onChange={() => {}} />);
    expect(screen.getByLabelText('Local Authority:')).toBeDisabled();
  });

  it('should render authorities', () => {
    (useAuthoritiesModule.useAuthorities as jest.Mock).mockReturnValue({
      authorities: [
        { id: 1, name: 'Authority 1' },
        { id: 2, name: 'Authority 2' },
      ],
      loading: false,
      error: null,
    });

    render(<AuthorityFilter value='' onChange={() => {}} />);
    expect(screen.getByText('Authority 1')).toBeInTheDocument();
    expect(screen.getByText('Authority 2')).toBeInTheDocument();
  });

  it('should call onChange when authority is selected', () => {
    const mockOnChange = jest.fn();
    (useAuthoritiesModule.useAuthorities as jest.Mock).mockReturnValue({
      authorities: [
        { id: 1, name: 'Authority 1' },
        { id: 2, name: 'Authority 2' },
      ],
      loading: false,
      error: null,
    });

    render(<AuthorityFilter value='' onChange={mockOnChange} />);

    fireEvent.change(screen.getByLabelText('Local Authority:'), {
      target: { value: '1' },
    });

    expect(mockOnChange).toHaveBeenCalledWith('1');
  });
});
