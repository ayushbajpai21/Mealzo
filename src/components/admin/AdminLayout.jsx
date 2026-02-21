import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, LogOut, Menu, X, Home } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        window.location.href = '/';
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/add-dish', icon: UtensilsCrossed, label: 'Add Dish' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-8 px-3">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl">🍽️</span>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Cloud Kitchen</h2>
                                <p className="text-xs text-gray-500">Admin Panel</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="absolute bottom-4 left-0 right-0 px-3">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Header */}
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 py-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-700 hover:text-primary-600"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                            >
                                <Home size={18} />
                                <span className="hidden sm:inline">Back to Home</span>
                            </Link>

                            <div className="h-8 w-[1px] bg-gray-200 hidden sm:block mx-2"></div>

                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">Ayush Admin</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-md">
                                S
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
