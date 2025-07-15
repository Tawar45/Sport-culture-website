import React, { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      style={{
        position: 'fixed',
        right: 32,
        bottom: 32,
        zIndex: 1000,
        padding: '14px 32px',
        borderRadius: 32,
        background: '#F1A501',
        color: '#fff',
        fontWeight: 600,
        fontSize: 18,
        border: 'none',
        boxShadow: '0 4px 24px #F1A50155',
        cursor: 'pointer',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s, transform 0.3s',
        transform: visible ? 'translateY(0)' : 'translateY(40px)'
      }}
      onClick={handleScrollTop}
      aria-label="Back to Top"
    >
      ↑ Back to Top
    </button>
  );
};

export default BackToTop; 