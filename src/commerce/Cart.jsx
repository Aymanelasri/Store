import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';
import "@fontsource/poppins";


export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const total = cartItems.reduce((sum, item) => {
    const price = typeof item.prix === 'string' ? parseFloat(item.prix.replace(' DH', '')) : Number(item.prix);
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const handlePayment = () => {
    setPaymentError('');
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      setPaymentError('Veuillez remplir tous les champs');
      return;
    }
    
    if (cardNumber.length < 16) {
      setPaymentError('Numéro de carte invalide');
      return;
    }
    
    if (cvv.length < 3) {
      setPaymentError('CVV invalide');
      return;
    }
    
    setPaymentSuccess(true);
    
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPayment(false);
      clearCart();
    }, 3000);
  };

  return (
    <div className="container mt-4">
      <div style={{ border: "none" , borderRadius: "5px" , padding: "10px", backgroundColor: "#d4af3715 "  }} className="mb-4 p-3">
        <h4 className="mb-3"><Link to="/"> Continuer vos achats</Link></h4>
      </div>
      

      <div className="container-fluid p-0">
        <div className="cart-container">

          <div className="cart-header" >
            <h1 className="h3 mb-0"><i className="fas fa-shopping-cart me-2"></i>PANIER</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-basket"></i>
              <h3 className="h5 text-muted">Votre panier est vide</h3>
              <p className="text-muted">Parcourez nos produits et ajoutez-les à votre panier</p>
              <Link to="/" className="btn btn-primary mt-3">Voir les produits</Link>
            </div>
          ) : (

            <>
       
              <div className="cart-items mb-4">
                {cartItems.map((item, index) => {
                  const id = item.id || index;
                  
                  const price = typeof item.prix === 'string' ? parseFloat(item.prix.replace(' DH', '')) : Number(item.prix) || 0;
                  const qty = Number(item.quantity) || 1;
                  return (
                    <div key={id} className="d-flex align-items-center justify-content-between mb-3 p-2 border rounded">
                      <div className="d-flex align-items-center">
                        {item.img && <img src={item.img} alt={item.title } style={{ width: 80, height: 80, objectFit: 'cover' }} className="me-3" />}
                        <div>
                          <h6 className="mb-1">{item.title  }</h6>
                          <div className="text-muted">{qty} x {price.toFixed(2)} DH</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold">{(price * qty).toFixed(2)} DH</div>
                        <button className="btn btn-sm btn-danger mt-2" onClick={() => removeFromCart(id)}>X</button>
                      </div>
                    </div>
                  )
                })}
              </div>

             
              <div className="gift-section mb-4">
                <h4 className="h5 mb-2"><i className="fas fa-gift me-2 text-warning"></i>NOTRE CADEAU DÈS 500 DH D'ACHAT</h4>
                <p className="mb-1">Un accessoire exclusif signé Casa Moda</p>
                <p className="gift-note"> avant livraison, dans la limite des stocks disponibles.</p>
              </div>

              <div className="summary-section">
                <h4 className="h5 mb-3">Récapitulatif (TTC)</h4>

                <div className="summary-line">
                  <span>Total article(s)</span>
                  <span>{cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)}</span>
                </div>

                <div className="summary-line fw-bold fs-5 mt-2">
                  <span>TOTAL</span>
                  <span>{total.toFixed(2)} DH</span>
                </div>

                

                <button className="btn checkout-btn text-white w-100 mt-4" onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    localStorage.setItem('returnToCart', 'true');
                    window.location.href = '/login';
                    return;
                  }
                  setShowPayment(true);
                }}>
                  Valider et passer au paiement
                </button>
              </div>

             
              <div className="features-section mt-4">
                <div className="row">
                  <div className="col-md-4 feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-shipping-fast"></i>
                    </div>
                    <h6 className="fw-bold">Livraison en 48 à 72h</h6>
                  </div>
                  <div className="col-md-4 feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-undo-alt"></i>
                    </div>
                    <h6 className="fw-bold">Retours sous 15 jours</h6>
                  </div>
                  <div className="col-md-4 feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-lock"></i>
                    </div>
                    <h6 className="fw-bold">Paiement sécurisé</h6>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Paiement sécurisé</h5>
                <button type="button" className="btn-close" onClick={() => setShowPayment(false)}></button>
              </div>
              <div className="modal-body">
                {paymentSuccess && (
                  <div className="alert alert-success text-center mb-4">
                    
                    Paiement effectué avec succès ! Merci pour votre achat.
                  </div>
                )}
                
                {paymentError && (
                  <div className="alert alert-danger text-center mb-4">
                    
                    {paymentError}
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label" htmlFor="cardNumber">Numéro de carte</label>
                  <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456"  value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="expiryDate">Date d'expiration</label>
                    <input type="text" className="form-control" id="expiryDate" placeholder="MM/AA"  value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="cvv">CVV</label>
                    <input type="text" className="form-control" id="cvv" placeholder="123" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="cardName">Nom sur la carte</label>
                  <input type="text" className="form-control" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Total à payer:</span>
                  <strong className="text-primary">{total.toFixed(2)} DH</strong>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPayment(false)}>Annuler</button>
                <button type="button" className="btn btn-primary" onClick={handlePayment} disabled={paymentSuccess}>
                  {paymentSuccess ? 'Paiement réussi !' : 'Confirmer le paiement'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
