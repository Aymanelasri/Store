import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Merci pour votre inscription: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Social */}
        <div className="footer-column">
          <div className="footer-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="logo-icon"
            >
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" />
              <polygon
                points="16,6 20,14 28,14 22,20 24,28 16,22 8,28 10,20 4,14 12,14"
                fill="currentColor"
              />
            </svg>
            <h4>Casa Moda</h4>
          </div>
          <p className="footer-tagline">
            L'élégance à la marocaine, pour chaque occasion.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-link" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-link" title="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h5 className="footer-heading">Navigation</h5>
          <ul className="footer-links">
            <li>
              <Link to="/femme">Femme</Link>
            </li>
            <li>
              <Link to="/homme">Homme</Link>
            </li>
            <li>
              <a href="#">Nouveautés</a>
            </li>
            <li>
              <a href="#">Soldes</a>
            </li>
            <li>
              <a href="#">À propos</a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div className="footer-column">
          <h5 className="footer-heading">Information</h5>
          <ul className="footer-links">
            <li>
              <a href="#">Livraison & Retours</a>
            </li>
            <li>
              <a href="#">Politique de Confidentialité</a>
            </li>
            <li>
              <a href="#">Conditions d'utilisation</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-column">
          <h5 className="footer-heading">Newsletter</h5>
          <p className="newsletter-desc">
            Inscrivez-vous pour recevoir nos nouvelles collections et offres exclusives.
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              S'abonner
            </button>
          </form>
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={16} />
              <a href="tel:+212612345678">+212 6 12 34 56 78</a>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <a href="mailto:info@casamoda.ma">info@casamoda.ma</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2025 Casa Moda — Tous droits réservés</p>
          <div className="payment-methods">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 CMI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
