import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const FALLBACK = 'https://placehold.co/400x500/f5f0eb/C9A96E?text=Casa+Moda';

export default function ProductCard({ product, showToast }) {
  const [imgIdx, setImgIdx] = useState(0);
  const { isWishlisted, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  // support both single `image` and array `images`
  const imgs = product.images?.length
    ? product.images
    : [product.image || FALLBACK];

  const currentSrc = imgs[imgIdx] || FALLBACK;

  // support both salePrice and oldPrice naming
  const displayPrice = product.salePrice ?? product.price;
  const displayOld   = product.oldPrice ?? (product.salePrice ? product.price : null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]);
    if (showToast) {
      showToast('Produit ajouté au panier ✓', 'success');
    }
  };

  const handleWishlistToggle = () => {
    const wasWishlisted = wishlisted;
    toggleItem(product);
    if (showToast) {
      showToast(
        wasWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris',
        wasWishlisted ? 'error' : 'info'
      );
    }
  };

  return (
    <div
      className="card h-100 border-0 product-card"
      style={{ 
        borderRadius: '6px', 
        overflow: 'hidden', 
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
      }}
    >
      {/* ── Image Block ── */}
      <div
        className="position-relative"
        style={{ height: '280px', overflow: 'hidden', backgroundColor: '#f5f3f0' }}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={currentSrc}
            alt={product.name}
            className="w-100 h-100"
            style={{ 
              objectFit: 'cover'
            }}
            onError={(e) => { e.target.src = FALLBACK; }}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span
            className="badge position-absolute top-0 start-0 m-2"
            style={{
              background: (product.badgeColor === 'error' || product.badgeType === 'sale')
                ? '#E53935' : '#2E7D32',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              padding: '5px 8px',
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center"
          style={{ 
            width: '34px', 
            height: '34px', 
            padding: 0, 
            border: 'none', 
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
          }}
          onClick={handleWishlistToggle}
          aria-label="Wishlist"
        >
          <span style={{ 
            color: wishlisted ? '#E53935' : '#555', 
            fontSize: '16px'
          }}>
            {wishlisted ? '♥' : '♡'}
          </span>
        </button>
      </div>

      {/* ── Card Body ── */}
      <div className="card-body p-2 d-flex flex-column">

        {/* Name */}
        <Link
          to={`/product/${product.id}`}
          className="card-title d-block mb-1 text-decoration-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: '600', color: '#1a1a1a', lineHeight: '1.3' }}
        >
          {product.name}
        </Link>

        {/* Stars */}
        <div className="d-flex align-items-center gap-1 mb-1">
          <small className="text-warning" style={{ letterSpacing: '1px' }}>
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </small>
          <small className="text-muted">{product.rating}</small>
        </div>

        {/* Price */}
        <div className="d-flex align-items-center gap-2 mb-1">
          {displayOld ? (
            <>
              <del className="text-muted small">{displayOld} DH</del>
              <span className="fw-semibold" style={{ color: '#C9A96E', fontSize: '15px' }}>
                {displayPrice} DH
              </span>
            </>
          ) : (
            <span className="fw-semibold" style={{ color: '#C9A96E', fontSize: '15px' }}>
              {displayPrice} DH
            </span>
          )}
        </div>

        {/* Color Dots */}
        {product.colors?.length > 0 && (
          <div className="d-flex gap-1 mb-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="rounded-circle d-inline-block"
                style={{ width: '12px', height: '12px', background: color, border: '1px solid #ddd' }}
              />
            ))}
          </div>
        )}

        {/* Add to Cart */}
        <button
          className="btn w-100 mt-auto"
          style={{ 
            background: '#C9A96E', 
            color: 'white', 
            fontSize: '13px', 
            fontWeight: '600', 
            padding: '8px', 
            borderRadius: '4px', 
            letterSpacing: '0.3px',
            border: 'none'
          }}
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
