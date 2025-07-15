// import React from 'react';
import cultureLogo from '../assets/our-parter-img01.png';
import reactLogo from '../assets/our-parter-img02.png';
import buildings from '../assets/our-parter-img03.png';
import calendar from '../assets/our-parter-img04.png';
import heroBackground from '../assets/our-parter-img05.png';
import styles from './LogoSlider.module.css'; // Import the new CSS module

const originalLogos = [
  { src: cultureLogo, alt: 'Company Logo 1' },
  { src: reactLogo, alt: 'Company Logo 2' },
  { src: buildings, alt: 'Company Logo 3' },
  { src: calendar, alt: 'Company Logo 4' },
  { src: heroBackground, alt: 'Company Logo 5' },
];

// Duplicate logos to create a seamless loop effect
const logos = [...originalLogos, ...originalLogos];

const LogoSlider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4">
      <div className={styles.sliderContainer}> {/* Apply outer container styles */}
        <div className={styles.logoTrack}> {/* Apply animation track styles */}
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className={`${styles.logoItem} img-fluid`} // Added img-fluid Bootstrap class
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider; 