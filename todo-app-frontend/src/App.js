import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './service/authService';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import VerifyPage from './component/VerifyPage';
import TodoPage from './component/TodoPage';
import HomePage from './component/HomePage';
import './App.css';

// Komponent chroniony - wymaga autoryzacji
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Komponent dla tras publicznych - przekierowuje zalogowanych użytkowników
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/todos" />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Strony publiczne */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/verify" 
            element={
              <PublicRoute>
                <VerifyPage />
              </PublicRoute>
            } 
          />

          {/* Strony chronione - wymagają zalogowania */}
          <Route 
            path="/todos" 
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            } 
          />

          {/* Przekierowanie nieznanych ścieżek */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;