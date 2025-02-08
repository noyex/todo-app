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
  
    // Zmiana tutaj - sprawdzamy typ odpowiedzi
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text(); // dla prostych odpowiedzi tekstowych
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

export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
  };
  
  export const getUserId = () => {
    // Pobierz ID użytkownika z localStorage (zapisane podczas logowania)
    return localStorage.getItem('userId');
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };