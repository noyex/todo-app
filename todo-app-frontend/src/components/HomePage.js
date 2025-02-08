import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import '../styles/HomePage.css';
import logo from '../icon/done.png';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Todo App Logo" className="app-logo" />
        <h1>Todo App</h1>
        <nav>
          <Link to="/register" className="nav-link">Rejestracja</Link>
          <Link to="/login" className="nav-link">Logowanie</Link>
        </nav>
      </header>
      <main className="home-main">
        <section className="intro-section">
          <h2>Zarządzaj swoimi zadaniami</h2>
          <p className="intro-text">
            Witaj w aplikacji Todo App, gdzie możesz tworzyć własne zadania do zrobienia. Podaj czas, opis i zarządzaj swoimi zadaniami w łatwy i nowoczesny sposób.
          </p>
          <div className="button-group">
            <Link to="/register" className="button"><FaUserPlus className="icon" /> Rejestracja</Link>
            <Link to="/login" className="button"><FaSignInAlt className="icon" /> Logowanie</Link>
          </div>
        </section>
        <section className="features-section">
          <h3>Funkcje aplikacji</h3>
          <ul className="features-list">
            <li><FaCheckCircle className="feature-icon" /> Tworzenie zadań z opisem i czasem</li>
            <li><FaCheckCircle className="feature-icon" /> Łatwe zarządzanie zadaniami</li>
            <li><FaCheckCircle className="feature-icon" /> Powiadomienia o zbliżających się terminach</li>
          </ul>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2025 Todo App. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default HomePage;