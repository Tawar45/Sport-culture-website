import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send data to an API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
        We love to hear from you. If you want to know about our work or just get in touch, we are sportingly willing to respond.
        </p>
      </header>
      <main className={styles.contentLayout}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.formLabel}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.formTextarea}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
        <aside className={styles.contactInfo}>
          <div className={styles.infoBlock}>
            <h3>Our Office</h3>
            <p>123 Sports Avenue<br />Ahmadabad, Gujarat, 452001</p>
          </div>
          <div className={styles.infoBlock}>
            <h3>Email Us</h3>
            <a href="mailto:contact@sportsculture.com">contact@sportsculture.com</a>
          </div>
          <div className={styles.infoBlock}>
            <h3>Call Us</h3>
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Contact; 