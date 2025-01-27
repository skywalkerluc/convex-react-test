import styles from './styles.module.css';

export const ErrorDisplay = ({ error }: { error: Error | string }) => (
  <div role='alert' className={styles.error}>
    <p>Error: {typeof error === 'string' ? error : error.message}</p>
  </div>
);
