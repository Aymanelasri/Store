import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function Enfants() {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const kidsProducts = [
    {id:21,title:"Graphic T-Shirt",prix:"150 DH",description:"A fun graphic t-shirt with colorful prints, perfect for everyday wear.",img:"/images/kids/photo1.webp"},
    {id:22,title:"Denim Overalls",prix:"200 DH",description:"Durable denim overalls with adjustable straps, ideal for playtime.",img:"/images/kids/photo2.webp"},
    {id:23,title:"Kids Wallet",prix:"250 DH",description:"A compact wallet with multiple compartments for cards and cash.",img:"/images/kids/photo3.webp"},
    {id:24,title:"Casual Shirt",prix:"300 DH",description:"A casual shirt with a relaxed fit, perfect for weekend outings.",img:"/images/kids/photo4.webp"},
    {id:25,title:"Chino Pants",prix:"350 DH",description:"Comfortable chino pants with a modern fit, suitable for both work and casual wear.",img:"/images/kids/photo5.webp"},
    {id:26,title:"Wool Coat",prix:"400 DH",description:"A warm wool coat with a classic design, perfect for the winter season.",img:"/images/kids/photo6.webp"},
    {id:27,title:"Kids Sunglasses",prix:"450 DH",description:"Stylish sunglasses with UV protection for sunny days.",img:"/images/kids/photo7.webp"},
    {id:28,title:"Kids Belt",prix:"350 DH",description:"A durable belt with a classic buckle, suitable for both casual and formal outfits.",img:"/images/kids/photo8.webp"},
    {id:29,title:"Digital Watch",prix:"100 DH",description:"A sporty digital watch with multiple functions, perfect for active lifestyles.",img:"/images/kids/photo9.webp"},
    {id:30,title:"Kids Cologne",prix:"100 DH",description:"A fresh and invigorating cologne with woody and citrus notes.",img:"/images/kids/photo10.webp"}
  ];

  const filteredProducts = kidsProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{color: '#8B4513'}}>Collection Enfants</h1>
        <p className="lead text-muted">Découvrez notre sélection pour enfants</p>
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
 
      {/* Kids Fun Section */}
      <div className="py-5 bg-light text-center w-100">
  <div className="container">
    <h2 className="mb-4" style={{color: '#8B4513'}}>Mode Enfants Amusante</h2>
    <div className="row g-4" style={{justifyContent: 'space-between'}}>

      <div className="col-md-4" >
        <div className="card border-0 shadow-sm h-100 p-3 d-flex">
          <div className="card-body d-flex flex-column align-items-center text-center justify-content-center">
            <i className="fas fa-smile fa-4x text-success mb-3"></i>
            <h5 className="fw-bold">Confort & Jeu</h5>
            <p className="text-muted">Vêtements confortables pour jouer et grandir en toute liberté</p>
          </div>
        </div>
      </div>

      <div className="col-md-4"  >
        <div className="card border-0 shadow-sm h-100 p-3 d-flex">
          <div className="card-body d-flex flex-column align-items-center text-center justify-content-center">
            <i className="fas fa-palette fa-4x text-warning mb-3"></i>
            <h5 className="fw-bold">Couleurs Vives</h5>
            <p className="text-muted">Des couleurs éclatantes qui stimulent la créativité</p>
          </div>
        </div>
      </div>

      <div className="col-md-4" >
        <div className="card border-0 shadow-sm h-100 p-3 d-flex ">
          <div className="card-body d-flex flex-column align-items-center text-center justify-content-center">
            <i className="fas fa-star fa-4x text-danger mb-3"></i>
            <h5 className="fw-bold">Qualité Premium</h5>
            <p className="text-muted">Matériaux doux et résistants pour le bien-être des enfants</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

    </>
  );
}