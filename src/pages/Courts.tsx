// import React from 'react';
import styles from './Courts.module.css';
import  { useState ,useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL; // For Vite

  type Ground = {
    id:string;
    name: string;
    imageUrl: string;
    city:string;
    address:string;
    description: string;
    openTime:string;
    closeTime:string;
    // add other properties if needed
  };

  const Courts = () => {
    const [ground, setGround] =useState<Ground[]>([]);

    useEffect(() => {
      const getGround = async () => {
        try {
          const response = await fetch(`${API_URL}/api/ground/list`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setGround(data.grounds);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
        };
        getGround();
    }, []);
  
  return (
    <div className={styles.bgWrap}>
      <div className={styles.container}>
        <h1 className={styles.title}>Venue</h1>
        <div className={styles.courtsGrid}>
          {ground.map((ground, idx) => (
            <div key={ground.id} className={styles.courtCard} style={{ animationDelay: `${idx * 0.08 + 0.1}s` }}>
              <div className={styles.imageWrap}>
                <img src={ground.imageUrl} alt={ground.name} className={styles.courtImage} />
                <div className={styles.courtInfoOverlay}>
                  <h2 className={styles.courtName}>{ground.name}</h2>
                  <p className={styles.courtLocation}>{ground.address}</p>
                  <p className={styles.courtLocation}>{ground.city}</p>
                  <p className={styles.courtLocation}>{ground.description}</p>
                  <p className={styles.courtLocation}>Opening Time {ground.openTime}</p>
                  <p className={styles.courtLocation}>Closing Time {ground.closeTime}</p>
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