import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Utensils, ShieldCheck, Zap, Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reviews } from '../data/mockData';
import DishCard from '../components/DishCard';
import CategoryFilter from '../components/CategoryFilter';
import { categoryAPI, dishAPI } from '../services/api';
import { useEffect } from 'react';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('');
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriesRes, dishesRes] = await Promise.all([
                    categoryAPI.getAll(),
                    dishAPI.getAll()
                ]);

                if (categoriesRes.data.success) {
                    setCategories(categoriesRes.data.data);
                    if (categoriesRes.data.data.length > 0) {
                        setActiveCategory(categoriesRes.data.data[0].slug);
                    }
                }

                if (dishesRes.data.success) {
                    const mappedDishes = dishesRes.data.data.map(dish => ({
                        ...dish,
                        id: dish._id,
                        isVeg: dish.type === 'Veg',
                        category: dish.category.toLowerCase().replace(/\s+/g, '-')
                    }));
                    setDishes(mappedDishes);
                }
            } catch (error) {
                console.error("Error fetching homepage data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary-50 rounded-l-[100px] hidden lg:block"></div>
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider mb-6">
                                <Utensils size={14} />
                                <span>The best cloud kitchen in town</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-dark leading-[1.1] mb-8 text-balance">
                                Authentic <span className="text-primary-500">Desi Taste</span> <br />
                                From Our Kitchen <br />
                                to Your Table.
                            </h1>
                            <p className="text-gray-500 text-lg lg:text-xl mb-10 max-w-lg leading-relaxed">
                                Experience the soul of home-cooked meals. Mealzo brings you hygienic, healthy, and delicious homestyle food in Lucknow.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/menu" className="btn-primary px-8 py-4 shadow-xl shadow-primary-100">
                                    Order Now <ArrowRight size={18} />
                                </Link>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white text-dark font-bold rounded-xl shadow-premium hover:shadow-premium-hover transition-all">
                                    <div className="w-10 h-10 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center">
                                        <Play size={16} className="fill-current" />
                                    </div>
                                    How it works
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-100">
                                <div>
                                    <h4 className="text-3xl font-extrabold text-dark">50+</h4>
                                    <p className="text-gray-400 text-sm">Dishes</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-extrabold text-dark">12K+</h4>
                                    <p className="text-gray-400 text-sm">Customers</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-extrabold text-dark">4.9</h4>
                                    <p className="text-gray-400 text-sm">Rating</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
                                    alt="Delicious Food"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-premium flex items-center gap-4 border border-gray-50"
                            >
                                <div className="w-12 h-12 bg-secondary-50 text-secondary-500 rounded-xl flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400">Quality</p>
                                    <p className="text-sm font-extrabold text-dark">100% Hygienic</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -right-10 z-20 bg-white p-4 rounded-2xl shadow-premium flex items-center gap-4 border border-gray-50"
                            >
                                <div className="w-12 h-12 bg-primary-100 text-primary-500 rounded-xl flex items-center justify-center">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400">Delivery</p>
                                    <p className="text-sm font-extrabold text-dark">Super Fast</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 lg:py-32">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-4 font-outfit">
                                Popular <span className="text-primary-500">Dishes</span>
                            </h2>
                            <p className="text-gray-500">Explore our most loved recipes curated just for you.</p>
                        </div>
                        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} />
                    </div>

                    {loading ? (
                        <div className="text-center text-gray-500">Loading dishes...</div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {dishes
                                .filter(dish => dish.category === activeCategory)
                                .map(dish => (
                                    <DishCard key={dish.id} dish={dish} />
                                ))
                            }
                        </motion.div>
                    )}

                    <div className="mt-16 text-center">
                        <Link to="/menu" className="btn-outline inline-flex">
                            View All Menu <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-dark mb-4 font-outfit">What Our <span className="text-primary-500">Customers</span> Say</h2>
                        <p className="text-gray-500 italic">"Food is the ingredient that binds us together."</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl shadow-premium border border-gray-50 relative"
                            >
                                <div className="flex gap-1 text-primary-500 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} className={i >= review.rating ? 'text-gray-200' : ''} />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-8 leading-relaxed">"{review.comment}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full ring-4 ring-primary-50" />
                                    <div>
                                        <h4 className="font-bold text-dark">{review.name}</h4>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
