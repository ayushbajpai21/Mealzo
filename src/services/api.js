import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const userToken = sessionStorage.getItem('userToken');
    const adminToken = sessionStorage.getItem('adminToken');

    // Prioritize adminToken for admin routes, otherwise use userToken
    if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
});

// Dish APIs
export const dishAPI = {
    getAll: (params) => api.get('/api/dishes', { params }),
    getById: (id) => api.get(`/api/dishes/${id}`),
};

// Order APIs
export const orderAPI = {
    create: (data) => api.post('/api/orders', data),
    getMyOrders: () => api.get('/api/orders/my-orders'),
    getById: (id) => api.get(`/api/orders/${id}`),
};

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/api/auth/register', data),
    login: (data) => api.post('/api/auth/login', data),
    googleAuth: (data) => api.post('/api/auth/google', data),
    getMe: () => api.get('/api/auth/me'),
};

// Admin APIs (now using JWT tokens via interceptor)
export const adminAPI = {
    login: (credentials) => api.post('/admin/login', credentials),
    getDashboard: () => api.get('/admin/dashboard'),
    addDish: (formData) => api.post('/admin/add-dish', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getOrders: () => api.get('/admin/orders'),
    updateOrderStatus: (orderId, status) => api.post(
        `/admin/orders/${orderId}/status`,
        { status }
    ),
};

export default api;
