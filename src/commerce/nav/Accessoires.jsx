import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Accessoires() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const accessProducts = [
    {id: 31, title: "Swatch Classic", description: "Montre élégante et moderne pour toutes occasions.", prix: "120 DH", img: "/images/acces/acces13.webp"},
    {id: 33, title: "Chapeau Fedora", description: "Chapeau en feutre pour un style chic et décontracté.", prix: "60 DH", img: "/images/acces/acces12.webp"},
    {id: 34, title: "Bag Sport", description: "Sac ergonomique pour activités sportives et voyage.", prix: "50 DH", img: "/images/acces/acces4.webp"},
    {id: 35, title: "Swatch Sport", description: "Montre résistante à l'eau pour les aventuriers.", prix: "130 DH", img: "/images/acces/acces1.webp"},
    {id: 36, title: "Lunettes Wayfarer", description: "Glasses style Wayfarer pour un look urbain.", prix: "90 DH", img: "/images/acces/acces2.webp"},
    {id: 37, title: "Chapeau Panama", description: "Chapeau léger, parfait pour l'été.", prix: "70 DH", img: "/images/acces/acces3.webp"},
    {id: 38, title: "Bag Classique", description: "Sac confortable pour usage quotidien.", prix: "45 DH", img: "/images/acces/acces5.webp"},
    {id: 39, title: "Swatch Luxe", description: "Montre premium avec finition dorée.", prix: "250 DH", img: "/images/acces/acces6.webp"},
    {id: 40, title: "Lunettes Retro", description: "Glasses rétro pour un style vintage.", prix: "85 DH", img: "/images/acces/acces7.webp"},
    {id: 41, title: "Chapeau Trilby", description: "Chapeau élégant pour soirées et événements.", prix: "65 DH", img: "/images/acces/acces8.webp"},
    {id: 42, title: "Bag Pro", description: "Sac professionnel pour performances optimales.", prix: "75 DH", img: "/images/acces/acces9.webp"},
    {id: 43, title: "Swatch Fashion", description: "Montre tendance avec bracelet coloré.", prix: "140 DH", img: "/images/acces/acces10.webp"}
  ];

  const filteredProducts = accessProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-info">Collection Accessoires</h1>
        <p className="lead text-muted">Découvrez notre sélection d'accessoires</p>
      </div>

      <div className="search-container">
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

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow-sm border-0" >
                <img src={product.img} className="card-img-top" alt={product.title}  style={{height: product.id >= 31 && product.id <= 43 ? '380px' : '250px', objectFit: 'cover'}} />
                <div className="card-body d-flex flex-column" style={{height: '200px', padding: '15px'}}>
                  <h5 className="card-title" style={{height: '25px', overflow: 'hidden', fontSize: '16px'}}>{product.title}</h5>
                  <p className="card-text text-muted small" style={{height: '40px', overflow: 'hidden', fontSize: '12px'}}>{product.description}</p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h6 text-success mb-0">{product.prix}</span>
                    </div>
                    <div className="d-grid gap-1">
                      <Link to={`/Details/${product.id}`} className="btn btn-outline-info btn-sm" style={{fontSize: '12px', padding: '5px'}}>
                        Voir Détails
                      </Link>
                      <button className="btn btn-info btn-sm" onClick={() => addToCart(product)} style={{fontSize: '12px', padding: '5px'}}>
                        <i className="fas fa-cart-plus me-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="no-products">
              <i className="fas fa-search"></i>
              <h3>Aucun produit trouvé</h3>
              <p>Essayez de modifier votre recherche</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}