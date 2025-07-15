// import React from 'react';
import styles from './Header.module.css';

const TopBanner = () => {
  return (
    <div className={styles.top_banner}>
      <div className={styles['culture-container']}>
        <span className="flex-shrink-0">Book your slot at nearest location - 30% OFF using SAVE30</span>
        <span className="flex-shrink-0">Book 1st Slot and Get Coupon for 2nd Slot</span>
        <span className="flex-shrink-0">Book your slot at nearest location - 30% OFF using SAVE30</span>
      </div>
    </div>
  );
};

export default TopBanner; 