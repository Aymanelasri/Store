import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Homme() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const menProducts = [
    {id:11,title:"Classic T-Shirt",prix:"250 DH",description:"A timeless classic t-shirt with a classic fit and classic colors.",img:"/images/men/photo1.webp"},
    {id:12,title:"Sporty Sneakers",prix:"350 DH",description:"Lightweight sport sneakers with cushioned soles for all-day comfort.",img:"/images/men/photo2.webp"},
    {id:13,title:"Leather Wallet",prix:"450 DH",description:"A compact leather wallet with multiple compartments for cards and cash.",img:"/images/men/photo3.webp"},
    {id:14,title:"Casual Shirt",prix:"100 DH",description:"A casual shirt with a relaxed fit, perfect for weekend outings.",img:"/images/men/photo4.webp"},
    {id:15,title:"Chino Pants",prix:"50 DH",description:"Comfortable chino pants with a modern fit, suitable for both work and casual wear.",img:"/images/men/photo5.webp"},
    {id:16,title:"Wool Coat",prix:"800 DH",description:"A warm wool coat with a classic design, perfect for the winter season.",img:"/images/men/photo6.webp"},
    {id:17,title:"Aviator Sunglasses",prix:"600 DH",description:"Stylish aviator sunglasses with UV protection for sunny days.",img:"/images/men/photo7.webp"},
    {id:18,title:"Leather Belt",prix:"350 DH",description:"A durable leather belt with a classic buckle, suitable for both casual and formal outfits.",img:"/images/men/photo8.webp"},
    {id:19,title:"Digital Watch",prix:"500 DH",description:"A sporty digital watch with multiple functions, perfect for active lifestyles.",img:"/images/men/photo9.webp"},
    {id:20,title:"Cologne",prix:"700 DH",description:"A fresh and invigorating cologne with woody and citrus notes.",img:"/images/men/photo10.webp"}
  ];

  const filteredProducts = menProducts.filter(
    product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{color: '#8B4513'}}>Collection Homme</h1>
          <p className="lead text-muted">Découvrez notre sélection masculine</p>
        </div>

        {/* Search Bar */}
        <div className="search-container mb-5">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Rechercher des produits..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4 mb-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm border-0">
                  <img src={product.img} className="card-img-top" alt={product.title} style={{height: '250px', objectFit: 'cover'}} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text text-muted small flex-grow-1">{product.description}</p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-success mb-0">{product.prix}</span>
                      </div>
                      <div className="d-grid gap-2">
                        <Link to={`/Details/${product.id}`} className="btn btn-sm" style={{color: '#8B4513', borderColor: '#8B4513'}}>
                          Voir Détails
                        </Link>
                        <button className="btn btn-sm text-white" style={{backgroundColor: '#8B4513'}} onClick={() => addToCart(product)}>
                          <i className="fas fa-cart-plus me-1"></i> 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="no-products">
                <i className="fas fa-search fa-2x mb-3"></i>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier votre recherche</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="about-section py-5 bg-light text-center w-100">
        <div className="container">
          <h2 className="mb-3" style={{color: '#8B4513'}}>À propos de notre collection</h2>
          <p className="lead mx-auto" style={{maxWidth: '700px'}}>
            Notre collection Homme est pensée pour allier style et confort. Chaque pièce est soigneusement sélectionnée pour offrir qualité et élégance au quotidien. Que vous recherchiez des vêtements décontractés ou des accessoires sophistiqués, nous avons tout ce qu'il vous faut pour compléter votre look.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section py-5 text-center w-100">
        <div className="container">
          <h2 className="mb-4" style={{color: '#8B4513'}}>Avis des clients</h2>
          <div className="row justify-content-center g-4">
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="mb-3">"Excellente qualité et livraison rapide ! Je recommande vivement."</p>
                <h6 className="text-muted mb-0">- Ahmed L.</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="mb-3">"Les vêtements sont vraiment confortables et élégants."</p>
                <h6 className="text-muted mb-0">- Youssef M.</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 h-100">
                <div className="mb-3">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                </div>
                <p className="mb-3">"Service client exceptionnel et produits de qualité."</p>
                <h6 className="text-muted mb-0">- Karim B.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section py-5 w-100" style={{background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'}}>
        <div className="container text-center text-white">
          <h2 className="mb-3">Inscrivez-vous à notre newsletter</h2>
          <p className="mb-4">Recevez les dernières nouveautés et offres exclusives directement dans votre boîte mail.</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              {subscribed ? (
                <div className="alert alert-success" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  Inscription réussie ! Merci de vous être abonné.
                </div>
              ) : (
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Votre adresse email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="btn btn-warning" type="button" onClick={handleSubscribe}>
                    <i className="fas fa-paper-plane me-2"></i>S'inscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-100" style={{background: '#000', color: 'white'}}>
        <div className="container py-5">
          <div className="row justify-content-between">
            <div className="col-md-4 mb-4">
              <div className="footer-logo mb-3" style={{fontSize: '2rem', fontWeight: '800', color: '#924022'}}>CASA MODA</div>
              <p className="footer-text">
                La seconde-main, c'est l'avenir et CASA MODA te le prouve.
                Sur CASA MODA, tu vends les vêtements qui ont encore des choses à vivre
                et tu déniches des merveilles que tu ne trouves pas en boutique.
              </p>
            </div>
            
            <div className="col-md-3 mb-4">
              <h6 className="footer-title mb-3" style={{color: '#f39c12', fontWeight: '700'}}>À PROPOS</h6>
              <Link to="/faq" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>FAQ</Link>
              <Link to="/contact" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>Contact</Link>
              <Link to="/mentions-legales" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>Mentions Légales</Link>
              <Link to="/cgu" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>CGU</Link>
            </div>
    
            <div className="col-md-3 mb-4">
              <h6 className="footer-title mb-3" style={{color: '#f39c12', fontWeight: '700'}}>SUIVEZ-NOUS SUR</h6>
              <div className="mb-3">
                <Link to="/" className="social-icon me-3" style={{color: '#bdc3c7', fontSize: '1.4rem'}}>
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="social-icon me-3" style={{color: '#bdc3c7', fontSize: '1.4rem'}}>
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="/" className="social-icon" style={{color: '#bdc3c7', fontSize: '1.4rem'}}>
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
              <Link to="/" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>Besoin d'aide ?</Link>
              <Link to="/" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>Comment vendre ?</Link>
              <Link to="/" className="footer-link d-block mb-2" style={{color: '#bdc3c7', textDecoration: 'none'}}>Comment acheter</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
