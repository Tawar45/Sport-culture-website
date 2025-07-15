import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Tabs, Tab, Box } from '@mui/material';
import {
  Card,
  CardMedia,
  // CardContent,
  // Typography,
  // Rating,
  // Chip,
} from '@mui/material';
import pickleballIcon from '../assets/Pickleball.png';
import tennisIcon from '../assets/Tennis.png';
import tableTennisIcon from '../assets/Table Tennis.png';
// import basketballIcon from '../assets/Basketball.png';
// import volleyballIcon from '../assets/Volleyball.png';
import badmintonIcon from '../assets/Badminton.png';
import heroBackground from '../assets/hero-section-back-img.png';
import FilterSection from '../components/FilterSection';

import calendarImage from '../assets/calender.png';
import buildingimage from '../assets/buildings.png';
import tenisimage from '../assets/tablet-tenis.png';
import volleyimage from '../assets/volleyball-home.png';
import subsendimg from '../assets/sub-send-img.png';
// import eyeicon from '../assets/eye-icon.svg';
import LogoSlider from '../components/LogoSlider';
import { motion } from 'framer-motion';
// import sectionbackimage from '../assets/easy_section_back.png';
// import listimage from '../assets/Become-Partner-img.png';
// import { turfApi } from '../services/api';

interface Venue {
  id: number;
  name: string;
  city: string;
  sport: string;
  price: number;
  rating: number;
  images: string[];
  availableSlots: { date: string; time: string }[];
  facilities: string[];
  location: { lat: number; lng: number };
  address: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    {
      name: 'Tennis',
      icon: tennisIcon
    },
    {
      name: 'Badminton',
      icon: badmintonIcon
    },
    {
      name: 'Table Tennis',
      icon: tableTennisIcon
    },
    {
      name: 'Pickleball',
      icon: pickleballIcon
    },
   
   
    // {
    //   name: 'Basketball',
    //   icon: basketballIcon
    // },
    // {
    //   name: 'Volleyball',
    //   icon: volleyballIcon
    // },
   
  ];

  // Add typewriter effect for hero heading
  const fullHeading = '“Need of the hour” I “Join the revolution”';
  const [typedIndex, setTypedIndex] = useState(0);

  useEffect(() => {
    setTypedIndex(0);
    const interval = setInterval(() => {
      setTypedIndex(prev => {
        if (prev < fullHeading.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchInitialVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3000/api/turfs/search?sport=pickleball`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Initial data:', data); // Debug log

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        setVenues(data);
      } catch (err: any) {
        console.error('Error fetching initial venues:', err);
        setError('Failed to fetch venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialVenues();
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveCategory(newValue);
    const sportName = categories[newValue].name.toLowerCase();
    // Convert space to hyphen for table tennis
    const selectedSport = sportName === 'table tennis' ? 'table-tennis' : sportName;

    // Immediately fetch venues with the new sport filter
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3000/api/turfs/search?sport=${selectedSport}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data); // Debug log

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        setVenues(data);
      } catch (err: any) {
        console.error('Error fetching venues:', err);
        setError('Failed to fetch venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  };

  const handleSearch = async (filters: {
    city: string;
    sport: string;
    date: string;
    time: string;
  }) => {
    try {
      const params = new URLSearchParams();
      if (filters.sport !== 'all') params.append('sport', filters.sport);
      if (filters.city !== 'all') params.append('city', filters.city);
      if (filters.date) params.append('date', filters.date);
      if (filters.time) params.append('time', filters.time);

      navigate(`/venues?${params.toString()}`);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const VenueCard = ({ venue }: { venue: Venue }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const handleImageError = () => {
      setImageError(true);
    };

    const handleViewDetails = () => {
      navigate(`/venues/${venue.id}`);
    };

    const fallbackImage = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=60";

    return (
      <Card
        sx={{
          maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={imageError ? fallbackImage : venue.images[currentImageIndex]}
          alt={venue.name}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % venue.images.length)}
        />
        <div className={styles.venue_content}>
          <p className={styles.venue_type}>{venue.sport}</p>
          <h3 className={styles.venue_name}>{venue.name}</h3>
          <p className={styles.venue_location}>{venue.city}</p>
          <div className={styles.venue_actions}>
            <button className={styles.view_details_btn} onClick={handleViewDetails}>
            <i className='fa-solid fa-eye'></i> View Details
            
            </button>
            <button className={styles.book_now_btn}>
              Book Now
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className={`${styles.heroSection}`} style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className={`${styles.heroTitle} `} style={{ letterSpacing: 2 }}>
              {fullHeading.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, color: '#f1a501', textShadow: '0 0 16px #f1a501, 0 0 32px #f1a501' }}
                  animate={i < typedIndex ? {
                    opacity: [0, 1, 1],
                    color: ['#f1a501', '#fff', '#fff'],
                    textShadow: [
                      '0 0 16px #f1a501, 0 0 32px #f1a501',
                      '0 0 8px #fff',
                      'none'
                    ],
                    scale: i === typedIndex - 1 ? [1.3, 1] : 1,
                  } : {
                    opacity: 0,
                    color: '#f1a501',
                    textShadow: '0 0 16px #f1a501, 0 0 32px #f1a501',
                    scale: 1
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: i * 0.04 },
                    color: { duration: 0.5, delay: i * 0.04 + 0.2 },
                    textShadow: { duration: 0.5, delay: i * 0.04 + 0.2 },
                    scale: { duration: 0.18 }
                  }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 'inherit'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
            <p className={`${styles.heroDescription} mb-5 text-center`}>
            NEED OF THE HOUR
            </p>
          </div>

          <FilterSection onSearch={handleSearch} />

          <p className={`${styles.heroDescription} mt-5 text-center`}>
          JOIN THE REVOLUTION
            </p>
        </div>
      </section>

      {/* Sports Categories Section */}
      <section className={`py-8 sm:py-12 px-4 ${styles.sport_categories}`}>
        <div >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeCategory}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              className={styles.hide_scrollbar}
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#9333ea',
                  height: 3,
                },
                '& .MuiTabs-root': {
                  display: 'flex',
                  justifyContent: 'center',
                },
                '& .MuiTabs-flexContainer': {
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  '@media (max-width: 768px)': {
                    gap: '5px',
                  },
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: { xs: '80px', sm: '100px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  color: '#4b5563',
                  '&.Mui-selected': {
                    color: '#9333ea',
                    fontWeight: 600,
                  },
                },
              }}
            >
              {categories.map((category, index) => (
                <Tab
                  key={category.name}
                  icon={
                    <div className={styles.tab_img_box}>
                      <img src={category.icon} alt={category.name} />
                    </div>
                  }
                  label={category.name}
                  id={`sport-tab-${index}`}
                  aria-controls={`sport-tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>
        </div>
      </section>

      {/* Featured Venues/Courts Section */}
      <section className={`py-8 sm:py-12 px-4 ${styles.featured_venues}`}>
        {/* <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-12">Featured Venues</h2> */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No venues found</p>
          </div>
        ) : (
          <div className={`${styles.venue_grid} ${styles.venue_slider}`}>
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>
      <section className={styles.easy_section} >
        <div className='container'>
          <div className='text-center'>
            <p className={styles.sub_heading}>
              {/* SportsCulture Easy Spot Booking */}
              Get ready to play
            </p>
            <h2 className={styles.easy_sec_ti}>Easy 4 steps to book your venue</h2>
          </div>
          <div className={styles.easy_container}>
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-white">
                <div className={styles.easy_box}>
                  <div className={styles.easy_img}>
                    <img src={buildingimage} alt="Calendar"  />
                  </div>
                  <h3 className={styles.easy_title}>Select City</h3>
                  <p className={styles.easy_des}>Select you city or where you are to play your fav sports</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white">
                <div  className={styles.easy_box}>
                <div className={styles.easy_img}>
                  <img src={tenisimage} alt="Calendar" />
                </div>
                <h3 className={styles.easy_title}>Select Games</h3>
                <p className={styles.easy_des}>Select your preferred games to get listing of court and club</p>
              </div>
              </div>
              <div className="p-4 rounded-lg bg-white">
              <div  className={styles.easy_box}>
                <div className={styles.easy_img}>
                  <img src={volleyimage} alt="Calendar" />
                </div>
                <h3 className={styles.easy_title}>Choose Venue</h3>
                <p className={styles.easy_des}>Get list of academy and court and choose as per your convenience</p>
              </div>
              </div>
              <div className="p-4 rounded-lg bg-white">
              <div  className={styles.easy_box}>
                <div className={styles.easy_img}>
                  <img src={calendarImage} alt="Calendar" />
                </div>
                <h3 className={styles.easy_title}>Book Slot</h3>
                <p className={styles.easy_des}>After choosing the destination, book slot & enjoy your sport</p>
              </div>

              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.download_btn} mt-4`}>
          <button>Download App</button>
        </div>
      </section>
      
     <section>
      <LogoSlider />
     </section>

     <section className='pt-5 pb-5'>
      <div className='container'>
          <div className={styles.subscription_box}>
            <img src= {subsendimg} className={styles.send_img} />
                <div className={styles.box_content}>
                    <p className={styles.sub_des}>Subscribe to get information, latest news and other interesting offers about Sports Culture</p>
                    <div className='d-flex justify-content-center gap-3 mt-5'><input placeholder='Your email'  className={styles.sub_input}/>
                     <button className={styles.sub_btn}>Subscribe</button> </div>
                </div>
          </div>

      </div>
     </section>
    </div>
  );
};

export default Home;