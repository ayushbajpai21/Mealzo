import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, UtensilsCrossed, Loader2 } from 'lucide-react';
import DishCard from '../components/DishCard';
import { dishAPI, categoryAPI } from '../services/api';

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Fetch dishes and categories from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [categoriesRes, dishesRes] = await Promise.all([
                    categoryAPI.getAll(),
                    dishAPI.getAll()
                ]);

                if (categoriesRes.data.success) {
                    setCategories(categoriesRes.data.data);
                }

                if (dishesRes.data.success) {
                    const dishesData = dishesRes.data.data.map(dish => ({
                        id: dish._id,
                        name: dish.name,
                        description: dish.description,
                        price: dish.price,
                        image: dish.image,
                        category: dish.category.toLowerCase().replace(/\s+/g, '-'),
                        type: dish.type,
                        isVeg: dish.type === 'Veg',
                        available: dish.available
                    }));
                    setDishes(dishesData);
                }
            } catch (error) {
                console.error('Error fetching menu data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredDishes = useMemo(() => {
        let result = [...dishes];

        // Filter by Category
        if (activeCategory !== 'all') {
            result = result.filter(dish => dish.category === activeCategory);
        }

        // Filter by Search
        if (searchQuery) {
            result = result.filter(dish =>
                dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dish.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });

        return result;
    }, [dishes, activeCategory, searchQuery, sortBy]);

    const sortOptions = [
        { id: 'name', label: 'Name (A-Z)' },
        { id: 'price-low', label: 'Price (Low to High)' },
        { id: 'price-high', label: 'Price (High to Low)' },
    ];

    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-500" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold text-dark mb-4 font-outfit"
                    >
                        Our <span className="text-primary-500">Delicious</span> Menu
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500"
                    >
                        From starters to desserts, we have everything you crave.
                    </motion.p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-12">
                    {/* Categories */}
                    <div className="relative flex-grow lg:flex-grow-0 overflow-hidden">
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 whitespace-nowrap ${activeCategory === 'all'
                                    ? 'bg-primary-500 text-white shadow-xl shadow-primary-200 ring-4 ring-primary-500/10'
                                    : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                                    }`}
                            >
                                All Dishes
                            </button>
                            {categories.filter(cat => dishes.some(dish => dish.category === cat.slug)).map(cat => (
                                <button
                                    key={cat._id}
                                    onClick={() => setActiveCategory(cat.slug)}
                                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 flex items-center gap-2 whitespace-nowrap ${activeCategory === cat.slug
                                        ? 'bg-primary-500 text-white shadow-xl shadow-primary-200 ring-4 ring-primary-500/10'
                                        : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                                        }`}
                                >
                                    <span className="text-base leading-none">{cat.icon}</span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                        {/* Gradient mask for better UX indicating more scrollable items */}
                        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none hidden sm:block"></div>
                    </div>

                    <div className="flex gap-4 w-full lg:w-auto items-stretch h-12 lg:h-13">
                        {/* Search */}
                        <div className="relative flex-grow lg:w-72 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-full pl-12 pr-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-sm font-semibold"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="h-full px-5 bg-white border border-gray-200 rounded-2xl flex items-center gap-3 text-sm font-bold text-dark hover:border-primary-500 hover:shadow-xl shadow-primary-500/5 transition-all active:scale-95"
                            >
                                <SlidersHorizontal size={18} className="text-primary-500" />
                                <span className="hidden sm:inline text-gray-400 font-medium">Sort by:</span>
                                <span className="whitespace-nowrap">{sortOptions.find(o => o.id === sortBy)?.label}</span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2.5 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                                            Sort Dishes By
                                        </div>
                                        {sortOptions.map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSortBy(option.id);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm font-bold transition-all ${sortBy === option.id
                                                    ? 'bg-primary-50 text-primary-500'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-8">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Showing {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
                    </p>
                </div>

                {/* Dish Grid */}
                {filteredDishes.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredDishes.map((dish) => (
                                <DishCard key={dish._id || dish.id} dish={dish} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UtensilsCrossed size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">No dishes found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                            className="mt-6 text-primary-500 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;

