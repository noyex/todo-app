import React from 'react';
import { Link } from 'react-router-dom';
import '../style/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Rejestracja</h1>
      </header>
      <main className="register-main">
        <div className="form-container">
          <form className="register-form">
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" id="username" placeholder="Podaj nazwę użytkownika" />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Podaj email" />
            
            <label htmlFor="password">Hasło:</label>
            <input type="password" id="password" placeholder="Podaj hasło" />
            
            <button type="submit" className="button">Zarejestruj się</button>
          </form>
        </div>
        <p className="back-link">
          <Link to="/" className="link">Powrót do strony głównej</Link>
        </p>
      </main>
    </div>
  );
};

export default RegisterPage;