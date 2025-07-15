import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import styles from './Header.module.css';
import cultureLogo from '../assets/culture-logo.png';
import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { fetchCities } from '../services/api';
const API_URL = import.meta.env.VITE_API_URL; // For Vite

export const fetchCities = async () => {
    const response = await fetch(`${API_URL}/api/city/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
};

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cities, setCities] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data.cities); // Adjust if your API returns { cities: [...] }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };
    getCities();
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
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
    <header className="w-full">
      {/* Top Banner */}
      <div className={styles.top_banner}>
        <div className='text-center w-100'>
          <span className="flex-shrink-0">Book 1st Slot and Get Coupon for 2nd Slot</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className='container'>
        {/* Desktop Menu */}
        <nav className={`bg-white py-4 px-6 flex justify-between items-center ${styles.nav_container}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={cultureLogo} alt="Sports Culture Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles['nav_menu_container']}>
            <Link to="/" className="hover:text-[#6a1b9a]">Home</Link>
            <Link to="/about" className="hover:text-[#6a1b9a]">About us</Link>
            <Link to="/courts" className="hover:text-[#6a1b9a]">Venues</Link>
            <Link to="/games" className="hover:text-[#6a1b9a]">Sports</Link>
            <Link to="/volunteer" className="hover:text-[#6a1b9a]">Join Us</Link>
            <Link to="/blogs" className="hover:text-[#6a1b9a]">Blogs</Link>
            <Link to="/contact" className="hover:text-[#6a1b9a]">Contact</Link>
            {!user && (
              <Link to="/login" className="hover:text-[#6a1b9a]"> Login </Link>
            )}
          </div>

          {/* Desktop Right Section: Location and Login */}
          <div className="d-flex align-items-center gap-3">
            <select className="bg-gray-100 p-2 rounded-md border-0 text-gray-700 text-sm">
              {cities?.map((city) => (
                <option key={city.name}>{city?.name}</option>
              ))}
            </select>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
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
              <div className="flex items-center space-x-2">
                <Link to="/list-your-ground" className="bg-[#fff] border-[#F1A501] border-1 text-[#000] px-5 py-2 rounded-[40px] font-semibold text-base no-underline">
                  JOIN AS VENUE
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50">
            {/* Mobile Menu Header */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2" onClick={handleMobileMenuToggle}>
                <img src={cultureLogo} alt="Sports Culture Logo" className="h-8" />
              </Link>
              <button className="text-gray-700 focus:outline-none" onClick={handleMobileMenuToggle}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
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
                <Link to="/courts" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Courts</Link>
                <Link to="/games" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Games</Link>
                <Link to="/volunteer" className="text-lg font-medium hover:text-[#6a1b9a] py-2 border-b border-gray-100" onClick={handleMobileMenuToggle}>Volunteer</Link>
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