// import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import './styles/custom.css';
import Header from './components/Header';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Culture from './pages/Culture';
import About from './pages/About';
import Courts from './pages/Courts';
import HeroBanner from './components/HeroBanner';
import SearchResults from './components/SearchResults';
import TurfList from './pages/TurfList';
import VenueListing from './pages/VenueListing';
import VenueDetail from './pages/VenueDetail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignup from './pages/CustomerSignup';
import Footer from './components/Footer';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import Games from './pages/Games';
import BackToTop from './components/BackToTop';
import ListYourGround from './pages/ListYourGround';
import Profile from './pages/Profile';
import BookingList from './pages/BookingList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
          <Header />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/about" element={<About />} />
              <Route path="/courts" element={<Courts />} />
              <Route path="/games" element={<Games />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/turf-booking" element={<HeroBanner />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/turfs" element={<TurfList />} />
              <Route path="/venues" element={<VenueListing />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/login" element={<CustomerLogin />} />
              <Route path="/signup" element={<CustomerSignup />} />
              <Route path="/list-your-ground" element={<ListYourGround />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<BookingList />} />
            </Routes>
          </div>
          <BackToTop />
          <Footer />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
