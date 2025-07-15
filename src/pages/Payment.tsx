import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const convenienceFee = 2.36;

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Venue ID is required');
        const response = await fetch(`http://localhost:3000/api/turfs/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch venue details: ${response.statusText}`);
        const data = await response.json();
        setVenue(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch venue details');
      } finally {
        setLoading(false);
      }
    };
    fetchVenueDetails();
  }, [id]);

  const handlePayment = () => {
    setShowSuccessPopup(true);
  };

  const handleDone = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!venue) return <p>Venue not found</p>;

  const ImageGallery = () => (
    <div className={styles.section}>
      <img
        src={venue.images[currentImageIndex]}
        alt={venue.name}
        className={styles.mainImage}
      />
      <div className={styles.thumbnailContainer}>
        {venue.images.map((img: string, idx: number) => (
          <img
            key={idx}
            src={img}
            alt={venue.name + ' thumbnail'}
            className={`${styles.thumbnail} ${idx === currentImageIndex ? styles.thumbnailActive : ''}`}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  );

  const SuccessPopup = () => (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.successIcon}>✔</div>
        <h2 className={styles.successTitle}>Payment Successful!</h2>
        <p className={styles.successMessage}>Your booking has been confirmed.</p>
        <button onClick={handleDone} className={styles.doneButton}>Done</button>
      </div>
    </div>
  );

  const totalPrice = venue.price + convenienceFee;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Table Tennis (1)</h1>
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.bookingSummary}>
            <div>
              <p className={styles.bookingSummaryText}>Table Tennis</p>
              <p className={styles.bookingSummaryText}>13, June 2025</p>
            </div>
            <div>
              <p className={styles.bookingSummaryText}>04:00 PM to 05:00 PM</p>
            </div>
          </div>
          <div className={styles.priceDetailsCard}>
            <h2 style={{ fontWeight: 600, marginBottom: '24px' }}>Price Details</h2>
            <div className={styles.priceRow}>
              <p className={styles.priceLabel}>Court price per hour</p>
              <p className={styles.priceValue}>INR {venue.price.toFixed(2)}</p>
            </div>
            <div className={styles.priceRow}>
              <p className={styles.priceLabel}>Convenience Fee <span>See breakup</span></p>
              <p className={styles.priceValue}>INR {convenienceFee.toFixed(2)}</p>
            </div>
            <div className={`${styles.priceRow} ${styles.totalRow}`}>
              <p className={styles.priceLabel}>Total Price</p>
              <p className={styles.priceValue}>INR {totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handlePayment} className={styles.paymentButton}>PROCEED MAKE PAYMENT</button>
          </div>
        </div>
        <div className={styles.sidebar}>
          <ImageGallery />
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Payment; 