import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Sign-in and Backend Sync
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Sync with backend
            const response = await authAPI.googleAuth({
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL
            });

            const userData = {
                email: user.email,
                displayName: user.displayName,
                uid: response.data.user._id,
                photoURL: user.photoURL
            };

            setCurrentUser(userData);
            sessionStorage.setItem('userToken', response.data.token);
            sessionStorage.setItem('userData', JSON.stringify(userData));
            return response.data.user;
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    };

    // Backend API Signup
    const signupWithBackend = async (email, password, displayName, phoneNumber) => {
        const response = await authAPI.register({
            email,
            password,
            displayName,
            phoneNumber
        });

        const userData = {
            email,
            displayName,
            phoneNumber,
            uid: response.data.user._id
        };

        setCurrentUser(userData);
        sessionStorage.setItem('userToken', response.data.token);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        return response.data.user;
    };

    // Backend API Login
    const loginWithBackend = async (email, password) => {
        const response = await authAPI.login({ email, password });

        const userData = {
            email: response.data.user.email,
            displayName: response.data.user.displayName,
            phoneNumber: response.data.user.phoneNumber,
            uid: response.data.user._id
        };

        setCurrentUser(userData);
        sessionStorage.setItem('userToken', response.data.token);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        return response.data.user;
    };

    // Logout
    const logout = async () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');
        setCurrentUser(null);
    };

    // Auth Initialization
    useEffect(() => {
        const initAuth = async () => {
            const token = sessionStorage.getItem('userToken');
            const savedData = sessionStorage.getItem('userData');

            if (token && savedData) {
                try {
                    setCurrentUser(JSON.parse(savedData));
                    // Optionally verify with backend
                    // await authAPI.getMe();
                } catch (error) {
                    console.error('Auth initialization failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const value = {
        currentUser,
        signupWithBackend,
        loginWithBackend,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
