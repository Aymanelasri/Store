import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Homme() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = menProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{color: '#8B4513'}}>Collection Homme</h1>
        <p className="lead text-muted">Découvrez notre sélection masculine</p>
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