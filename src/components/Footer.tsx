import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is available
import { Container, Row, Col } from 'react-bootstrap';
import cultureLogo from '../assets/culture-logo.png'; // Assuming you have a logo
import googleplay from  '../assets/google-play.png'; 
import appstore from  '../assets/app-store.png'; 
import facebookicon from  '../assets/social-fac.png'; 
import instaicon from  '../assets/social-insta.png'; 
import twiticon from  '../assets/social-twit.png'; 
// import FilterSection from './FilterSection';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  const [ctaEmail, setCtaEmail] = React.useState('');

  return (
    <footer className="bg-light py-5 mt-auto" style={{ backgroundColor: '#f8f9fa', position: 'relative' , zIndex: '2' }}>
      <Container>
        <Row>
          {/* Column 1: Logo and Description */}
          <Col md={3} sm={6} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <img src={cultureLogo} alt="Sports Culture Logo" style={{ height: '40px', marginRight: '10px' }} />
            </div>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.
            </p>
            <form className={styles.ctaMailForm} onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
              <motion.input
                type="email"
                placeholder="Your email"
                required
                value={ctaEmail}
                onChange={e => setCtaEmail(e.target.value)}
                whileFocus={{ scale: 1.06, boxShadow: '0 6px 24px #6a1b9a33' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={styles.ctaInput}
                style={{ paddingRight: ctaEmail ? 48 : undefined }}
              />
              {ctaEmail && (
                <button
                  type="submit"
                  className={styles.ctaSendBtn}
                  aria-label="Subscribe"
                  style={{ position: 'absolute', right: 56, top: '50%', transform: 'translateY(-50%)' }}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              )}
            </form>
          </Col>

          {/* Column 2: Company Links */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><a href="about" className="text-muted text-decoration-none">About Us</a></li>
              <li><a href="games" className="text-muted text-decoration-none">Sports</a></li>
              <li><a href="#sctc" className="text-muted text-decoration-none">T & C</a></li>
            </ul>
          </Col>

          {/* Column 3: Contact Links */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li><a href="#help" className="text-muted text-decoration-none">Help/FAQ</a></li>
              <li><a href="#press" className="text-muted text-decoration-none">Press</a></li>
              <li><a href="#affiliates" className="text-muted text-decoration-none">Affiliates</a></li>
            </ul>
          </Col>

          {/* Column 4: More Links */}
          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">More</h5>
            <ul className="list-unstyled">
              <li><a href="#ambassador" className="text-muted text-decoration-none">Ambassador</a></li>
              <li><a href="#games" className="text-muted text-decoration-none">Games</a></li>
              <li><a href="#collaboration" className="text-muted text-decoration-none">Collaboration</a></li>
            </ul>
          </Col>

          {/* Column 5: Social Media and App Download */}
          <Col md={3} sm={12}>
            <div className="d-flex  mb-3">
              {/* Social Icons - Replace with actual icons/components */}
              <a href="#" className="">
                <img src={facebookicon}  alt='facebook'/>
              </a>
              <a href="#" className="">
                <img src={instaicon}  alt='instagram'/>
                </a>
              <a href="#" className="">
              <img src={twiticon}  alt='twiter'/>
                </a>
            </div>
            <p className=" text-muted mb-3">Discover our app</p>
            <div className="d-flex flex-column flex-md-row  gap-2">
              {/* App Store Buttons - Replace with actual images/links */}
              <a href="#" className="d-block"><img src={googleplay} alt="Google Play" style={{ height: '40px' }} /></a>
              <a href="#" className="d-block"><img src={appstore} alt="App Store" style={{ height: '40px' }} /></a>
            </div>
          </Col>
        </Row>
        <hr className="mt-5" />
        <p className="text-center text-muted mb-0" style={{ fontSize: '0.8rem' }}>
          &copy; {new Date().getFullYear()} Sports Culture. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer; 