import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Femme() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const womenProducts = [
    {id:1,title:"Elegant Midi Dress",prix:"300 DH",description:"A lightweight printed midi dress that offers comfort and elegance for everyday wear or special occasions.",img:"/images/women/photo1.webp"},
    {id:2,title:"Satin Blouse",prix:"200 DH",description:"A simple satin blouse with a soft collar, perfect for work or casual evening outings.",img:"/images/women/photo2.webp"},
    {id:3,title:"Leather Crossbody Bag",prix:"400 DH",description:"A small adjustable leather crossbody bag with a classic yet modern look.",img:"/images/women/photo3.webp"},
    {id:4,title:"Comfy Sneakers",prix:"250 DH",description:"Lightweight sport sneakers with cushioned soles for all-day comfort.",img:"/images/women/photo4.webp"},
    {id:5,title:"Denim Jacket",prix:"350 DH",description:"Trendy denim jacket that pairs perfectly with multiple outfits.",img:"/images/women/photo5.webp"},
    {id:6,title:"Wool Scarf",prix:"150 DH",description:"Soft and warm wool scarf with elegant colors for the winter season.",img:"/images/women/photo6.webp"},
    {id:7,title:"Skinny Jeans",prix:"300 DH",description:"Slim-fit jeans with stretch fabric for comfort and flexibility.",img:"/images/women/photo7.webp"},
    {id:8,title:"Classic Heels",prix:"400 DH",description:"Medium-heel classic shoes, suitable for office and formal events.",img:"/images/women/photo8.webp"},
    {id:9,title:"Minimalist Watch",prix:"500 DH",description:"A simple wristwatch with a clean and elegant face, perfect for everyday use.",img:"/images/women/photo9.webp"},
    {id:10,title:"Floral Perfume",prix:"700 DH",description:"A soft floral fragrance that lasts all day with refreshing notes.",img:"/images/women/photo10.webp"}
  ];

  const filteredProducts = womenProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{color: '#8B4513'}}>Collection Femme</h1>
        <p className="lead text-muted">Découvrez notre sélection féminine</p>
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