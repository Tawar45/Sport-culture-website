import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './VenueListing.module.css';

const API_URL = import.meta.env.VITE_API_URL;

interface Venue {
  id: string;
  name: string;
  city: string;
  price: number;
  address: string;
  imageUrl: string;
}

const VenueListing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'pickleball');
  const [selectedCity] = useState(searchParams.get('city') || 'all');

  const sportOptions = [
    { label: 'Pickleball', value: 'pickleball', icon: '../src/assets/pickleball.svg' },
    { label: 'Tennis', value: 'tennis', icon: '../src/assets/tennis.svg' },
    { label: 'Table Tennis', value: 'table-tennis', icon: '../src/assets/table tennis.svg' },
    { label: 'Basketball', value: 'basketball', icon: '../src/assets/basketball.svg' },
    { label: 'Volleyball', value: 'volleyball', icon: '../src/assets/volleyball.svg' },
    { label: 'Badminton', value: 'badminton', icon: '../src/assets/badminton.svg' },
  ];

  useEffect(() => {
    fetchVenues();
  }, [selectedSport, selectedCity]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/ground/list`);
      if (!response.ok) throw new Error('Failed to fetch venues');
      
      const data = await response.json();
      setVenues(data.grounds);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching venues:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (id: string) => {
    navigate(`/venues/${id}`);
  };

  const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
    return (
      <div className={styles.venue_card}>
        <div className={styles.venue_img_box}>
          <img
            src={venue?.imageUrl}
            alt={venue?.name}
            className={`img-fluid ${styles.venue_img}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-venue.jpg';
            }}
          />
        </div>
        
        <div className={styles.venue_content}>
          <p className={styles.venue_type}>
            {venue?.name} <span>|</span> <span className={styles.hour_text}> ₹{venue?.price}/hour</span>
          </p>
          <p className="venue_location">
            {venue?.address} {venue?.city}
          </p>

          <div className={styles.venue_actions}>
            <button className={styles.view_details_btn} onClick={() => viewDetails(venue.id)}>
              <i className="fa-solid fa-eye"></i> View Details
            </button>
            <button className={styles.book_details_btn}>Book Now</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`container pt-5 pb-5 ${styles.myCustomWrapper}`}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          Sports Venues in {selectedCity === 'all' ? 'All Cities' : selectedCity}
        </h1>
        <p className={styles.pagedes}>Chhipa Bakhal, Main Road Shanti Nagar Jain Colony, Indore, Madhya Pradesh - 452001</p>
      </div>

      <div className={styles.venue_list_container}>
            <div className={styles.sportFilterList}>
              {sportOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={`${styles.sportItem} ${selectedSport === opt.value ? styles.active : ''}`}
                  onClick={() => setSelectedSport(opt.value)}
                >
                  <img src={opt.icon} alt={opt.label} />
                  <span>{opt.label}</span>
                </div>
              ))}
            </div>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : venues.length === 0 ? (
          <div className={styles.noVenues}>No venues found matching your criteria.</div>
        ) : (
          <div className={styles.venuesGrid}>
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueListing;