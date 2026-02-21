import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, User, LogOut, Package, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = sessionStorage.getItem('adminAuth') === 'true';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        if (isAdmin) {
            sessionStorage.removeItem('adminAuth');
            window.location.href = '/';
        } else {
            await logout();
            navigate('/');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const profileLinks = isAdmin ? [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <Package size={16} /> },
        { name: 'Add Dish', path: '/admin/add-dish', icon: <Package size={16} /> },
        { name: 'Orders', path: '/admin/orders', icon: <Package size={16} /> },
    ] : [
        { name: 'My Orders', path: '/orders', icon: <Package size={16} /> },
        { name: 'Profile', path: '/profile', icon: <User size={16} /> },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-premium py-3' : 'bg-transparent py-5'}`}>
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                            <span className="font-bold text-lg">MZ</span>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-dark">
                            Meal<span className="text-primary-500 font-outfit">zo</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold transition-colors hover:text-primary-500 ${location.pathname === link.path ? 'text-primary-500' : 'text-gray-600'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isAdmin && (
                            <Link to="/cart" className="relative group cursor-pointer p-2">
                                <ShoppingCart size={20} className="text-gray-600 group-hover:text-primary-500 transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {currentUser || isAdmin ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-2 rounded-xl transition-all"
                                >
                                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold">
                                        {isAdmin ? 'A' : (currentUser?.displayName?.[0] || 'U')}
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <>
                                            <div className="fixed inset-0 z-0" onClick={() => setShowProfileMenu(false)}></div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden z-10"
                                            >
                                                <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center font-bold">
                                                        {isAdmin ? 'A' : (currentUser?.displayName?.[0] || 'U')}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="font-bold text-dark truncate">{isAdmin ? 'Admin' : currentUser.displayName}</p>
                                                        <p className="text-xs text-gray-500 truncate">{isAdmin ? 'Administrator' : currentUser.email}</p>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    {profileLinks.map((link) => (
                                                        <Link
                                                            key={link.name}
                                                            to={link.path}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-primary-50 hover:text-primary-500 transition-all"
                                                            onClick={() => setShowProfileMenu(false)}
                                                        >
                                                            {link.icon}
                                                            {link.name}
                                                        </Link>
                                                    ))}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-1"
                                                    >
                                                        <LogOut size={16} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary py-2 px-5 text-sm">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
                    >
                        <div className="container-custom py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-bold transition-colors ${location.pathname === link.path ? 'text-primary-500' : 'text-gray-700'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                {currentUser || isAdmin ? (
                                    <>
                                        {profileLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                className="w-full py-4 text-dark font-bold border-2 border-gray-100 rounded-xl text-center flex items-center justify-center gap-2"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.icon}
                                                {link.name}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogout}
                                            className="btn-primary w-full py-4 font-bold text-lg text-center flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={20} /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/menu" className="btn-primary w-full py-4 font-bold text-lg text-center" onClick={() => setIsOpen(false)}>Order Online</Link>
                                        <Link to="/login" className="w-full py-4 text-dark font-bold border-2 border-gray-100 rounded-xl text-center" onClick={() => setIsOpen(false)}>Login</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
