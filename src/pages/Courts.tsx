// import React from 'react';
import styles from './Courts.module.css';

// Placeholder data for courts
const courtsData = [
  {
    id: 1,
    name: 'Championship Tennis Court',
    location: 'Ahmadabad Sports Complex',
    image: 'https://images.unsplash.com/photo-1596703531234-a692346e2b5d?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Community Basketball Court',
    location: 'Central Park, Indore',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Pro Badminton Hall',
    location: 'Victory Badminton Arena',
    image: 'https://images.unsplash.com/photo-1627292323267-34f7831445d5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Riverside Volleyball Court',
    location: 'Riverfront Sports Hub',
    image: 'https://images.unsplash.com/photo-1599499839423-74b638a8e2d7?w=800&auto=format&fit=crop&q=60'
  }
];

const Courts = () => {
  return (
    <div className={styles.bgWrap}>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Courts</h1>
        <div className={styles.courtsGrid}>
          {courtsData.map((court, idx) => (
            <div key={court.id} className={styles.courtCard} style={{ animationDelay: `${idx * 0.08 + 0.1}s` }}>
              <div className={styles.imageWrap}>
                <img src={court.image} alt={court.name} className={styles.courtImage} />
                <div className={styles.courtInfoOverlay}>
                  <h2 className={styles.courtName}>{court.name}</h2>
                  <p className={styles.courtLocation}>{court.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courts; 