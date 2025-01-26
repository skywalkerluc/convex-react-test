import { useState } from 'react';

import { useEstablishments } from '../../../../../hooks/useEstablishments';
import { PaginationParams } from '../../../../../types/pagination';
import { AuthorityFilter } from '../../../filters/AuthorityFilter';
import EstablishmentsTable from '../EstablishmentsTable';
import EstablishmentsTableNavigation from '../EstablishmentsTableNavigation';

import styles from './styles.module.css';

const PaginatedEstablishmentsTable = () => {
  const [options, setOptions] = useState<PaginationParams>({ page: 1, pageSize: 5 });
  const { establishments, totalPages, loading, error } = useEstablishments(options);

  const handlePrevious = () => {
    setOptions((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  };

  const handleNext = () => {
    setOptions((prev) => ({
      ...prev,
      page: Math.min(totalPages, prev.page + 1),
    }));
  };

  const handleAuthorityChange = (authority: string) => {
    setOptions((prev) => ({ ...prev, authority, page: 1 }));
  };

  const isAbortError = (error: Error | null): boolean => {
    return error instanceof DOMException && error.name === 'AbortError';
  };

  return (
    <div className={styles.container}>
      <AuthorityFilter value={options.authority || ''} onChange={handleAuthorityChange} />
      {error && !isAbortError(error) && (
        <div className={styles.error} role='alert'>
          {error.message}
        </div>
      )}

      <div className={styles.tableWrapper}>
        <EstablishmentsTable establishments={establishments} loading={loading} />
      </div>

      <EstablishmentsTableNavigation
        currentPage={options.page}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        loading={loading}
      />
    </div>
  );
};

export default PaginatedEstablishmentsTable;
