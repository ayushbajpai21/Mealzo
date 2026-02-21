import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { TrendingUp, ShoppingBag, CheckCircle, Clock, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminAPI } from '../../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalDishes: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await adminAPI.getDashboard();
            if (response.data.success) {
                const { stats, recentOrders, ordersByDay } = response.data.data;
                setStats(stats);
                setRecentOrders(recentOrders || []);

                // Format chart data
                const formattedChartData = (ordersByDay || []).map(day => ({
                    date: new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    orders: day.count
                }));
                setChartData(formattedChartData);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            if (error.response?.status === 401) {
                sessionStorage.removeItem('adminAuth');
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };


    const statCards = [
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingBag,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: Clock,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600'
        },
        {
            title: 'Completed',
            value: stats.completedOrders,
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            title: 'Total Dishes',
            value: stats.totalDishes,
            icon: Package,
            color: 'from-primary-500 to-primary-600',
            bgColor: 'bg-primary-50',
            textColor: 'text-primary-600'
        }
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={stat.textColor} size={24} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-xs font-semibold`}>
                                        <TrendingUp size={14} className="inline mr-1" />
                                        Live
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-premium">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Orders Trend (Last 7 Days)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#f97316"
                                strokeWidth={3}
                                dot={{ fill: '#f97316', r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-premium">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Items</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Amount</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4">
                                                <span className="font-mono text-sm font-semibold text-gray-900">
                                                    #{order._id.slice(-6)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-700">
                                                {order.items?.length || 0} items
                                            </td>
                                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                                                ₹{order.totalAmount || 0}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : order.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-500">
                                            No orders yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
