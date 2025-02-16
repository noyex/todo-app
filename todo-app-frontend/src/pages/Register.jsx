import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      navigate('/verify'); // Przekierowanie do strony weryfikacji
    } else {
      alert('Signup failed');
    }
  };

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
      setIsVerified(true);
      alert('Verification successful, you can now log in.');
      navigate('/login'); // Przekierowanie do strony logowania
    } else {
      alert('Verification failed');
    }
  };

  return (
    <div className="auth-page">
      {!isVerified ? (
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      ) : (
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
      )}
    </div>
  );
};

export default Register;