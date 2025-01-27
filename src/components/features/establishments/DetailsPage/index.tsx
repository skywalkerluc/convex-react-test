import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { useEstablishmentDetails } from '../../../../hooks/useEstablishmentDetails';
import { LoadingIndicator } from '../../../common/LoadingIndicator';

import styles from './styles.module.css';

const EstablishmentDetailsPage = () => {
  const { details, loading, error } = useEstablishmentDetails();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  if (loading) return <LoadingIndicator message='Loading...' />;

  if (error)
    return (
      <div className={styles.errorContainer} data-testid='details-error'>
        <p>Error: {error.message}</p>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          &larr; Back to Home
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        data-testid='details-back-button'
        onClick={() => navigate('/')}
      >
        &larr; Go back
      </button>

      {details && (
        <div className={styles.detailsCard} data-testid='details-card'>
          <h1 className={styles.title} data-testid='details-title'>
            {details.businessName}
          </h1>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Address</h2>
            <div className={styles.address} data-testid='details-address'>
              <p>{details.addressLine1}</p>
              <p>{details.addressLine2}</p>
              <p>{details.addressLine3}</p>
              <p>{details.addressLine4}</p>
              <p>{details.postCode}</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Rating</h2>
            <div className={styles.ratingBadge} data-testid='details-rating'>
              {details.ratingValue}
            </div>
            <p className={styles.inspectionDate} data-testid='details-inspection-date'>
              Inspection Date: {formatDate(details.ratingDate)}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Scores</h2>
            <div className={styles.scoresGrid}>
              <div className={styles.scoreItem} data-testid='details-scores'>
                <span>Hygiene</span>
                <span>{details.scores.Hygiene}</span>
              </div>
              <div className={styles.scoreItem} data-testid='details-scores'>
                <span>Structural</span>
                <span>{details.scores.Structural}</span>
              </div>
              <div className={styles.scoreItem} data-testid='details-scores'>
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
