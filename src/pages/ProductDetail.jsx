import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './ProductDetail.css';

export default function ProductDetail({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail not-found">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Retour
        </button>
        <p>Produit non trouvé</p>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    showToast(
      `${quantity} ${product.name} ajouté au panier ✓`,
      'success'
    );
  };

  const handleWishlist = () => {
    const wasWishlisted = wishlisted;
    toggleItem(product);
    if (showToast) {
      showToast(
        wasWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris',
        wasWishlisted ? 'error' : 'info'
      );
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-link">
        <ChevronLeft size={20} /> Retour
      </button>

      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
            />
            {product.badge && (
              <div className={`product-badge badge-${product.badgeColor}`}>
                {product.badge}
              </div>
            )}
          </div>

          <div className="thumbnail-gallery">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-details">
          <div className="breadcrumb">
            <button
              className="breadcrumb-link"
              onClick={() => navigate(`/${product.gender}`)}
            >
              Accueil
            </button>
            <span>/</span>
            <button
              className="breadcrumb-link"
              onClick={() => navigate(`/${product.gender}`)}
            >
              {product.gender === 'femme' ? 'Femme' : 'Homme'}
            </button>
            <span>/</span>
            <span>{product.category}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>

          {/* Rating */}
          <div className="rating-section">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating))}
            </span>
            <span className="rating-value">{product.rating}/5</span>
            <span className="reviews-count">
              ({product.reviews?.length} avis)
            </span>
          </div>

          {/* Price */}
          <div className="price-section">
            {product.salePrice ? (
              <>
                <span className="original-price">{product.price} DH</span>
                <span className="sale-price">{product.salePrice} DH</span>
                <span className="discount">
                  -
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) *
                    100
                  )}
                  %
                </span>
              </>
            ) : (
              <span className="price">{product.price} DH</span>
            )}
          </div>

          {/* Color Selector */}
          <div className="selector-group">
            <label>Couleur</label>
            <div className="color-selector">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  className={`color-option ${
                    selectedColor === color ? 'active' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title="Choisir couleur"
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="selector-group">
            <label>Taille</label>
            <div className="size-selector">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? 'active' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="size-guide-link">
              Guide des tailles
            </button>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <label>Quantité</label>
            <div className="quantity-selector">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="qty-btn"
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button
              className="btn-primary add-to-cart"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
            <button
              className={`wishlist-button ${wishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              <Heart
                size={20}
                fill={wishlisted ? 'currentColor' : 'none'}
              />
              {wishlisted ? 'Sauvegardé' : 'Wishlist'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Livraison 24-48h</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">↩</span>
              <span>Retour facile</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Authentique</span>
            </div>
          </div>

          {/* Description */}
          <div className="accordion">
            <button className="accordion-button">
              Description
            </button>
            <div className="accordion-content expanded">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="reviews-section">
              <h3>Avis clients</h3>
              <div className="reviews-list">
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="review-item">
                    <div className="review-header">
                      <strong>{review.name}</strong>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}
                    </div>
                    <p className="review-text">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">Vous aimerez aussi</h2>
            <div className="products-grid">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} showToast={showToast} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
