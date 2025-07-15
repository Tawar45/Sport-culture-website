// import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Rise of Pickleball: A Guide for Beginners',
    excerpt: 'Discover why pickleball is the fastest-growing sport and how you can get started today. We cover the rules, equipment, and basic strategies.',
    author: 'Alex Johnson',
    date: 'October 26, 2023',
  },
  {
    id: 2,
    title: 'Finding Your Perfect Court: What to Look For',
    excerpt: 'Not all courts are created equal. Learn about the different types of surfaces and amenities to find the perfect spot for your next game.',
    author: 'Maria Garcia',
    date: 'October 22, 2023',
  },
  {
    id: 3,
    title: 'The Cultural Impact of Local Sports',
    excerpt: 'Explore how local sports leagues and events do more than just entertain—they build communities and create lasting bonds.',
    author: 'Sam Chen',
    date: 'October 18, 2023',
  },
    {
    id: 4,
    title: 'Staying Active: Tips for a Healthy Lifestyle',
    excerpt: 'We share our favorite tips for incorporating more physical activity into your daily routine, from quick workouts to weekend sports.',
    author: 'Jane Doe',
    date: 'October 15, 2023',
  },
    {
    id: 5,
    title: 'The Art of Tennis: A Deep Dive into Strategy',
    excerpt: 'Go beyond the basics and learn advanced tennis strategies that can help you dominate the court and outsmart your opponents.',
    author: 'John Smith',
    date: 'October 11, 2023',
  },
    {
    id: 6,
    title: 'Community Spotlight: The Ahmadabad Badminton Club',
    excerpt: 'Get to know one of the most vibrant sports communities in the city. We interview the founders and members of the ABC.',
    author: 'Emily Jones',
    date: 'October 07, 2023',
  },
];

const Blogs = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>From the Blog</h1>
        <p className={styles.subtitle}>
          Insights, stories, and news from the world of sports and culture.
        </p>
      </header>
      <div className={styles.blogGrid}>
        {blogPosts.map(post => (
          <Link to={`/blogs/${post.id}`} key={post.id} className={styles.postCard}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <div className={styles.postMeta}>
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs; 