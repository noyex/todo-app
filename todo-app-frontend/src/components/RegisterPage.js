import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../service/authService';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      await register(userData);
      setSuccess('Rejestracja zakończona sukcesem. Sprawdź swoją skrzynkę pocztową, aby zweryfikować konto.');
      navigate('/verify');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Rejestracja</h1>
      </header>
      <main className="register-main">
        <div className="form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input
              type="text"
              id="username"
              placeholder="Podaj nazwę użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
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
            {success && <p className="success">{success}</p>}

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