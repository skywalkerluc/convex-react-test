import { useNavigate } from 'react-router-dom';

import { useEstablishmentDetails } from '../../../../hooks/useEstablishmentDetails';
import { LoadingIndicator } from '../../../common/LoadingIndicator';

import styles from './styles.module.css';

const EstablishmentDetailsPage = () => {
  const { details, loading, error } = useEstablishmentDetails();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  };

  if (loading) return <LoadingIndicator message='Loading establishment details...' />;

  if (error)
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error.message}</p>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          &larr; Back to Home
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Go back
      </button>

      {details && (
        <div className={styles.detailsCard}>
          <h1 className={styles.title}>{details.businessName}</h1>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Address</h2>
            <div className={styles.address}>
              <p>{details.addressLine1}</p>
              <p>{details.addressLine2}</p>
              <p>{details.addressLine3}</p>
              <p>{details.addressLine4}</p>
              <p>{details.postCode}</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Rating</h2>
            <div className={styles.ratingBadge}>{details.ratingValue}</div>
            <p className={styles.inspectionDate}>
              Inspection Date: {formatDate(details.ratingDate)}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Scores</h2>
            <div className={styles.scoresGrid}>
              <div className={styles.scoreItem}>
                <span>Hygiene</span>
                <span>{details.scores.Hygiene}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Structural</span>
                <span>{details.scores.Structural}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Confidence</span>
                <span>{details.scores.ConfidenceInManagement}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstablishmentDetailsPage;
