import { useAuthorities } from '../../../../hooks/useAuthorities';

import styles from './styles.module.css';

export const AuthorityFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) => {
  const { authorities, loading } = useAuthorities();

  return (
    <div className={styles.filterContainer}>
      <label htmlFor='authority-filter'>Local Authority:</label>
      <select
        id='authority-filter'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value=''>All Authorities</option>
        {authorities?.map((authority) => (
          <option key={authority.id} value={authority.id}>
            {authority.name}
          </option>
        ))}
      </select>
    </div>
  );
};
