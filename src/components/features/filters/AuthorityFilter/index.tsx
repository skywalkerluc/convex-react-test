import { useAppContext } from '../../../../context/AppContext';

import styles from './styles.module.css';

export const AuthorityFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) => {
  const { state } = useAppContext();
  const { authorities, isLoading } = state;

  return (
    <div className={styles.filterContainer}>
      <label htmlFor='authority-filter'>Local Authority:</label>
      <select
        id='authority-filter'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading.authorities}
      >
        <option value=''>All Authorities</option>
        {authorities.map((authority) => (
          <option key={authority.id} value={authority.id}>
            {authority.name}
          </option>
        ))}
      </select>
    </div>
  );
};
