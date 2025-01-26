import { useFavourites } from '../../../../context/FavouritesContext';

import styles from './styles.module.css';

const FavouritesTable = () => {
  const { favourites, removeFavourite, clearFavourites } = useFavourites();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favourites?')) {
      clearFavourites();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Favourites ({favourites.length})</h2>
        {favourites.length > 0 && (
          <button
            onClick={handleClearAll}
            className={`${styles.button} ${styles.clearButton}`}
            aria-label='Clear all favourites'
          >
            Clear All
          </button>
        )}
      </div>

      <div className={styles.tableWrapper}>
        {favourites.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.header}>Business Name</th>
                <th className={styles.header}>Rating</th>
                <th className={styles.header}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {favourites.map((fav) => (
                <tr key={fav.id} className={styles.row}>
                  <td className={styles.cell}>{fav.businessName}</td>
                  <td className={styles.cell}>{fav.ratingValue}</td>
                  <td className={styles.cell}>
                    <button
                      onClick={() => removeFavourite(fav.id)}
                      className={styles.button}
                      aria-label={`Remove ${fav.businessName} from favourites`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.emptyMessage}>No favourites selected</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesTable;
