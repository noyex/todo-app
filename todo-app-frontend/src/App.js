import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;