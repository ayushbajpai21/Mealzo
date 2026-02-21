import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, ShieldCheck, Truck, Clock, Zap, Utensils } from 'lucide-react';
import { companyInfo } from '../data/mockData';
import { Link } from 'react-router-dom';

const About = () => {
    const stats = [
        { label: 'Happy Customers', value: '15K+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Quality Guarantee', value: '100%', icon: ShieldCheck, color: 'text-secondary-500', bg: 'bg-secondary-50' },
        { label: 'Daily Orders', value: '500+', icon: Utensils, color: 'text-primary-500', bg: 'bg-primary-50' },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-28 overflow-hidden bg-primary-50/30">
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6"
                    >
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-ping"></span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">About Our Kitchen</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl lg:text-8xl font-black text-dark mb-6 font-outfit"
                    >
                        The Heart of <br />
                        <span className="text-primary-500">Authentic Taste</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
                    >
                        {companyInfo.description} From our kitchen to your home, we deliver the flavours that tell a story of tradition and quality.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"
                                alt="Our Master Chef"
                                className="rounded-[40px] shadow-2xl"
                            />
                            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-premium border border-gray-50 hidden md:block">
                                <p className="text-4xl font-extrabold text-primary-500 mb-1">Since 2018</p>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Serving Lucknow</p>
                            </div>
                        </motion.div>

                        <div>
                            <h2 className="text-4xl font-extrabold text-dark mb-8 font-outfit">The <span className="text-primary-500">Meal</span> Zo</h2>
                            <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
                                <p>
                                    Mealzo was born out of a simple observation: the real taste of India is found in its home kitchens. Our founder, Sakshi, envisioned a place where every dish is prepared with the same love and attention as a family meal.
                                </p>
                                <p>
                                    Beginning as a small boutique kitchen in Lucknow, we focused on two things: uncompromising quality of ingredients and authentic spice blends. We don't use artificial preservatives or commercial pastes—we grind our own spices daily.
                                </p>
                                <p>
                                    Our Signature Thalis and slow-cooked Dal Makhani have become local favourites, but our greatest achievement is the trust our customers place in us for their daily meals. We treat every order as an opportunity to deliver happiness.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                                {stats.map((stat, i) => (
                                    <div key={i} className={`${stat.bg} p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-300`}>
                                        <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-dark text-white rounded-[60px] lg:rounded-[100px] my-10 mx-4 lg:mx-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="container-custom py-10 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-extrabold mb-6 font-outfit">Our <span className="text-primary-500">Core Values</span></h2>
                        <p className="text-gray-400 italic">"Purity. Integrity. Taste."</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-500 border border-white/10">
                                <ShieldCheck size={40} />
                            </div>
                            <h4 className="text-xl font-bold mb-4">Unmatched Hygiene</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">Our kitchen follows 5-star safety protocols. From ionized water to medical-grade sanitation, we prioritize your health.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-500 border border-white/10">
                                <Heart size={40} />
                            </div>
                            <h4 className="text-xl font-bold mb-4">Authentic Spices</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">Hand-picked spices from across India, roasted and ground in-house to preserve their essential flavour and aroma.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-500 border border-white/10">
                                <Clock size={40} />
                            </div>
                            <h4 className="text-xl font-bold mb-4">Timely Delivery</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">Our advanced dispatch system ensures your meal reaches you hot and fresh, exactly when you expect it.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services & Specialties */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-extrabold text-dark mb-6 font-outfit">Our <span className="text-primary-500">Services</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {companyInfo.services.map((service, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-primary-50/50 p-4 rounded-2xl border border-primary-50">
                                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white shrink-0">
                                            <Utensils size={16} />
                                        </div>
                                        <span className="font-bold text-dark">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-primary-500 text-white p-10 rounded-[40px] shadow-xl shadow-primary-100"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 font-outfit">Our Specialties</h2>
                            <p className="text-xl leading-relaxed font-medium opacity-90 italic">
                                "{companyInfo.specialties}"
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 text-center">
              <Link to="/menu"> <div className="container-custom">
                    <h2 className="text-4xl font-extrabold text-dark mb-8 font-outfit">Ready to Taste the <span className="text-primary-500">Difference?</span></h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary inline-flex scale-110"
                    >
                        Order Your Thali Now
                    </motion.button>
                </div></Link> 
            </section>
        </div>
    );
};

export default About;
