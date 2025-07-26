import React, { useState } from 'react';
import styles from './Volunteer.module.css';
const API_URL = import.meta.env.VITE_API_URL; // For Vite

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/volunteer/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          area_of_interest: formData.interest,
          message: formData.message,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit');
      }
      setSubmitted(true);
      // setFormData({ name: '', email: '', phone: '', city: '', interest: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Become a Volunteer</h1>
        <p className={styles.heroSubtitle}>
          Join our mission to make sports and culture accessible to everyone. Your passion and time can make a real difference!
        </p>
      </section>

      <section className={styles.infoSection}>
        <h2 className={styles.infoTitle}>Why Volunteer With Us?</h2>
        <p className={styles.infoText}>
          Volunteering is a great way to give back, meet new people, and develop new skills. Whether you love organizing events, coaching, or simply want to help out, we have a place for you in our community.
        </p>
      </section>

      <section className={styles.formSection}>
        <h2 className={styles.infoTitle}>Request</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">Name</label>
            <input
              className={styles.formInput}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">Email</label>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="phone">Phone</label>
            <input
              className={styles.formInput}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="city">City</label>
            <input
              className={styles.formInput}
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="interest">Area of Interest</label>
            <select
              className={styles.formInput}
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="event">Event Organization</option>
              <option value="coaching">Coaching/Training</option>
              <option value="promotion">Promotion & Outreach</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="message">Message</label>
            <textarea
              className={styles.formTextarea}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
        {submitted && <div className={styles.successMessage}>Thank you for volunteering! We'll be in touch soon.</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </section>
    </div>
  );
};

export default Volunteer; 