import { render, fireEvent, screen } from '@testing-library/react';

import { AuthorityFilter } from '../features/filters/AuthorityFilter';

const mockAppContext = {
  state: {
    authorities: [
      { id: 1, name: 'Authority 1' },
      { id: 2, name: 'Authority 2' },
    ],
    establishments: [],
    pagination: { page: 1, pageSize: 5 },
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  dispatch: jest.fn(),
};

jest.mock('../../context/AppContext', () => ({
  useAppContext: () => mockAppContext,
}));

describe('AuthorityFilter', () => {
  beforeEach(() => {
    mockAppContext.dispatch.mockClear();
  });

  it('should render loading state', () => {
    mockAppContext.state = {
      ...mockAppContext.state,
      authorities: [],
      isLoading: {
        authorities: true
      },
    };

    render(<AuthorityFilter value='' onChange={() => {}} />);

    expect(screen.getByLabelText('Local Authority:')).toBeDisabled();
    expect(screen.getByRole('option', { name: 'All Authorities' })).toBeInTheDocument();
  });

  it('should render authorities', () => {
    mockAppContext.state = {
      ...mockAppContext.state,
      authorities: [
        { id: 1, name: 'Authority 1' },
        { id: 2, name: 'Authority 2' },
      ],
      isLoading: false,
    };

    render(<AuthorityFilter value='' onChange={() => {}} />);

    expect(screen.getByText('Authority 1')).toBeInTheDocument();
    expect(screen.getByText('Authority 2')).toBeInTheDocument();
  });

  it('should call onChange when authority is selected', () => {
    const mockOnChange = jest.fn();

    render(<AuthorityFilter value='' onChange={mockOnChange} />);

    fireEvent.change(screen.getByLabelText('Local Authority:'), {
      target: { value: '1' },
    });

    expect(mockOnChange).toHaveBeenCalledWith('1');
  });
});
