import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="relative overflow-hidden w-full">
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                {showAll && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory('all')}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shrink-0 shadow-sm ${activeCategory === 'all'
                            ? 'bg-primary-500 text-white shadow-primary-200 shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-500'
                            }`}
                    >
                        <span className="text-xl">🍽️</span>
                        <span className="text-sm">All Dishes</span>
                    </motion.button>
                )}
                {categories.map((cat) => (
                    <motion.button
                        key={cat._id || cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shrink-0 shadow-sm ${activeCategory === cat.slug
                            ? 'bg-primary-500 text-white shadow-primary-200 shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-500'
                            }`}
                    >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm">{cat.name}</span>
                    </motion.button>
                ))}
            </div>
            {/* Gradient mask to indicate scrollability */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none hidden sm:block"></div>
        </div>
    );
};

export default CategoryFilter;
