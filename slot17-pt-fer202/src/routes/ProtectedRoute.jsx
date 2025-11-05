import React from 'react';
import { useAuthState } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthState();
  if(!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
