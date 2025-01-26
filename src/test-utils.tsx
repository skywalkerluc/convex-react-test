import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const createWrapper = (options?: { router?: { initialEntries?: string[] } }) => {
  const Wrapper = ({ children }: { children: ReactElement }) => (
    <MemoryRouter initialEntries={options?.router?.initialEntries || ['/']}>
      {children}
    </MemoryRouter>
  );
  return Wrapper;
};
