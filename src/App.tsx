import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Categories } from './pages/Categories';
import { Restaurant } from './pages/Restaurant';
import { useAuthStore } from './stores/useAuthStore';
import { Checkout } from './pages/Checkout';
import { Delivery } from './pages/Delivery';
import { TrackOrder } from './pages/TrackOrder';

function App() {
  const { checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/track-order/:orderId" element={<TrackOrder />} />
        
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;