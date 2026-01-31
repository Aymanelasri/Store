import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registerWithGoogle = async () => {
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
      
      // Navigate to home
      navigate('/');
    } catch (error) {
      setError('Google sign-up failed: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === formData.email)) {
        setError('User with this email already exists');
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto login after registration
      const token = 'token_' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }));

      // Trigger custom event to update Layout
      window.dispatchEvent(new Event('loginStatusChanged'));

      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Join Casa Moda!</h2>
            <p>Create your account and start exploring our amazing fashion collections</p>
          </div>
        </div>
        
        <div className="auth-form">
          <h2>Create Your Account</h2>
          <p>Please fill in your details to register</p>

          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                placeholder="Confirm your password"
              />
            </div>

            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <button 
              type="button" 
              className="auth-btn google-btn"
              onClick={registerWithGoogle}
              style={{marginTop: '10px', backgroundColor: '#db4437'}}
            >
              <i className="fab fa-google me-2"></i>Sign up with Google
            </button>
          </form>

          <div className="auth-links">
            <p>Already have an account ? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}