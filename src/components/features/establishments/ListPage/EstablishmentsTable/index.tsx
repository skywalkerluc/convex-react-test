import React from 'react';

import { Establishment } from '../../../../../types/establishment';
import { LoadingIndicator } from '../../../../common/LoadingIndicator';
import EstablishmentsTableRow from '../EstablishmentsTableRow';

import styles from './styles.module.css';

interface TableProps {
  establishments: Establishment[];
  loading: boolean;
}

const EstablishmentsTable: React.FC<TableProps> = ({ establishments, loading }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.headerAction}>Select</th>
          <th className={styles.header}>Business Name</th>
          <th className={styles.header}>Rating</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={3} className={styles.loadingCell}>
              <LoadingIndicator message='Loading establishments...' />
            </td>
          </tr>
        ) : (
          <>
            {establishments.length === 0 ? (
              <tr>
                <td colSpan={2} className={styles.noResults}>
                  No establishments found
                </td>
              </tr>
            ) : (
              establishments.map((establishment) => (
                <EstablishmentsTableRow key={establishment.id} establishment={establishment} />
              ))
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default EstablishmentsTable;
