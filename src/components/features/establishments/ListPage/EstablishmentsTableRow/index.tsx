import React from 'react';
import { Link } from 'react-router-dom';

import { useFavourites } from '../../../../../context/FavouritesContext';
import { Establishment } from '../../../../../types/establishment';

import styles from './styles.module.css';

interface Props {
  establishment: Establishment;
}

const EstablishmentsTableRow: React.FC<Props> = ({ establishment }) => {
  const { toggleFavourite, favourites } = useFavourites();
  const isFavourite = favourites.some((fav) => fav.id === establishment.id);

  return (
    <tr className={styles.row} role='row'>
      <td className={styles.cell}>
        <input
          className={styles.input}
          type='checkbox'
          checked={isFavourite}
          onChange={() =>
            toggleFavourite({
              id: establishment.id,
              businessName: establishment.businessName,
              ratingValue: establishment.ratingValue,
            })
          }
          aria-label={`${isFavourite ? 'Remove' : 'Add'} to favourites`}
        />
      </td>
      <td className={styles.cell} role='row'>
        <Link to={`/establishment/${establishment.id}`} className={styles.link}>
          {establishment.businessName}
        </Link>
      </td>
      <td className={styles.cell}>{establishment.ratingValue}</td>
    </tr>
  );
};

export default EstablishmentsTableRow;
