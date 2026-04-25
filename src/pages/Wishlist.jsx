import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

export default function Wishlist({ showToast }) {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="wishlist empty-wishlist">
        <div className="empty-content">
          <div className="empty-icon">💕</div>
          <h2>Votre wishlist est vide</h2>
          <p>Sauvegardez vos articles préférés pour les retrouver facilement</p>
          <Link to="/femme" className="btn-primary">
            Explorer les collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="container">
        <h1>Ma Wishlist</h1>
        <p className="wishlist-count">{items.length} article{items.length !== 1 ? 's' : ''} sauvegardé{items.length !== 1 ? 's' : ''}</p>

        <div className="products-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} showToast={showToast} />
          ))}
        </div>
      </div>
    </div>
  );
}
