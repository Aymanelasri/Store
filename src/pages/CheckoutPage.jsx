import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

export default function CheckoutPage({ showToast }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { items: cartItems, getTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Delivery form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Casablanca'
  });

  const total = getTotal();
  const shippingCost = total >= 400 ? 0 : 30;
  const finalTotal = total + shippingCost;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast('Veuillez entrer votre nom complet', 'error');
      return false;
    }
    if (!formData.phone.trim()) {
      showToast('Veuillez entrer votre numéro de téléphone', 'error');
      return false;
    }
    if (!formData.address.trim()) {
      showToast('Veuillez entrer votre adresse', 'error');
      return false;
    }
    if (!formData.city) {
      showToast('Veuillez sélectionner votre ville', 'error');
      return false;
    }
    return true;
  };

  const handleOrderSuccess = (method, paymentId = null) => {
    // Generate order ID
    const orderId = 'CM-' + Date.now().toString().slice(-6);
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('casaModa_user') || 'null');
    const userId = currentUser ? currentUser.id || currentUser.uid || currentUser.email : 'guest';
    
    // Create order object
    const order = {
      id: orderId,
      userId: userId,
      items: cartItems,
      subtotal: total,
      shipping: shippingCost,
      total: finalTotal,
      customer: formData,
      paymentMethod: method,
      paymentId: paymentId,
      status: 'confirmed',
      date: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('fr-FR')
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('casaModa_orders') || '[]');
    orders.push(order);
    localStorage.setItem('casaModa_orders', JSON.stringify(orders));
    
    // Clear cart
    clearCart();
    
    // Show success message
    showToast('Commande confirmée avec succès! 🎉', 'success');
    
    // Redirect to confirmation
    navigate(`/confirmation?orderId=${orderId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (paymentMethod === 'cod') {
        // Cash on delivery - no payment processing needed
        setTimeout(() => {
          handleOrderSuccess('cod');
          setLoading(false);
        }, 1000); // Simulate processing time
        
      } else if (paymentMethod === 'card') {
        // Stripe payment
        if (!stripe || !elements) {
          showToast('Erreur de paiement. Veuillez réessayer.', 'error');
          setLoading(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);
        
        const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: formData.name,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              country: 'MA'
            }
          }
        });

        if (error) {
          showToast(error.message, 'error');
          setLoading(false);
          return;
        }

        // In test mode, we simulate successful payment
        // In production, you would create a payment intent on your backend
        setTimeout(() => {
          handleOrderSuccess('card', pm.id);
          setLoading(false);
        }, 2000); // Simulate processing time
      }
    } catch (error) {
      console.error('Payment error:', error);
      showToast('Erreur lors du paiement. Veuillez réessayer.', 'error');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Finaliser la commande</h1>
        
        <div className="checkout-container">
          {/* LEFT SIDE - Delivery Form */}
          <div className="checkout-section delivery-section">
            <h3>Informations de livraison</h3>
            <form className="delivery-form">
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Entrez votre nom complet"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="06 12 34 56 78"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Adresse complète *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rue, quartier, numéro..."
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Ville *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Casablanca">Casablanca</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Fès">Fès</option>
                  <option value="Tanger">Tanger</option>
                  <option value="Agadir">Agadir</option>
                  <option value="Meknès">Meknès</option>
                  <option value="Oujda">Oujda</option>
                  <option value="Tétouan">Tétouan</option>
                  <option value="Salé">Salé</option>
                </select>
              </div>
            </form>
          </div>

          {/* MIDDLE - Payment Methods */}
          <div className="checkout-section payment-section">
            <h3>Mode de paiement</h3>
            
            <div className="payment-methods">
              <label 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod"
                  checked={paymentMethod === 'cod'} 
                  readOnly 
                />
                <div className="payment-info">
                  <div className="payment-title">
                    <span className="payment-icon">💵</span>
                    Cash à la livraison
                  </div>
                  <p className="payment-desc">
                    Payez en espèces à la réception de votre commande
                  </p>
                </div>
              </label>

              <label 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="card"
                  checked={paymentMethod === 'card'} 
                  readOnly 
                />
                <div className="payment-info">
                  <div className="payment-title">
                    <span className="payment-icon">💳</span>
                    Carte bancaire
                  </div>
                  <p className="payment-desc">
                    Visa / Mastercard — Paiement sécurisé
                  </p>
                </div>
              </label>
            </div>

            {/* Stripe Card Form */}
            {paymentMethod === 'card' && (
              <div className="card-form">
                <p className="test-mode-notice">
                  🔒 Mode test — Utilisez: 4242 4242 4242 4242
                </p>
                <div className="card-element-container">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#1a1a1a',
                          fontFamily: 'Jost, sans-serif',
                          '::placeholder': {
                            color: '#aab7c4'
                          }
                        },
                        invalid: {
                          color: '#E53935'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="checkout-section summary-section">
            <h3>Récapitulatif</h3>
            
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-variants">
                      {item.size && `Taille: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && (
                        <span>
                          Couleur: 
                          <span 
                            className="color-dot" 
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="item-quantity">x{item.quantity}</div>
                  <div className="item-price">{(item.price * item.quantity).toFixed(2)} DH</div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} DH</span>
              </div>
              <div className="total-row">
                <span>Livraison</span>
                <span className={shippingCost === 0 ? 'free-shipping' : ''}>
                  {shippingCost === 0 ? 'Gratuit' : `${shippingCost} DH`}
                </span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} DH</span>
              </div>
            </div>

            <button 
              className="confirm-order-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                paymentMethod === 'card' ? 'Traitement du paiement...' : 'Confirmation...'
              ) : (
                `Confirmer la commande • ${finalTotal.toFixed(2)} DH`
              )}
            </button>

            <p className="security-notice">
              🔒 Vos informations sont sécurisées et protégées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}