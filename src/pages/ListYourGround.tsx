import React, { useState } from 'react';
import styles from './ListYourGround.module.css';

const gameOptions = [
  'Pickleball',
  'Tennis',
  'Table Tennis',
  'Basketball',
  'Volleyball',
  'Badminton',
];

const ListYourGround: React.FC = () => {
  const [form, setForm] = useState({
    ownerName: '',
    businessName: '',
    mobile: '',
    city: '',
    address: '',
    games: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (game: string) => {
    setForm((prev) => ({
      ...prev,
      games: prev.games.includes(game)
        ? prev.games.filter((g) => g !== game)
        : [...prev.games, game],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.listGroundBg}>
      <div className={styles.formContainer}>
        {/* <h2 className={styles.title}>Quick List Your Ground</h2> */}
        <h2 className={styles.title}>Quick JOIN AS VENUE</h2>
        <p className={styles.subtitle}>
          Please fill details below to list your venue on Sports Culture Platform.<br />
          Our executive will call & confirm time availability information.
        </p>
        {submitted ? (
          <div className={styles.successMsg}>
            <h3>Thank you!</h3>
            <p>Your ground has been submitted for review. We will contact you soon.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Name of Ground / Court Owner Name</label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Business Name / Club Name</label>
              <input name="businessName" value={form.businessName} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Available Games in Your Ground</label>
              <div className={styles.gamesRow}>
                {gameOptions.map((game) => (
                  <label key={game} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={form.games.includes(game)}
                      onChange={() => handleCheckbox(game)}
                      className={styles.customCheckbox}
                    />
                    <span className={styles.checkmark}></span>
                    <span>{game}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className={styles.submitBtn} type="submit">SUBMIT</button>
          </form>
        )}
      </div>
      <section className={styles.whySection}>
        <div className={styles.whyContent}>
          <div className={styles.whyIcon}>
            <span role="img" aria-label="heart" className={styles.whyHeart}>❤️</span>
          </div>
          <div>
            <h3 className={styles.whyTitle}>Why It Matters</h3>
            <p className={styles.whyText}>
              <span className={styles.whyHighlight}>Because sport is for everyone.</span><br />
              We believe that true sports culture grows not in stadiums, but in everyday lives.<br />
              <span className={styles.whyHighlight}>Let's reclaim play. Together.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListYourGround; 