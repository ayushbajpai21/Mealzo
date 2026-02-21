import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import { Package, Clock, CheckCircle, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderAPI.getMyOrders();
                setOrders(response.data.data || []);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-600';
            case 'Preparing': return 'bg-blue-100 text-blue-600';
            case 'Out for Delivery': return 'bg-purple-100 text-purple-600';
            case 'Completed': return 'bg-green-100 text-green-600';
            case 'Cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container-custom max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-dark font-outfit">My Orders</h1>
                        <p className="text-gray-500 font-medium">Tracking your culinary adventures</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-12 pr-6 py-3 bg-white border-2 border-transparent focus:border-primary-500 rounded-2xl font-bold shadow-sm outline-none transition-all w-full md:w-64"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-[40px] p-20 text-center shadow-premium">
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Package size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-dark mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't ordered anything yet. Explore our menu for delicious meals!</p>
                        <a href="/menu" className="btn-primary px-10 py-4 inline-block font-bold">Explore Menu</a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                key={order._id}
                                className="bg-white rounded-[32px] p-6 md:p-8 shadow-premium border border-gray-50 hover:border-primary-100 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Order Main Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Order #{order._id.slice(-8)}</span>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                                <Clock size={16} />
                                                {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-primary-500 font-black">
                                                <Clock size={16} /> Est. Delivery: 45 mins
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-dark font-bold">
                                                    <span>{item.dish?.name || 'Dish'} × {item.quantity}</span>
                                                    <span>₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Action/Total */}
                                    <div className="md:w-64 md:border-l border-gray-100 md:pl-8 flex flex-col justify-between">
                                        <div className="mb-6 md:mb-0">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-3xl font-black text-dark font-outfit">₹{order.totalAmount}</p>
                                        </div>
                                        <button className="w-full py-4 bg-gray-50 text-dark font-black rounded-2xl flex items-center justify-center gap-2 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            View Details <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
