import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const categories = [
  { 
    name: 'Jupes', 
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=300&fit=crop', 
    link: '/femme?cat=robes' 
  },
  { 
    name: 'Sport', 
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=300&fit=crop', 
    link: '/femme?cat=sport' 
  },
  { 
    name: 'Chemises', 
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=300&fit=crop', 
    link: '/homme?cat=homme-chemises' 
  },
  { 
    name: 'Chaussures', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', 
    link: '/homme?cat=chaussures' 
  },
];

const features = [
  { icon: '🚚', title: 'Livraison rapide',    sub: '24–48 heures' },
  { icon: '↩️', title: 'Retour facile',       sub: 'Sous 14 jours' },
  { icon: '🔒', title: 'Paiement sécurisé',   sub: 'SSL & CMI' },
  { icon: '💬', title: 'Support WhatsApp',    sub: '7j/7 disponible' },
];

export default function Home({ showToast }) {
  
  // Remove duplicates and filter for femme products only
  const uniqueProducts = products.filter((p, index, self) => 
    index === self.findIndex(t => t.id === p.id)
  );
  
  // Get nouveautés - femme products with 'New' badge first, then latest femme products
  const nouveautes = uniqueProducts
    .filter(p => p.gender === 'femme' && p.badge === 'New')
    .slice(0, 8);
  
  // If less than 8 new femme products, fill with latest femme products
  const featured = nouveautes.length >= 8 
    ? nouveautes 
    : [
        ...nouveautes,
        ...uniqueProducts
          .filter(p => p.gender === 'femme' && p.badge !== 'New')
          .sort((a, b) => b.id - a.id)
          .slice(0, 8 - nouveautes.length)
      ];

  return (
    <div>
      <Hero />

      {/* Features Strip */}
      <div className="row text-center py-2 border-top border-bottom g-0 bg-white">
        {features.map((f) => (
          <div key={f.title} className="col-6 col-md-3 p-3">
            <div style={{ fontSize: '22px', marginBottom: '4px' }}>{f.icon}</div>
            <div className="fw-semibold small">{f.title}</div>
            <div className="text-muted" style={{ fontSize: '12px' }}>{f.sub}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section className="py-5" style={{ background: '#FAF8F5' }}>
        <div className="container" style={{ maxWidth: '1280px' }}>
          <h2 className="text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '600' }}>
            Explorer par catégorie
          </h2>
          <div className="row g-3 row-cols-2 row-cols-md-4">
            {categories.map((cat) => (
              <div key={cat.name} className="col">
                <Link to={cat.link} style={{ textDecoration: 'none' }}>
                  <div
                    className="card border-0 text-white overflow-hidden category-card"
                    style={{ 
                      height: '220px', 
                      cursor: 'pointer', 
                      borderRadius: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    <img
                      className="card-img h-100"
                      src={cat.image}
                      alt={cat.name}
                      style={{ 
                        objectFit: 'cover', 
                        transition: 'transform 0.4s ease'
                      }}
                      onError={(e) => { e.target.src = 'https://placehold.co/400x300/C9A96E/white?text=Casa+Moda'; }}
                    />
                    <div
                      className="card-img-overlay d-flex align-items-end"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)', padding: '12px' }}
                    >
                      <h5 className="card-title fw-semibold mb-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', letterSpacing: '0.5px' }}>
                        {cat.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: '1280px' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '600', margin: 0 }}>Nouveautés</h2>
            <a href="/femme" style={{ color: '#C9A96E', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Voir tout →
            </a>
          </div>
          <div className="row g-3 row-cols-2 row-cols-md-4">
            {featured.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} showToast={showToast} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-5 text-center text-white" style={{ background: '#1a1a1a' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '600', marginBottom: '8px' }}>
            Rejoignez notre communauté
          </h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            Recevez nos offres exclusives et nos nouveautés en premier
          </p>
          <form className="d-flex gap-2 justify-content-center flex-wrap" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email"
              required
              className="form-control"
              style={{ maxWidth: '300px', borderRadius: '4px', border: 'none', padding: '10px 14px' }}
            />
            <button
              type="submit"
              className="btn"
              style={{ background: '#C9A96E', color: 'white', fontWeight: '600', padding: '10px 24px', borderRadius: '4px' }}
            >
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
