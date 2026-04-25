import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css';

export default function Login({ showToast }) {
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
      
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
        provider: 'google'
      };
      localStorage.setItem('casaModa_user', JSON.stringify(userData));
      
      if (showToast) {
        showToast(`Bienvenue ${result.user.displayName}! 👋`, 'success');
      }
      
      // Force navbar and cart/wishlist to update
      window.dispatchEvent(new Event('storage'));
      
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
      setError('Échec de la connexion Google: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Email invalide');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Mot de passe trop court (min 6 caractères)');
      setLoading(false);
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const user = users.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );

      if (user) {
        const userData = { 
          email: user.email, 
          name: user.name,
          id: user.id
        };
        localStorage.setItem('casaModa_user', JSON.stringify(userData));
        
        if (showToast) {
          showToast(`Connexion réussie! Bienvenue ${user.name} 👋`, 'success');
        }
        
        // Force navbar and cart/wishlist to update
        window.dispatchEvent(new Event('storage'));
        
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
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
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
          <h2>Connexion à votre compte</h2>
          <p>Veuillez vous connecter pour commencer vos achats</p>

          {error && (
            <p style={{ color: '#E53935', fontSize: '13px', marginBottom: '12px' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Adresse email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Entrez votre email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Entrez votre mot de passe"
              />
            </div>

            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            
            <button 
              type="button" 
              className="auth-btn google-btn"
              onClick={loginWithGoogle}
              style={{marginTop: '10px', backgroundColor: '#db4437'}}
            >
              <i className="fab fa-google me-2"></i>Se connecter avec Google
            </button>
          </form>

          <div className="auth-links">
            <p>Pas de compte ? <span onClick={() => navigate('/Register')} style={{ cursor: 'pointer', color: '#C9A96E' }}>S'inscrire ici</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}