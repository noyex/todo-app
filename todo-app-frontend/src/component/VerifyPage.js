import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verify } from '../service/authService';
import '../style/VerifyPage.css';

const VerifyPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const verificationData = {
      email,
      verificationCode,
    };
  
    try {
      await verify(verificationData);
      setSuccess('Weryfikacja zakończona sukcesem. Możesz się teraz zalogować.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Dodajemy małe opóźnienie, żeby użytkownik zobaczył komunikat o sukcesie
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="verify-container">
      <header className="verify-header">
        <h1>Weryfikacja</h1>
      </header>
      <main className="verify-main">
        <div className="form-container">
          <form className="verify-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Podaj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="verificationCode">Kod weryfikacyjny:</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="Podaj kod weryfikacyjny"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="button">Zweryfikuj</button>
          </form>
        </div>
        <p className="back-link">
          <Link to="/" className="link">Powrót do strony głównej</Link>
        </p>
      </main>
    </div>
  );
};

export default VerifyPage;