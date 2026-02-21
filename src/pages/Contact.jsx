import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { companyInfo } from '../data/mockData';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold text-dark mb-4 font-outfit"
                    >
                        Get In <span className="text-primary-500">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500"
                    >
                        Have a question or feedback? We'd love to hear from you.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-primary-50 p-10 rounded-[40px]">
                            <h3 className="text-2xl font-extrabold text-dark mb-8 font-outfit">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark mb-1">Our Location</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{companyInfo.address}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark mb-1">Phone Number</h4>
                                        <p className="text-gray-500 text-lg font-bold leading-relaxed">{companyInfo.phone}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark mb-1">Email Address</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{companyInfo.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-primary-100">
                                <p className="font-bold text-dark mb-6">Follow Us</p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-primary-500 transition-all shadow-sm">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-primary-500 transition-all shadow-sm">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-primary-500 transition-all shadow-sm">
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 bg-gray-100 rounded-[40px] overflow-hidden relative border-4 border-white shadow-premium">
                           <iframe
  title="Mealzo Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.024040603717!2d80.92765437572635!3d26.87097727667208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd8fc3a8dc35%3A0xbd4ff22a0382fe1f!2s499%2F161%2C%20499%2F161%2C%20Gokaran%20Nath%20Rd%2C%20Kutubpur%2C%20Hasanganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226007!5e0!3m2!1sen!2sin!4v1771068684270!5m2!1sen!2sin"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-10 lg:p-12 rounded-[40px] shadow-premium border border-gray-50">
                            <h3 className="text-2xl font-extrabold text-dark mb-8 font-outfit">Send us a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Message</label>
                                    <textarea
                                        required
                                        rows="6"
                                        placeholder="Tell us how we can help..."
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-medium resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={isSubmitted}
                                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isSubmitted
                                        ? 'bg-secondary-500 text-white'
                                        : 'bg-primary-500 text-white shadow-xl shadow-primary-100 hover:bg-primary-600'
                                        }`}
                                >
                                    {isSubmitted ? (
                                        <>Message Sent Successfully! ✨</>
                                    ) : (
                                        <>Send Message <Send size={18} /></>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
