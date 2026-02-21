import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!currentUser) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container-custom max-w-4xl">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
                            <div className="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl shadow-primary-200">
                                {currentUser.displayName?.[0]}
                            </div>
                            <h2 className="text-xl font-bold text-dark">{currentUser.displayName}</h2>
                            <p className="text-gray-500 text-sm mb-6">{currentUser.email}</p>
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl p-4 shadow-premium">
                            <nav className="space-y-1">
                                <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-500 rounded-2xl font-bold text-sm transition-all">
                                    <User size={18} /> Profile Info
                                </button>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all"
                                >
                                    <Package size={18} /> My Orders
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all">
                                    <MapPin size={18} /> Saved Addresses
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] p-8 lg:p-12 shadow-premium"
                        >
                            <h1 className="text-3xl font-black text-dark mb-8 font-outfit">Account Settings</h1>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-bold text-dark"
                                            defaultValue={currentUser.displayName}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            readOnly
                                            type="email"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-500 cursor-not-allowed"
                                            defaultValue={currentUser.email}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-bold text-dark"
                                            defaultValue={currentUser.phoneNumber || '+91 00000 00000'}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="px-10 py-4 bg-primary-500 text-white rounded-2xl font-bold shadow-xl shadow-primary-200 hover:bg-primary-600 transition-all">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-[40px] p-8 lg:p-12 text-white shadow-premium relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                            <h2 className="text-2xl font-black mb-2 font-outfit relative z-10">MealZo</h2>
                            <p className="text-white/80 mb-6 max-w-sm relative z-10">Enjoy unlimited free delivery and exclusive seasonal discounts with gold membership.</p>
                            <button className="px-8 py-3 bg-white text-primary-500 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-all relative z-10">
                                Join Membership
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
