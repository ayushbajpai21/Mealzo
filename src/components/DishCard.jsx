import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DishCard = ({ dish }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-xl mb-4" onClick={(e) => {
                // Prevent click if clicking the button specifically, though the button has its own handler
            }}>
                <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* ... badges ... */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-secondary-500' : 'bg-red-500'}`}></div>
                    <span className="text-[10px] font-bold text-dark uppercase">{dish.isVeg ? 'Veg' : 'Non-Veg'}</span>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={16} />
                </button>
            </div>

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-outfit font-bold text-lg text-dark group-hover:text-primary-500 transition-colors leading-tight">
                    {dish.name}
                </h3>
            </div>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                {dish.description}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</span>
                    <span className="font-outfit font-extrabold text-xl text-dark">₹{dish.price}</span>
                </div>
                <button
                    onClick={() => addToCart(dish)}
                    className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 shadow-md transform transition-transform active:scale-95 overflow-hidden relative group/btn"
                >
                    <motion.div
                        whileHover={{ y: -40 }}
                        className="flex flex-col items-center gap-8 transition-transform duration-300"
                    >
                        <ShoppingCart size={18} />
                        <span className="text-xs font-bold uppercase transition-opacity duration-300">Add</span>
                    </motion.div>
                </button>
            </div>
        </motion.div>
    );
};

export default DishCard;
