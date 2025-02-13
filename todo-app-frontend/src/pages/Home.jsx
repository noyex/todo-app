import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Todo App</h1>
        <p className="hero-description">
          Streamline your productivity with our intuitive task management solution. 
          Organize, track, and accomplish your goals with elegance and efficiency.
        </p>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-primary">Sign In</Link>
          <Link to="/register" className="btn btn-secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;