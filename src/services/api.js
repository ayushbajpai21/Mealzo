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

// Add auth auth token to requests
api.interceptors.request.use((config) => {
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
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

// Admin APIs (using session-based auth)
export const adminAPI = {
    login: (credentials) => axios.post(`${API_BASE_URL}/admin/login`, credentials, { withCredentials: true }),
    getDashboard: () => axios.get(`${API_BASE_URL}/admin/dashboard`, { withCredentials: true }),
    addDish: (formData) => axios.post(`${API_BASE_URL}/admin/add-dish`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getOrders: () => axios.get(`${API_BASE_URL}/admin/orders`, { withCredentials: true }),
    updateOrderStatus: (orderId, status) => axios.post(
        `${API_BASE_URL}/admin/orders/${orderId}/status`,
        { status },
        { withCredentials: true }
    ),
};

export default api;
