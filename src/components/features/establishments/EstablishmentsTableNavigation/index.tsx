import React, { memo } from 'react';

import styles from './styles.module.css';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  loading: boolean;
}

const EstablishmentsTableNavigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  loading,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={styles.navigationContainer} data-testid='pagination-controls'>
      <button
        type='button'
        className={styles.button}
        onClick={onPrevious}
        disabled={loading || isFirstPage}
        aria-disabled={loading || isFirstPage}
        aria-label='Previous page'
      >
        Previous
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        type='button'
        className={styles.button}
        onClick={onNext}
        disabled={loading || isLastPage}
        aria-disabled={loading || isLastPage}
        aria-label='Next page'
      >
        Next
      </button>
    </div>
  );
};

export default memo(EstablishmentsTableNavigation);
