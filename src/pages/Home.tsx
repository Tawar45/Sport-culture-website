import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { Tabs, Tab, Box } from '@mui/material';
import heroBackground from '../assets/hero-section-back-img.png';
import FilterSection from '../components/FilterSection';
import calendarImage from '../assets/calender.png';
import buildingimage from '../assets/buildings.png';
import tenisimage from '../assets/tablet-tenis.png';
import volleyimage from '../assets/volleyball-home.png';
import subsendimg from '../assets/sub-send-img.png';
import LogoSlider from '../components/LogoSlider';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL; // For Vite

// import sectionbackimage from '../assets/easy_section_back.png';
// import listimage from '../assets/Become-Partner-img.png';
// import { turfApi } from '../services/api';
export const fetchGames = async () => {
  const response = await fetch(`${API_URL}/api/games/list`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

type Game = {
  name: string;
  imageUrl: string;
  description: string;
  // add other properties if needed
};


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
  const fullHeading = '“Need of the hour” I “Join the revolution”';
  const  [typedIndex , setTypedIndex] =useState();
  const [categories, setCategories] = useState<Game[]>([]);
  
  useEffect(() => {
    const getGames = async () => {
      try {
        console.log("API_URL:", API_URL); // Debug
        const data = await fetchGames();
        console.log("Profile data:", data); // Debug
        setCategories(data.games);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
      };
      getGames();
 }, []);
  const handleChange = () => {
   
  }
  const handleSearch = () => {
   
  }
   



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
                      <img src={category.imageUrl} alt={category.name} />
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
      <section className={`py-8 sm:py-12 px-4 ${styles}`}>
        <div className={styles.venue_grid}>
          <div className={styles.venue_card} >
          <img
          id="venue-image"
          src="https://cdn.shopify.com/s/files/1/0900/7503/8066/files/Landing_page_1_1.jpg?v=1752340351"
          alt="Venue Name" className='img-fluid venue_img'
          />
          <div className={styles.venue_content}>
          <p className={styles.venue_type}>Football <span className={styles.hour_text}> 200rs per hour</span></p>
          <h3 className={styles.venue_name}>Greenfield Stadium</h3>
          <p className="venue_location">New York City</p>
          <div className={styles.venue_actions}>
          <button className={styles.view_details_btn} >
          <i className="fa-solid fa-eye"></i> View Details
          </button>
          <button className={styles.book_details_btn}>Book Now</button>
          </div>
          </div>
          </div>
          </div>
        {/* <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-12">Featured Venues</h2> */}
        {/* {loading ? (
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
        )} */}
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