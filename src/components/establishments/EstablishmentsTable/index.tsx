import React from 'react';

import { Establishment } from '../../../types/establishment';
import EstablishmentsTableRow from '../EstablishmentsTableRow';

import styles from './styles.module.css';

interface TableProps {
  establishments: Establishment[];
}

const EstablishmentsTable: React.FC<TableProps> = ({ establishments }) => (
  <table className={styles.table} aria-label='Tabela de estabelecimentos'>
    <thead>
      <tr>
        <th className={styles.header}>Business Name</th>
        <th className={styles.header}>Rating</th>
      </tr>
    </thead>
    <tbody>
      {establishments.map((establishment) => (
        <EstablishmentsTableRow key={establishment.id} establishment={establishment} />
      ))}
    </tbody>
  </table>
);

export default EstablishmentsTable;
