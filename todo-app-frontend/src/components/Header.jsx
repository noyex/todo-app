import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role'); 

  const handleDashboardClick = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="app-title">Todo App</Link>
        <nav className="header-nav">
          <ul>
            {token ? (
              <>
                <li><a href="#!" onClick={handleDashboardClick}>Dashboard</a></li>
                <li><a href="#!" onClick={handleProfileClick}>Profile</a></li>
                {role === 'ADMIN' && (
                  <li><Link to="/admin">Admin Panel</Link></li>
                )}
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/about">About</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;