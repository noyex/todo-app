import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Fields for username update
  const [newUsername, setNewUsername] = useState('');
  const [usernamePassword, setUsernamePassword] = useState('');

  // Fields for email update
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  // Fields for password update
  const [updateEmail, setUpdateEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();
  const backendUrl = 'http://localhost:8080';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUser(token);
    }
  }, [navigate]);

  const fetchUser = async (token) => {
    const emailFromToken = parseJwt(token).sub;
    const response = await fetch(`${backendUrl}/api/users/by-email/${emailFromToken}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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

  // Handler for updating username
  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${backendUrl}/api/users/update/${user.id}/name`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        password: usernamePassword
      })
    });
    if (response.ok) {
      // Refetch user data to update UI
      fetchUser(token);
      setIsEditingUsername(false);
      setNewUsername('');
      setUsernamePassword('');
    } else {
      alert('Failed to update username');
    }
  };

  // Handler for updating email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${backendUrl}/api/users/update/${user.id}/email`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail,
        password: emailPassword
      })
    });
    if (response.ok) {
      // After email update, redirect to verification page
      navigate('/verify');
    } else {
      alert('Failed to update email');
    }
  };

  // Handler for updating password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${backendUrl}/api/users/update/${user.id}/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: updateEmail,
        password: oldPassword,
        newPassword: newPassword
      })
    });
    if (response.ok) {
      // After password update, redirect to verification page
      navigate('/verify');
    } else {
      alert('Failed to update password');
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Profile</h1>
      <div className="dashboard-content">
        {user ? (
          <div className="profile-container">
            <div className="profile-section">
              <h2>User Details</h2>
              
              <div className="profile-field-group">
                <div className="field-container">
                  <label>Username</label>
                  <div className="field-content">
                    <span>{user.username}</span>
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditingUsername(!isEditingUsername)}
                    >
                      Edit
                    </button>
                  </div>
                  {isEditingUsername && (
                    <form className="edit-form" onSubmit={handleUsernameUpdate}>
                      <input
                        type="text"
                        placeholder="New username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Actual password"
                        value={usernamePassword}
                        onChange={(e) => setUsernamePassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="save-button">Save</button>
                    </form>
                  )}
                </div>

                <div className="field-container">
                  <label>Email</label>
                  <div className="field-content">
                    <span>{user.mail}</span>
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditingEmail(!isEditingEmail)}
                    >
                      Edit
                    </button>
                  </div>
                  {isEditingEmail && (
                    <form className="edit-form" onSubmit={handleEmailUpdate}>
                      <input
                        type="email"
                        placeholder="New email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Actual password"
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="save-button">Save</button>
                    </form>
                  )}
                </div>

                <div className="field-container">
                  <label>Password</label>
                  <div className="field-content">
                    <span>********</span>
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                    >
                      Edit
                    </button>
                  </div>
                  {isEditingPassword && (
                    <form className="edit-form" onSubmit={handlePasswordUpdate}>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="save-button">Zapisz</button>
                    </form>
                  )}
                </div>

                <div className="field-container">
                  <label>Role</label>
                  <div className="field-content">
                    <span className="role-badge">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;