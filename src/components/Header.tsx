import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import styles from './Header.module.css';
import cultureLogo from '../assets/culture-logo.png';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const fetchCities = async () => {
  const response = await fetch(`${API_URL}/api/city/list`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data.cities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };
    getCities();
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <header className={`w-full ${styles.header_container}`}>
      {/* Top Banner */}
      <div className={styles.top_banner}>
        <div className='text-center w-100'>
          <span>Book 1st Slot and Get Coupon for 2nd Slot</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className='container'>
        {/* Desktop Menu */}
        <nav className={`bg-white py-4 px-6 flex justify-between items-center ${styles.nav_container_desk}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={cultureLogo} alt="Sports Culture Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className={`${styles['nav_menu_container']} md:flex items-center space-x-6`}>
            <Link to="/" className="hover:text-[#6a1b9a] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#6a1b9a] transition-colors">About us</Link>
            <Link to="/venues" className="hover:text-[#6a1b9a] transition-colors">Venues</Link>
            <Link to="/games" className="hover:text-[#6a1b9a] transition-colors">Sports</Link>
            <Link to="/volunteer" className="hover:text-[#6a1b9a] transition-colors">Join Us</Link>
            <Link to="/blogs" className="hover:text-[#6a1b9a] transition-colors">Blogs</Link>
            <Link to="/contact" className="hover:text-[#6a1b9a] transition-colors">Contact</Link>
            {!user && (
              <Link to="/login" className="hover:text-[#6a1b9a] transition-colors">Login</Link>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className=" md:flex items-center gap-3">
            <select className="bg-gray-100 p-2 rounded-md border-0 text-gray-700 text-sm">
              {cities?.map((city) => (
                <option key={city.name}>{city?.name}</option>
              ))}
            </select>
            {user ? (
              <>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <Link to="/list-your-ground" className="ml-2 bg-[#F1A501] text-white px-5 py-2 rounded-[40px] font-semibold text-base hover:bg-[#d18e00] transition-colors">
                  List Your Ground
                </Link>
              </>
            ) : (
              <Link to="/list-your-ground" className="bg-[#fff] border-[#F1A501] border-1 text-[#000] px-5 py-2 rounded-[40px] font-semibold text-base no-underline">
                JOIN AS VENUE
              </Link>
            )}
          </div>

         
        </nav>
        <div  className={styles.mobile_menu}>
         {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <IconButton
                size="large"
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
            )}
            <button 
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
</div>
          {/* Mobile User Menu */}
          {user && (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
            {/* Mobile Menu Header */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2" onClick={handleMobileMenuToggle}>
                <img src={cultureLogo} alt="Sports Culture Logo" className="h-8" />
              </Link>
              <button 
                className={`${styles.hamburger} ${styles.active}`}
                onClick={handleMobileMenuToggle}
                aria-label="Close mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col p-6">
              {/* Location Selector */}
              <div className="mb-6">
                <select className="w-full bg-gray-100 p-3 rounded-lg border-0 text-gray-700 text-sm">
                  {cities.map((city) => (
                    <option key={city.name}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Home</Link>
                <Link to="/about" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>About us</Link>
                <Link to="/venues" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Venues</Link>
                <Link to="/games" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Games</Link>
                <Link to="/volunteer" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Join Us</Link>
                <Link to="/blogs" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Blogs</Link>
                <Link to="/contact" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Contact</Link>
                <Link to="/list-your-ground" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>List Your Ground</Link>
              </div>

              {/* Mobile Login/Admin Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {!user ? (
                  <>
                    <Link to="/login" className="block w-full bg-[#fff] border-[#F1A501] border-2 text-[#000] px-5 py-3 rounded-[40px] font-semibold text-base text-center" onClick={handleMobileMenuToggle}>
                      Login
                    </Link>
                    <Link to="/list-your-ground" className="block w-full mt-2 bg-[#F1A501] text-white px-5 py-3 rounded-[40px] font-semibold text-base text-center hover:bg-[#d18e00] transition-colors" onClick={handleMobileMenuToggle}>
                      List Your Ground
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/list-your-ground" className="block w-full mt-2 bg-[#F1A501] text-white px-5 py-3 rounded-[40px] font-semibold text-base text-center hover:bg-[#d18e00] transition-colors" onClick={handleMobileMenuToggle}>
                      List Your Ground
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        handleMobileMenuToggle();
                      }}
                      className="block w-full bg-red-500 text-white px-5 py-3 rounded-[40px] font-semibold text-base text-center mt-2"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;