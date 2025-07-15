import { useRef, useState, useEffect } from 'react';
import styles from './Games.module.css';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL; // For Vite
  
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

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
   useEffect(() => {
  const getGames = async () => {
    try {
      console.log("API_URL:", API_URL); // Debug
      const data = await fetchGames();
      console.log("Profile data:", data); // Debug
      setGames(data.games);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
   };
   getGames();
  }, []);
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gamesGrid}>
        {games.map((game) => (
          <div
            className={styles.gameCard}
            key={game.name}
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px' }}
            />
            <div className={styles.gameName}>{game.name}</div>
            <div className={styles.gameDesc}>{game.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games; 