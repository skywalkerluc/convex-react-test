import { useAppContext } from '../../../../../context/AppContext';
import { AuthorityFilter } from '../../../filters/AuthorityFilter';
import EstablishmentsTable from '../EstablishmentsTable';
import EstablishmentsTableNavigation from '../EstablishmentsTableNavigation';

import styles from './styles.module.css';

const PaginatedEstablishmentsTable = () => {
  const { state, dispatch } = useAppContext();
  const { establishments, totalPages, pagination, isLoading, error } = state;

  const handlePrevious = () => {
    dispatch({ type: 'SET_PAGINATION', payload: { page: Math.max(1, pagination.page - 1) } });
  };

  const handleNext = () => {
    dispatch({
      type: 'SET_PAGINATION',
      payload: { page: Math.min(totalPages, pagination.page + 1) },
    });
  };

  const handleAuthorityChange = (authority: string) => {
    dispatch({ type: 'SET_PAGINATION', payload: { authority, page: 1 } });
  };

  return (
    <div className={styles.container}>
      <AuthorityFilter value={pagination.authority || ''} onChange={handleAuthorityChange} />

      {error && !isLoading && (
        <div className={styles.error} role='alert'>
          {error}
        </div>
      )}

      <div className={styles.tableWrapper}>
        <EstablishmentsTable establishments={establishments} loading={isLoading.establishments} />
      </div>

      <EstablishmentsTableNavigation
        currentPage={pagination.page}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
        loading={isLoading.establishments}
      />
    </div>
  );
};

export default PaginatedEstablishmentsTable;
