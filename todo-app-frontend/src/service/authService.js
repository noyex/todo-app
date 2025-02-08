const API_URL = 'http://localhost:8080/api/auth';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Rejestracja nie powiodła się');
  }

  return response.json();
};

export const verify = async (verificationData) => {
  const response = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verificationData),
  });

  if (!response.ok) {
    throw new Error('Weryfikacja nie powiodła się');
  }

  return response.json();
};

export const login = async (loginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('Logowanie nie powiodło się');
  }

  return response.json();
};