import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { customer } = useAuth();
  return customer ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;