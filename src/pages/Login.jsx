import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();
    const { loginWithBackend, signupWithBackend, loginWithGoogle } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Google Authentication failed. Please try again.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isAdmin) {
                // Admin login via admin API
                const response = await fetch(`${API_BASE_URL}/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();
                if (data.success) {
                    sessionStorage.setItem('adminAuth', 'true');
                    if (data.token) {
                        sessionStorage.setItem('adminToken', data.token);
                    }
                    navigate('/');
                } else {
                    setError(data.message || 'Admin login failed');
                }
            } else {
                // User login/signup
                if (activeTab === 'login') {
                    await loginWithBackend(formData.email, formData.password);
                } else {
                    await signupWithBackend(formData.email, formData.password, formData.displayName, formData.phoneNumber);
                }
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-gray-50">
            <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-premium overflow-hidden grid lg:grid-cols-2">

                {/* Visual Side */}
                <div className="hidden lg:block relative bg-primary-500 p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <Link to="/" className="flex items-center gap-2 mb-12">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-500 font-bold text-sm shadow-lg">SKF</div>
                                <span className="text-2xl font-extrabold text-white font-outfit">Meal<span className="opacity-80">Zo</span></span>
                            </Link>
                            <h2 className="text-4xl font-black text-white leading-tight mb-6 font-outfit">
                                {isAdmin ? 'Admin Portal' : (activeTab === 'login' ? 'Welcome Back' : 'Join Us')} <br />
                                to the World of <br />
                                <span className="text-dark bg-white px-2 rounded-lg">Authentic Flavour</span>
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
                                {isAdmin
                                    ? "Access your dashboard to manage orders, dishes, and kitchen operations."
                                    : (activeTab === 'login'
                                        ? "Sign in to continue your culinary journey with Lucknow's finest home-style meals."
                                        : "Join thousands of food lovers enjoying authentic, homemade delicacies.")}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                            <p className="text-white font-bold mb-2 italic">"Purity. Integrity. Taste."</p>
                            <p className="text-white/60 text-xs uppercase tracking-widest font-bold">MealZo</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Mode Toggle */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => {
                                setIsAdmin(!isAdmin);
                                setActiveTab('login');
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${isAdmin
                                ? 'bg-red-50 text-red-600 border-2 border-red-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            <Shield size={16} />
                            {isAdmin ? 'Switch to User' : 'Admin Login'}
                        </button>
                    </div>

                    {/* Tabs - Hide for Admin */}
                    {!isAdmin && (
                        <div className="flex gap-2 mb-8 bg-gray-50 p-2 rounded-2xl">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'login'
                                    ? 'bg-white text-primary-500 shadow-md'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'signup'
                                    ? 'bg-white text-primary-500 shadow-md'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="mb-6 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-dark mb-2 font-outfit">Admin Sign In</h2>
                            <p className="text-gray-500 font-medium">Manage your kitchen with ease</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.form
                            key={activeTab + (isAdmin ? 'admin' : 'user')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {activeTab === 'signup' && !isAdmin && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            required
                                            type="text"
                                            name="displayName"
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="your-email@example.com"
                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {activeTab === 'signup' && !isAdmin && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            required
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="+91 00000 00000"
                                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                                    {!isAdmin && activeTab === 'login' && (
                                        <Link to="#" className="text-xs font-bold text-primary-500 hover:underline">Forgot?</Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-100 hover:bg-primary-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {isAdmin ? 'Admin Portal Entry' : (activeTab === 'login' ? 'Sign In Now' : 'Create My Account')}
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </motion.button>

                            {/* Google Auth Button */}
                            {!isAdmin && (
                                <div className="space-y-4 pt-2">
                                    <div className="relative flex items-center">
                                        <div className="flex-grow border-t border-gray-200"></div>
                                        <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Or continue with</span>
                                        <div className="flex-grow border-t border-gray-200"></div>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handleGoogleAuth}
                                        disabled={loading}
                                        className="w-full py-4 bg-white border-2 border-gray-100 text-dark rounded-2xl font-bold text-base hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                        {activeTab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                                    </motion.button>
                                </div>
                            )}
                        </motion.form>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Login;
