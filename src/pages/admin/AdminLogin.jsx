import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../services/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                sessionStorage.setItem('adminAuth', 'true');
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-4">
                        <span className="text-4xl">🍽️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cloud Kitchen</h1>
                    <p className="text-gray-600">Admin Panel Login</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-premium p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login to Dashboard'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                        <p className="text-xs font-semibold text-primary-900 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-primary-700">Email: bajpai21ayush@gmail.com</p>
                        <p className="text-xs text-primary-700">Password: ayush123</p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <a href="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
