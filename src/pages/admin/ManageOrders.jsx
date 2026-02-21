import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { adminAPI, API_BASE_URL } from '../../services/api';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [searchTerm, statusFilter, orders]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/admin/orders`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data.data || []);
            } else if (response.status === 401) {
                sessionStorage.removeItem('adminAuth');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = [...orders];

        // Filter by status
        if (statusFilter !== 'All') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order._id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Refresh orders
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'Preparing': 'bg-blue-100 text-blue-700',
            'Out for Delivery': 'bg-purple-100 text-purple-700',
            'Completed': 'bg-green-100 text-green-700',
            'Cancelled': 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Orders</h1>
                        <p className="text-gray-600">View and update order status</p>
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-premium p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by Order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none appearance-none"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Order ID</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Items</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Amount</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Payment</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <span className="font-mono text-sm font-semibold text-gray-900">
                                                        #{order._id.slice(-6)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-700">
                                                    {order.items?.length || 0} items
                                                </td>
                                                <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                                    ₹{order.totalAmount || 0}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-700">
                                                    {order.paymentMethod}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-600">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-6 flex gap-2">
                                                    {order.status === 'Pending' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(order._id, 'Preparing')}
                                                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                                                        >
                                                            Accept
                                                        </button>
                                                    )}
                                                    {(order.status === 'Pending' || order.status === 'Preparing') && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                                                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    {order.status === 'Preparing' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(order._id, 'Completed')}
                                                            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                                                        >
                                                            Done
                                                        </button>
                                                    )}
                                                    {order.status === 'Completed' && (
                                                        <span className="text-gray-400 text-xs font-bold italic">No actions</span>
                                                    )}
                                                    {order.status === 'Cancelled' && (
                                                        <span className="text-gray-400 text-xs font-bold italic">No actions</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center text-gray-500">
                                                No orders found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageOrders;
