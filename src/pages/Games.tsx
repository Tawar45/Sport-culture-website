import { useRef, useState, useEffect } from 'react';
import styles from './Games.module.css';

const games = [
  {
    name: 'Tennis',
    icon: '🎾',
    desc: 'Classic court game for all ages. Test your skills and stamina in singles or doubles.'
  },
  {
    name: 'Badminton',
    icon: '🏸',
    desc: 'A fast-paced racquet sport played on a rectangular court. Great for agility and fun!'
  },
 
  {
    name: 'Table Tennis',
    icon: '🏓',
    desc: 'Ping-pong fun! Quick reflexes and sharp focus make this a favorite indoor sport.'
  },
  {
    name: 'Pickleball',
    icon: '🥒',
    desc: 'A blend of tennis, badminton, and ping-pong. Easy to learn, hard to master!'
  },
  // {
  //   name: 'Volleyball',
  //   icon: '🏐',
  //   desc: 'Team up and spike! Enjoy this energetic sport on sand or court.'
  // },
  // {
  //   name: 'Basketball',
  //   icon: '🏀',
  //   desc: 'Dribble, shoot, score! Fast breaks and teamwork make this a crowd favorite.'
  // }
];

const Games = () => {
  const lastCardRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!lastCardRef.current) return;
      const rect = lastCardRef.current.getBoundingClientRect();
      setShowTop(rect.top < window.innerHeight && rect.bottom > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageContainer}>
      {/* <header className={styles.header}>
        <h1 className={styles.title}>Games</h1>
        <p className={styles.subtitle}>
          Explore our collection of sports and games—each with its own magic, just like a Ghibli adventure.
        </p>
      </header> */}
      <div className={styles.gamesGrid}>
        {games.map((game, idx) => (
          <div
            className={styles.gameCard}
            key={game.name}
            ref={idx === games.length - 1 ? lastCardRef : undefined}
          >
            <div
              style={{
                fontSize: '4.5rem',
                marginBottom: '18px',
                borderRadius: '20px',
                background: '#f5f5f7',
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
                border: '2px solid #c9e7f2',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
            >
              {game.icon}
            </div>
            <div className={styles.gameName}>{game.name}</div>
            <div className={styles.gameDesc}>{game.desc}</div>
          </div>
        ))}
      </div>
      <button
        className={styles.backToTop}
        style={{ position: 'fixed', right: 32, bottom: 32, zIndex: 1000, padding: '14px 32px', borderRadius: 32, background: '#F1A501', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', boxShadow: '0 4px 24px #F1A50155', cursor: 'pointer', pointerEvents: showTop ? 'auto' : 'none', opacity: showTop ? 1 : 0, transition: 'opacity 0.3s, transform 0.3s', transform: showTop ? 'translateY(0)' : 'translateY(40px)' }}
        onClick={handleScrollTop}
        aria-label="Back to Top"
      >
        ↑ Back to Top
      </button>
    </div>
  );
};

export default Games; 