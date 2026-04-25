import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT HALF - FEMME */}
        <div className="hero-half">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=900&fit=crop&q=80" 
            alt="Collection Femme"
          />
          <div className="hero-overlay">
            <h2>FEMME</h2>
            <p>Nouvelle Collection</p>
            <Link to="/femme?gender=femme">
              <button className="hero-btn">
                DÉCOUVRIR →
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT HALF - HOMME */}
        <div className="hero-half">
          <img 
            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&h=900&fit=crop&q=80" 
            alt="Collection Homme"
          />
          <div className="hero-overlay">
            <h2>HOMME</h2>
            <p>Nouvelle Collection</p>
            <Link to="/homme?gender=homme">
              <button className="hero-btn">
                DÉCOUVRIR →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
