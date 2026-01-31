import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Store Google user info in localStorage
      const token = 'google_token_' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
       
      }));
      
      // Trigger custom event to update Nav
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      // Navigate to home or cart if pending payment
      const pendingPayment = localStorage.getItem('pendingPayment');
      const returnToCart = localStorage.getItem('returnToCart');
      if (pendingPayment) {
        localStorage.removeItem('pendingPayment');
        navigate('/cart');
      } else if (returnToCart) {
        localStorage.removeItem('returnToCart');
        navigate('/cart');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Google sign-in failed: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        // Login successful
        const token = 'token_' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        
        // Trigger custom event to update Layout
        window.dispatchEvent(new Event('loginStatusChanged'));
        
        // Check if there was a pending payment
        const pendingPayment = localStorage.getItem('pendingPayment');
        const returnToCart = localStorage.getItem('returnToCart');
        if (pendingPayment) {
          localStorage.removeItem('pendingPayment');
          navigate('/cart');
        } else if (returnToCart) {
          localStorage.removeItem('returnToCart');
          navigate('/cart');
        } else {
          navigate('/');
        }
      } else {
        setError('Password or email is incorrect');
      }
    } catch (error) {
      setError('Password or email is incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Welcome Back!</h2>
            <p>Sign in to explore Casa Moda and enjoy our fashion collections</p>
          </div>
        </div>
        
        <div className="auth-form">
          <h2>Login to Your Account</h2>
          <p>Please sign in to start shopping</p>

          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <button 
              type="button" 
              className="auth-btn google-btn"
              onClick={loginWithGoogle}
              style={{marginTop: '10px', backgroundColor: '#db4437'}}
            >
              <i className="fab fa-google me-2"></i>Sign in with Google
            </button>
          </form>

          <div className="auth-links">
            <p>Don't have an account ? <Link to="/Register">Sign up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}