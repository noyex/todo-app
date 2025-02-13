import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verificationCode }),
    });
    if (response.ok) {
      alert('Verification successful, you can now log in.');
      navigate('/login'); // Przekierowanie do strony logowania
    } else {
      alert('Verification failed');
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleVerify}>
        <h2>Verify Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Verify</button>
      </form>
    </div>
  );
};

export default Verify;