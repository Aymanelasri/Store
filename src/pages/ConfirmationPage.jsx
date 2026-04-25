import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Find the order in localStorage
    const orders = JSON.parse(localStorage.getItem('casaModa_orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    
    if (!foundOrder) {
      navigate('/');
      return;
    }

    setOrder(foundOrder);
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cod':
        return 'Cash à la livraison';
      case 'card':
        return 'Carte bancaire';
      default:
        return method;
    }
  };

  const getDeliveryTime = (city) => {
    const majorCities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès'];
    return majorCities.includes(city) ? '2-3 jours ouvrables' : '3-5 jours ouvrables';
  };

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          {/* Success Icon */}
          <div className="success-icon">✅</div>
          
          {/* Title */}
          <h1 className="confirmation-title">
            Commande confirmée !
          </h1>
          
          <p className="confirmation-subtitle">
            Merci pour votre achat chez Casa Moda
          </p>

          {/* Order Details Card */}
          <div className="order-details-card">
            <div className="order-info-grid">
              <div className="order-info-item">
                <span className="info-icon">🧾</span>
                <div>
                  <div className="info-label">Numéro de commande</div>
                  <div className="info-value">{order.id}</div>
                </div>
              </div>

              <div className="order-info-item">
                <span className="info-icon">📦</span>
                <div>
                  <div className="info-label">Livraison estimée</div>
                  <div className="info-value">{getDeliveryTime(order.customer.city)}</div>
                </div>
              </div>

              <div className="order-info-item">
                <span className="info-icon">💰</span>
                <div>
                  <div className="info-label">Mode de paiement</div>
                  <div className="info-value">{getPaymentMethodText(order.paymentMethod)}</div>
                </div>
              </div>

              <div className="order-info-item">
                <span className="info-icon">📍</span>
                <div>
                  <div className="info-label">Ville de livraison</div>
                  <div className="info-value">{order.customer.city}</div>
                </div>
              </div>

              <div className="order-info-item">
                <span className="info-icon">👤</span>
                <div>
                  <div className="info-label">Destinataire</div>
                  <div className="info-value">{order.customer.name}</div>
                </div>
              </div>

              <div className="order-info-item">
                <span className="info-icon">💵</span>
                <div>
                  <div className="info-label">Total payé</div>
                  <div className="info-value total-amount">{order.total.toFixed(2)} DH</div>
                </div>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="order-items-summary">
              <h4>Articles commandés ({order.items.length})</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      {(item.size || item.color) && (
                        <span className="item-variants">
                          {item.size && `Taille: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Couleur: ${item.color}`}
                        </span>
                      )}
                    </div>
                    <div className="item-quantity">x{item.quantity}</div>
                    <div className="item-price">{(item.price * item.quantity).toFixed(2)} DH</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h3>Prochaines étapes</h3>
            <div className="steps-list">
              <div className="step">
                <span className="step-number">1</span>
                <div>
                  <strong>Préparation</strong>
                  <p>Votre commande est en cours de préparation dans nos entrepôts</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div>
                  <strong>Expédition</strong>
                  <p>Vous recevrez un SMS avec le numéro de suivi</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div>
                  <strong>Livraison</strong>
                  <p>Réception à l'adresse: {order.customer.address}, {order.customer.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Continuer mes achats
            </button>
            
            <button 
              className="btn-secondary"
              onClick={() => window.print()}
            >
              Imprimer la confirmation
            </button>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <p>
              <strong>Besoin d'aide ?</strong> Contactez notre service client au{' '}
              <a href="tel:+212522123456">+212 522 123 456</a> ou par email à{' '}
              <a href="mailto:support@casamoda.ma">support@casamoda.ma</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}