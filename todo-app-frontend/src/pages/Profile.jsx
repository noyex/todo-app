import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUser(token);
    }
  }, [navigate]);

  const fetchUser = async (token) => {
    const email = parseJwt(token).sub;
    const response = await fetch(`http://localhost:8080/api/users/by-email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.error('Failed to fetch user data');
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="profile-page">
      {/* <h1>Profile</h1> */}
      {user ? (
        <div className="profile-card">
          <div className="profile-details">
            <div className="profile-field">
              <label>Username</label>
              <div className="profile-field-value">
                <span>{user.username}</span>
                <button className="edit-button">Edit</button>
              </div>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <div className="profile-field-value">
                <span>{user.email}</span>
                <button className="edit-button">Edit</button>
              </div>
            </div>
            <div className="profile-field">
              <label>Password</label>
              <div className="profile-field-value">
                <span>********</span>
                <button className="edit-button">Edit</button>
              </div>
            </div>
            <div className="profile-field">
              <label>Role</label>
              <div className="profile-field-value">
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;