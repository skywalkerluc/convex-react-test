import React from 'react';
import { Establishment } from '../../../types/establishment';
// import styles from './styles.module.css';

interface Props {
  establishment: Establishment;
}

const EstablishmentsTableRow: React.FC<Props> = ({ establishment }) => (
  <tr role="row">
    <td>{establishment.businessName}</td>
    <td>{establishment.ratingValue}</td>
  </tr>
);

export default EstablishmentsTableRow;