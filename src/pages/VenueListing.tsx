import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './VenueListing.module.css'; // Import CSS modules

const API_URL = import.meta.env.VITE_API_URL;

interface Venue {
  id: string;
  name: string;
  city: string;
  sport: string;
  price: number;
  rating: number;
  address: string;
  images: string[];
  imageUrl: string;
  availableSlots: string[];
  facilities: string[];
  location: {
    lat: number;
    lng: number;
  };
  amenityNames: { id: number; name: string }[];
}

const VenueListing: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'all');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || '');
  const [selectedTime, setSelectedTime] = useState(searchParams.get('time') || '');

  const sports = ['all', 'badminton', 'volleyball', 'basketball', 'table-tennis', 'tennis', 'pickleball'];
  const cities = ['Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];

  useEffect(() => {
    fetchVenues();
  }, [selectedSport, selectedCity, selectedDate, selectedTime]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSport !== 'all') params.append('sport', selectedSport);
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (selectedDate) params.append('date', selectedDate);
      if (selectedTime) params.append('time', selectedTime);

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

  const handleFilter = () => {
    fetchVenues();
  };

  const viewDetails = (id: string) => {
    navigate(`/venues/${id}`);
  };

  const capitalizeSportName = (sport: string): string => {
    return sport.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
  };

  const generateStars = (rating: number): string => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    
    // Half star
    if (hasHalfStar) {
      stars += '☆';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    
    return stars;
  };

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  return (
    <div className={styles.venue_card}>
      <img
        id="venue-image"
        src={venue?.imageUrl}
        alt={venue?.name}
        className="img-fluid venue_img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-venue.jpg';
        }}
      />
      
      <div className={styles.venue_content}>
         <p className={styles.venue_type}>PICKLE BALL<span className={styles.hour_text}> 200rs per hour</span></p>
        <p className={styles.venue_type}>
          {venue?.name}
          <span className={styles.hour_text}> ₹{venue?.price}/hour</span>
        </p>

        <h3 className={styles.venue_name}>{venue?.name}</h3>
        
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          Sports Venues in {selectedCity === 'all' ? 'All Cities' : selectedCity}
        </h1>
      </div>
      <div className={styles.venue_list_container}>
        <div className={styles.filters}>
          <div className={styles.filterGrid}>
            <div className={styles.formGroup}>
              <label>Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="all">All Sports</option>
                {sports.filter(sport => sport !== 'all').map((sport) => (
                  <option key={sport} value={sport}>
                    {capitalizeSportName(sport)}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className={styles.formGroup}>
              <label>City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div> */}
          </div>

          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`} onClick={handleFilter}>
            Apply Filters
          </button>
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