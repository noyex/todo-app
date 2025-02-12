import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const VerificationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.verify(formData);
      navigate('/login');
    } catch (err) {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="verification-container">
      <h2>Account Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={formData.verificationCode}
          onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Verify Account</button>
      </form>
    </div>
  );
};

export default VerificationPage;