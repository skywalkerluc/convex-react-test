import React from 'react';

import { Establishment } from '../../../types/establishment';
import { LoadingIndicator } from '../../common/LoadingIndicator';
import EstablishmentsTableRow from '../EstablishmentsTableRow';

import styles from './styles.module.css';

interface TableProps {
  establishments: Establishment[];
  loading?: boolean;
}

const EstablishmentsTable: React.FC<TableProps> = ({ establishments, loading }) => (
  <table className={styles.table} aria-label='Establishment table'>
    <thead>
      <tr>
        <th className={styles.header}>Business Name</th>
        <th className={styles.header}>Rating</th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={2} className={styles.loadingCell}>
            <LoadingIndicator />
          </td>
        </tr>
      ) : establishments.length > 0 ? (
        establishments.map((establishment) => (
          <EstablishmentsTableRow key={establishment.id} establishment={establishment} />
        ))
      ) : (
        <tr>
          <td colSpan={2} className={styles.noResults}>
            No establishments found
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default EstablishmentsTable;
