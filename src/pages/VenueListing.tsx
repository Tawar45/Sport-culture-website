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


  const CustomSportDropdown: React.FC<{
  selectedSport: string;
  onSelect: (value: string) => void;
}> = ({ selectedSport, onSelect }) => {
  const [open, setOpen] = useState(false);
  const selected = sportOptions.find(opt => opt.value === selectedSport) || sportOptions[0];

  return (
    <div className={styles.customDropdownWrapper}>
      <label>Sport</label>
      <div
        className={styles.customDropdown}
        onClick={() => setOpen(!open)}
      >
        <img src={selected.icon} alt={selected.label} />
        <span>{selected.label}</span>
        <span className={styles.arrow}>▼</span>
      </div>

      {open && (
        <ul className={styles.customDropdownMenu}>
          {sportOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`${styles.dropdownItem} ${
                selectedSport === opt.value ? styles.active : ''
              }`}
            >
              <img src={opt.icon} alt={opt.label} />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

  const sportOptions = [
  { label: 'Pickleball', value: 'pickleball', icon: '../src/assets/pickleball.svg' },
  { label: 'Tennis', value: 'tennis', icon: '../src/assets/tennis.svg' },
  { label: 'Table Tennis', value: 'table-tennis', icon: '../src/assets/tabletennis.svg' },
  { label: 'Basketball', value: 'basketball', icon: '../src/assets/basketball.svg' },
  { label: 'Volleyball', value: 'volleyball', icon: '../src/assets/volleyball.svg' },
  { label: 'Badminton', value: 'badminton', icon: '../src/assets/badminton.svg' },
];

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
    <div className={`container ${styles.myCustomWrapper}`}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          Sports Venues in {selectedCity === 'all' ? 'All Cities' : selectedCity}
        </h1>
      </div>
      <div className={styles.venue_list_container}>
        <div className={styles.filters}>
          <div className={styles.filterGrid}>
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

          
          </div>

      
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