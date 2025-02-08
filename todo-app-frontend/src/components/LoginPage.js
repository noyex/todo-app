import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../service/authService';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const data = await login(loginData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Logowanie</h1>
      </header>
      <main className="login-main">
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Podaj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              placeholder="Podaj hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {error && <p className="error">{error}</p>}

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