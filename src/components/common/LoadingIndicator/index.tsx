import React from 'react';

import styles from './styles.module.css';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => (
  <div className={styles.container} role='alert' aria-live='polite'>
    <div className={styles.spinner} />
    <span className={styles.text}>{message || 'Loading...'}</span>
  </div>
);
