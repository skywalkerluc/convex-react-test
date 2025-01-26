import React from 'react';
import { Link } from 'react-router-dom';

import { Establishment } from '../../../../../types/establishment';

import styles from './styles.module.css';

interface Props {
  establishment: Establishment;
}

const EstablishmentsTableRow: React.FC<Props> = ({ establishment }) => {
  return (
    <tr className={styles.row} role='row'>
      <td className={styles.cell}>
        <Link to={`/establishment/${establishment.id}`} className={styles.link}>
          {establishment.businessName}
        </Link>
      </td>
      <td className={styles.cell}>{establishment.ratingValue}</td>
    </tr>
  );
};

export default EstablishmentsTableRow;
