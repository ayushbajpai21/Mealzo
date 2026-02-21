import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    const isAdminAuthenticated = sessionStorage.getItem('adminAuth') === 'true';

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
