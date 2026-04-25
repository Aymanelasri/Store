import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { useToast } from './hooks/useToast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Femme from './pages/Femme';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Login from './commerce/Login';
import Register from './commerce/Register';
import './styles/global.css';

// Stripe test public key - This is a real Stripe test key that works
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function AppContent() {
  const { toast, showToast, hideToast } = useToast();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar showToast={showToast} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route path="/femme" element={<Femme showToast={showToast} />} />
          <Route path="/homme" element={<Femme showToast={showToast} />} />
          <Route path="/products" element={<Femme showToast={showToast} />} />
          <Route path="/product/:id" element={<ProductDetail showToast={showToast} />} />
          <Route path="/cart" element={<Cart showToast={showToast} />} />
          <Route path="/checkout" element={<CheckoutPage showToast={showToast} />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/wishlist" element={<Wishlist showToast={showToast} />} />
          <Route path="/login" element={<Login showToast={showToast} />} />
          <Route path="/Register" element={<Register showToast={showToast} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={hideToast} 
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
