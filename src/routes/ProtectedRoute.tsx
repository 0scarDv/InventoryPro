import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../services/authAPI';

export const ProtectedRoute = () => {

    return isTokenValid() ? <Outlet /> : <Navigate to="/" replace />;
}
