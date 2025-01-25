import React from 'react';

import { Establishment } from '../../../../types/establishment';

import styles from './styles.module.css';

interface Props {
  establishment: Establishment;
}

const EstablishmentsTableRow: React.FC<Props> = ({ establishment }) => (
  <tr className={styles.row} role='row'>
    <td className={styles.cell}>{establishment.businessName}</td>
    <td className={styles.cell}>{establishment.ratingValue}</td>
  </tr>
);

export default EstablishmentsTableRow;
