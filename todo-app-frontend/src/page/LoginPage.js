import React from 'react';
import { Link } from 'react-router-dom';
import '../style/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Logowanie</h1>
      </header>
      <main className="login-main">
        <div className="form-container">
          <form className="login-form">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Podaj email" />
            
            <label htmlFor="password">Hasło:</label>
            <input type="password" id="password" placeholder="Podaj hasło" />
            
            <button type="submit" className="button">Zaloguj się</button>
          </form>
        </div>
        <p className="back-link">
          <Link to="/" className="link">Powrót do strony głównej</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;