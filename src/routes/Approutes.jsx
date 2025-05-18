import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home'; // Import Home component
import AboutUs from '../pages/AboutUs'; 
import PrivacyPolicySection from '../pages/PrivacyPolicySection';
 
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Redirect if already logged in
const RedirectIfLoggedIn = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function Approutes() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} /> 
            <Routes>
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
                <Route path="/" element={<Home />} /> {/* Home as landing page */}
                <Route path="/about" element={<AboutUs />} />  
                <Route path="/policy" element={<PrivacyPolicySection />} />  
            </Routes>
        </>
    );
}

export default Approutes;