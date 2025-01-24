import { useState } from 'react';
import { useEstablishments } from '../../../hooks/useEstablishments';
import EstablishmentsTable from '../EstablishmentsTable';
import EstablishmentsTableNavigation from '../EstablishmentsTableNavigation';
import { PaginationParams } from '../../../types/establishment';
import styles from './styles.module.css';

const PaginatedEstablishmentsTable = ()  => {
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, pageSize: 10 });
  const { establishments, totalPages, loading, error } = useEstablishments(pagination);

  const handlePrevious = () => {
    setPagination(prev => ({
      ...prev,
      page: Math.max(1, prev.page - 1)
    }));
  };

  const handleNext = () => {
    setPagination(prev => ({
      ...prev,
      page: Math.min(totalPages, prev.page + 1)
    }));
  };

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <div className={styles.tableContainer}>
        <EstablishmentsTable establishments={establishments} />
      </div>

      <EstablishmentsTableNavigation
        currentPage={pagination.page}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        loading={loading}
      />
    </div>
  );
};

export default PaginatedEstablishmentsTable;