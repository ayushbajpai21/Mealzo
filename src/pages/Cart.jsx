import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronRight, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const subtotal = cartTotal;
    const deliveryFee = cartItems.length > 0 ? 40 : 0;
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    dishId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                paymentMethod: 'COD' // Default for now
            };

            const response = await orderAPI.create(orderData);
            if (response.data.success) {
                clearCart();
                navigate('/orders');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 px-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 mb-8">
                    <ShoppingBag size={48} />
                </div>
                <h1 className="text-3xl font-black text-dark mb-4 font-outfit">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Go ahead and explore our delicious menu!</p>
                <Link to="/menu" className="btn-primary px-10 py-4 flex items-center gap-2">
                    Browse Menu <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-gray-50/50 min-h-screen">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Items List */}
                    <div className="lg:col-span-8 flex-grow">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-black text-dark font-outfit">Shopping Cart ({cartItems.length} items)</h1>
                            <Link to="/menu" className="text-primary-500 font-bold flex items-center gap-1 hover:underline">
                                <Plus size={18} /> Add more items
                            </Link>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex flex-col sm:flex-row items-center gap-6"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-grow text-center sm:text-left">
                                            <h3 className="text-lg font-bold text-dark mb-1">{item.name}</h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-1">{item.description}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-dark hover:bg-primary-500 hover:text-white transition-colors border border-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-outfit font-black text-xl w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-dark hover:bg-primary-500 hover:text-white transition-colors border border-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-center sm:text-right shrink-0 flex flex-col items-center sm:items-end gap-3">
                                            <span className="text-2xl font-black text-dark font-outfit">₹{item.price * item.quantity}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Summary Side */}
                    <div className="lg:w-96 shrink-0">
                        <div className="bg-white rounded-[40px] p-8 shadow-premium border border-gray-50 sticky top-32">
                            <h2 className="text-2xl font-black text-dark mb-8 font-outfit">Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-dark">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Delivery Fee</span>
                                    <span className="text-dark">₹{deliveryFee}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between">
                                    <span className="text-lg font-bold text-dark">Total Amount</span>
                                    <span className="text-2xl font-black text-primary-500 font-outfit">₹{total}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery To</p>
                                        <p className="text-sm font-bold text-dark truncate">Moti Nagar, Lucknow</p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-500 shadow-sm shrink-0">
                                        <CreditCard size={20} />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment</p>
                                        <p className="text-sm font-bold text-dark">Cash on Delivery</p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCheckout}
                                disabled={loading}
                                className="btn-primary w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary-100 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>Checkout Now <ArrowRight size={20} /></>
                                )}
                            </motion.button>

                            <p className="text-center text-gray-400 text-xs mt-6 font-medium">
                                Guaranteed 30-min delivery or it's free!
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
