import React from 'react';

import styles from './styles.module.css';

export const LoadingIndicator = () => (
  <div className={styles.container} role='alert' aria-live='polite'>
    <div className={styles.spinner} />
    <span className={styles.text}>Loading establishments...</span>
  </div>
);
