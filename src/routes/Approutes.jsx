import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Error from '../pages/Error';
import AboutUs from '../pages/AboutUs';
import PrivacyPolicySection from '../pages/PrivacyPolicySection';
import AdminPage from '../pages/AdminPage';
import AdminLoginPage from '../pages/AdminLoginPage';

// Protected route for regular users
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Redirect if logged in as a regular user
const RedirectIfLoggedIn = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

// Protected route for admin access
const AdminProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

function Approutes() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/policy" element={<PrivacyPolicySection />} />

                {/* User authentication routes */}
                <Route
                    path="/login"
                    element={
                        <RedirectIfLoggedIn>
                            <LoginPage />
                        </RedirectIfLoggedIn>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RedirectIfLoggedIn>
                            <RegisterPage />
                        </RedirectIfLoggedIn>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
 
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                    path="/manishadmin"
                    element={
                        <AdminProtectedRoute>
                            <AdminPage />
                        </AdminProtectedRoute>
                    }
                />

                {/* Error page */}
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    );
}

export default Approutes;