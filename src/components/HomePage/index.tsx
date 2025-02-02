import PaginatedEstablishmentsTable from '../features/establishments/ListPage/PaginatedEstablishmentsTable';

import styles from './styles.module.css';

const HomePage = () => (
  <div className={styles.container} data-testid='home-page'>
    <header className={styles.logo} />
    <h1 className={styles.title}>Food Hygiene Rating Dashboard</h1>
    <PaginatedEstablishmentsTable />
  </div>
);

export default HomePage;
