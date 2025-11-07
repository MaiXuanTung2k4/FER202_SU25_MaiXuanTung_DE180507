// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import ProtectedRoute from './routes/ProtectedRoute';
import UserManagementPage from './pages/UserManagementPage';


function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <BrowserRouter>
          <Routes>
            {/* Trang đăng nhập */}
            <Route path="/login" element={<LoginPage />} />

            {/* Trang mặc định chuyển hướng đến /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Trang chính sau khi đăng nhập */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
  path="/users"
  element={
    <ProtectedRoute>
      <UserManagementPage />
    </ProtectedRoute>
  }
/>

          </Routes>
        </BrowserRouter>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
