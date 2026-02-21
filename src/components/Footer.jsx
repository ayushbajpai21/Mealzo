import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo } from '../data/mockData';

const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">MZ</div>
                            <span className="text-2xl font-extrabold text-dark font-outfit">Meal<span className="text-primary-500">zo</span></span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            {companyInfo.description}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Explore */}
                    <div>
                        <h4 className="font-outfit font-extrabold text-dark text-lg mb-8 uppercase tracking-widest text-xs">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Home</Link></li>
                            <li><Link to="/menu" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Full Menu</Link></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Contact & Location</Link></li>
                        </ul>
                    </div>

                    {/* Popular */}
                    <div>
                        <h4 className="font-outfit font-extrabold text-dark text-lg mb-8 uppercase tracking-widest text-xs">Popular Items</h4>
                        <ul className="space-y-4">
                            <li><Link to="/menu" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Maharaja Thali</Link></li>
                            <li><Link to="/menu" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Butter Chicken</Link></li>
                            <li><Link to="/menu" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Veg Dum Biryani</Link></li>
                            <li><Link to="/menu" className="text-gray-500 hover:text-primary-500 transition-colors text-sm font-semibold">Tandoori Platters</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-outfit font-extrabold text-dark text-lg mb-8 uppercase tracking-widest text-xs">Get In Touch</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <span className="pt-1">{companyInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                    <Phone size={16} />
                                </div>
                                <span>{companyInfo.phone}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                                    <Mail size={16} />
                                </div>
                                <span>{companyInfo.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 text-xs font-medium">
                            © {new Date().getFullYear()} Mealzo All rights reserved.
                        </p>
                        <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary-500 transition-colors">Shipping Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
