import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="animated-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="hero-section">
        <div className="content-wrapper">
          <h1 className="animated-title">
            Welcome to <span className="gradient-text">Todo App</span>
          </h1>
          <p className="hero-description">
            Streamline your productivity with our intuitive task management solution. 
            Organize, track, and accomplish your goals with elegance and efficiency.
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <div className="feature-text">Task Organization</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">Priority Management</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <div className="feature-text">Due Dates</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏷️</div>
              <div className="feature-text">Categories</div>
            </div>
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">
              <span className="btn-content">Sign In</span>
            </Link>
            <Link to="/register" className="btn btn-secondary">
              <span className="btn-content">Create Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;