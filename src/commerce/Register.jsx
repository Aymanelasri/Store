import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css';

export default function Register({ showToast }) {
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
      
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
        provider: 'google'
      };
      localStorage.setItem('casaModa_user', JSON.stringify(userData));
      
      if (showToast) {
        showToast(`Bienvenue ${result.user.displayName}! 🎉`, 'success');
      }
      
      // Force navbar and cart/wishlist to update
      window.dispatchEvent(new Event('storage'));
      
      navigate('/');
    } catch (error) {
      setError('Échec de l\'inscription Google: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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
      setError('Mot de passe min 6 caractères');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
        setError('Un utilisateur avec cet email existe déjà');
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const userData = { 
        name: newUser.name, 
        email: newUser.email,
        id: newUser.id
      };
      localStorage.setItem('casaModa_user', JSON.stringify(userData));

      if (showToast) {
        showToast(`Compte créé avec succès! Bienvenue ${newUser.name} 🎉`, 'success');
      }
      
      // Force navbar and cart/wishlist to update
      window.dispatchEvent(new Event('storage'));

      navigate('/');
    } catch (error) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
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
          <h2>Créer votre compte</h2>
          <p>Veuillez remplir vos informations pour vous inscrire</p>

          {error && (
            <p style={{ color: '#E53935', fontSize: '13px', marginBottom: '12px' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Entrez votre nom complet"
              />
            </div>

            <div className="form-group">
              <label>Adresse email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Entrez votre email"
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Entrez votre mot de passe"
              />
            </div>

            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Création du compte...' : 'S\'inscrire'}
            </button>
            
            <button 
              type="button" 
              className="auth-btn google-btn"
              onClick={registerWithGoogle}
              style={{marginTop: '10px', backgroundColor: '#db4437'}}
            >
              <i className="fab fa-google me-2"></i>S'inscrire avec Google
            </button>
          </form>

          <div className="auth-links">
            <p>Déjà un compte ? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#C9A96E' }}>Se connecter ici</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}