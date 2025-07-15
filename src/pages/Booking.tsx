import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Booking.module.css';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [duration, setDuration] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [grounds, setGrounds] = useState<any[]>([]);
  const [selectedGround, setSelectedGround] = useState<string>("");
  const [courts, setCourts] = useState<any[]>([]);

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

  useEffect(() => {
    fetch("http://localhost:5000/api/grounds/with-courts") // apne backend ka URL daalein
      .then(res => res.json())
      .then(data => setGrounds(data));
  }, []);

  const handleDurationChange = (amount: number) => {
    setDuration((prev) => Math.max(1, prev + amount));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleGroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groundId = e.target.value;
    setSelectedGround(groundId);
    const ground = grounds.find(g => g._id === groundId);
    setCourts(ground ? ground.courts : []);
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

  const BookingPopup = () => (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3 className={styles.popupTitle}>Booking at {venue.name}</h3>
          <button onClick={() => setShowPopup(false)} className={styles.popupCloseButton}>&times;</button>
        </div>
        <div className={styles.popupBookingDetails}>
          <div>
            <p className={styles.popupBookingText}>Table Tennis</p>
            <p className={styles.popupBookingText}>13, June 2025</p>
          </div>
          <div>
            <p className={styles.popupBookingText}>04:00 PM to 05:00 PM</p>
          </div>
        </div>
        <div className={styles.popupPaymentInfo}>
          {/* <p className={styles.popupPaymentLabel}>PAY FOR BOOK</p> */}
          <p className={styles.popupPaymentLabel}>Payable Amount</p>
          <p className={styles.popupPrice}>INR {venue.price * duration}</p>
        </div>
        <button className={styles.bookButton} onClick={() => navigate(`/payment/${id}`)}>PAY NOW & BOOK SLOT</button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{venue.name}</h1>
      <p className={styles.address}>{venue.address}</p>
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <form className={styles.form} onSubmit={handleBookingSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Sports</label>
              <select className={styles.formInput}>
                <option>Table Tennis</option>
                <option>Badminton</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date</label>
              <div className={styles.inputWithIcon}>
                <input type="date" className={styles.formInput} defaultValue="2025-06-11" />
                <span className={styles.inputIcon}>📅</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Start Time</label>
              <div className={styles.inputWithIcon}>
                <input type="time" className={styles.formInput} defaultValue="18:00" />
                <span className={styles.inputIcon}>🕒</span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Duration</label>
              <div className={styles.durationControl}>
                <button type="button" className={styles.durationButton} onClick={() => handleDurationChange(-1)}>-</button>
                <span className={styles.durationDisplay}>{duration} hr</span>
                <button type="button" className={styles.durationButton} onClick={() => handleDurationChange(1)}>+</button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Ground</label>
              <select
                className={styles.formInput}
                value={selectedGround}
                onChange={handleGroundChange}
              >
                <option value="">--Select Ground--</option>
                {grounds.map(ground => (
                  <option key={ground._id} value={ground._id}>
                    {ground.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Court</label>
              <select className={styles.formInput}>
                <option>--Select Court--</option>
                {courts.map(court => (
                  <option key={court._id} value={court._id}>
                    {court.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.bookButton}>Book Your Slot Now</button>
          </form>
        </div>
        <div className={styles.sidebar}>
          <ImageGallery />
        </div>
      </div>
      {showPopup && <BookingPopup />}
    </div>
  );
};

export default Booking; 