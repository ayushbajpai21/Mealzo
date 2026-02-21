import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddDish from './pages/admin/AddDish';
import ManageOrders from './pages/admin/ManageOrders';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/add-dish" element={
            <ProtectedAdminRoute>
              <AddDish />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedAdminRoute>
              <ManageOrders />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

