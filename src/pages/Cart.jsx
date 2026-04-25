import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart({ showToast }) {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const shippingCost = items.length === 0 || getTotal() >= 400 ? 0 : 30;
  const total = getTotal();

  const handleRemoveItem = (id, size, color) => {
    removeItem(id, size, color);
    if (showToast) {
      showToast('Article retiré du panier', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="empty-cart-content">
          <div className="empty-icon">🛍️</div>
          <h2>Votre panier est vide</h2>
          <p>Commencez à explorer nos collections pour trouver les pièces parfaites</p>
          <Link to="/femme" className="btn-primary">
            Continuer vos achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Panier</h1>

        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span>Produit</span>
              <span>Prix</span>
              <span>Quantité</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-variants">
                    <span>
                      Taille: <strong>{item.size}</strong>
                    </span>
                    <span>
                      Couleur:{' '}
                      <div
                        className="color-preview"
                        style={{ backgroundColor: item.color }}
                      />
                    </span>
                  </div>
                </div>

                <div className="item-price">{item.price} DH</div>

                <div className="item-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1,
                        item.size,
                        item.color
                      )
                    }
                    className="qty-btn"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1,
                        item.size,
                        item.color
                      )
                    }
                    className="qty-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-total">
                  {item.price * item.quantity} DH
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                  className="remove-btn"
                  aria-label="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Résumé de commande</h3>

            <div className="summary-row">
              <span>Sous-total</span>
              <span>{total.toFixed(2)} DH</span>
            </div>

            <div className="summary-row">
              <span>
                {shippingCost === 0
                  ? 'Livraison (gratuite)'
                  : 'Livraison'}
              </span>
              <span>
                {shippingCost === 0 ? 'Gratuit' : `${shippingCost} DH`}
              </span>
            </div>

            {total < 400 && (
              <p className="shipping-info">
                Commande gratuite à partir de 400 DH
              </p>
            )}

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>Total</span>
              <span>{(total + shippingCost).toFixed(2)} DH</span>
            </div>

            <button 
              className="btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Passer commande
            </button>

            <Link to="/femme" className="continue-shopping">
              ← Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
