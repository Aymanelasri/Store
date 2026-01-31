import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

import './Products.css';

export default function All() {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('men');

  const products = {
    women: [
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
    ],
    men: [
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
    ],
    kids: [
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
    ],
    acces: [
         {
    id: 31,
    title: "Swatch Classic",
    description: "Montre élégante et moderne pour toutes occasions.",
    prix: "120 DH",
    img: "/images/acces/acces13.webp",
  },
  
  {
    id: 33,
    title: "Chapeau Fedora",
    description: "Chapeau en feutre pour un style chic et décontracté.",
    prix: "60 DH",
    img: "/images/acces/acces12.webp",
  },
  {
    id: 34,
    title: "Bag Sport",
    description: "Sac ergonomique pour activités sportives et voyage.",
    prix: "50 DH",
    img: "/images/acces/acces4.webp",
  },
  {
    id: 35,
    title: "Swatch Sport",
    description: "Montre résistante à l'eau pour les aventuriers.",
    prix: "130 DH",
    img: "/images/acces/acces1.webp",
  },
  {
    id: 36,
    title: "Lunettes Wayfarer",
    description: "Glasses style Wayfarer pour un look urbain.",
    prix: "90 DH",
    img: "/images/acces/acces2.webp",
  },
  {
    id: 37,
    title: "Chapeau Panama",
    description: "Chapeau léger, parfait pour l'été.",
    prix: "70 DH",
    img: "/images/acces/acces3.webp",
  },
  {
    id: 38,
    title: "Bag Classique",
    description: "Sac confortable pour usage quotidien.",
    prix: "45 DH",
    img: "/images/acces/acces5.webp",
  },
  {
    id: 39,
    title: "Swatch Luxe",
    description: "Montre premium avec finition dorée.",
    prix: "250 DH",
    img: "/images/acces/acces6.webp",
  },
  {
    id: 40,
    title: "Lunettes Retro",
    description: "Glasses rétro pour un style vintage.",
    prix: "85 DH",
    img: "/images/acces/acces7.webp",
  },
  {
    id: 41,
    title: "Chapeau Trilby",
    description: "Chapeau élégant pour soirées et événements.",
    prix: "65 DH",
    img: "/images/acces/acces8.webp",
  },
  {
    id: 42,
    title: "Bag Pro",
    description: "Sac professionnel pour performances optimales.",
    prix: "75 DH",
    img: "/images/acces/acces9.webp",
  },
  {
    id: 43,
    title: "Swatch Fashion",
    description: "Montre tendance avec bracelet coloré.",
    prix: "140 DH",
    img: "/images/acces/acces10.webp",
  },
],
  
  }

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return Object.entries(products).flatMap(([category, items]) => items);
    }
    return products[selectedCategory] || [];
  };

  return (
    <>
      <main>
        <section className="all-products">
          <h2 className="text-center my-4" style={{ fontFamily:'roboto , sans-serif , serif, cursive', fontWeight: 'bold' }}>ALL PRODUCTS</h2>
          
          <div className="container d-flex gap-4 text-center justify-content-center mb-4">
            <div 
              onClick={() => setSelectedCategory('men')} 
              className={`category-tab ${selectedCategory === 'men' ? 'active' : ''}`}
            >
              <h3>Men</h3>
            </div>
            <div 
              onClick={() => setSelectedCategory('women')} 
              className={`category-tab ${selectedCategory === 'women' ? 'active' : ''}`}
            >
              <h3>Women</h3>
            </div>
            <div 
              onClick={() => setSelectedCategory('kids')} 
              className={`category-tab ${selectedCategory === 'kids' ? 'active' : ''}`}
            >
              <h3>Kids</h3>
            </div>
            <div 
              onClick={() => setSelectedCategory('acces')} 
              className={`category-tab ${selectedCategory === 'acces' ? 'active' : ''}`}
            >
              <h3>Accessoires</h3>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {getFilteredProducts().map(product => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
                  <div className="card h-100">
                    <img src={product.img} className="card-img-top" alt={product.title} style={{height: product.id >= 31 && product.id <= 43 ? '380px' : '250px', objectFit: 'cover'}} />
                    <div className="card-body">
                      <h5 className="card-title ">{product.title}</h5>
                      <p className="card-text "><strong>PRIX : </strong><strong>{product.prix}</strong></p>
                      <div className="d-grid gap-1">
                        <Link to={`/Details/${product.id}`} className='btn btn-light mb-2'>Voir Détails</Link> 
                        <button className='btn btn-primary' onClick={() => addToCart(product)}>
                          <i className="fas fa-shopping-cart me-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      

             
 
{/* ------------------------------------------------------------------------------------------- */}
  <section className="section-padding text-center">
    <div className="container">
      <h2 className="mb-5 mt-5">
        Pourquoi devriez-vous choisir <span className="highlight">CASA MODA</span> ?
      </h2>

      <div className="row text-start justify-content-center mt-5 gap-5">
        
        <div className="col-md-4 feature">
          <h5 className="fw-bold">La mode à petit prix.</h5>
          <p>
            Vous pouvez avoir une différence allant jusqu'à -70% moins cher comparé au même produit neuf.
            Cela vaut le coût pour faire des économies sur votre budget shopping.
          </p>
        </div>

       
        <div className="col-md-4 feature">
          <h5 className="fw-bold">Protection & Sécurité</h5>
          <p>
            Vos paiements en ligne ou en cash sont sécurisés par CASA MODA.
            Et si l'article n'est pas conforme, le remboursement est garanti et le retour offert.
          </p>
        </div>

       
        <div className="col-md-4 feature">
          <h5 className="fw-bold">Livraison porte à porte</h5>
          <p>
            Finis le casse-tête de la vente à distance. Ne vous déplacez plus,
            un livreur vient jusqu'en bas de chez vous pour récupérer ou vous livrer un article.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>
{/* ----------------------------------------------------------------------------------------------- */}
  <footer >
    <div className="container">
      <div className="row justify-content-between">
       
        <div className="col-md-4 mb-4">
          <div className="footer-logo">CASA MODA</div>
          <p className="footer-text">
            La seconde-main, c'est l'avenir et CASA MODA te le prouve.
            Sur CASA MODA, tu vends les vêtements qui ont encore des choses à vivre
            et tu déniches des merveilles que tu ne trouves pas en boutique.
          </p>
        </div>

        
      <div className="col-md-3 mb-4">
          <h6 className="footer-title">À PROPOS</h6>
          <Link to="/faq" className="footer-link">FAQ</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/mentions-legales" className="footer-link">Mentions Légales</Link>
          <Link to="/cgu" className="footer-link">CGU</Link>
        </div>

        <div className="col-md-3 mb-4">
          <h6 className="footer-title">SUIVEZ-NOUS SUR</h6>
          <div className="mb-3">
            <Link to="/" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="/" className="social-icon">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="/" className="social-icon">
              <i className="fab fa-youtube"></i>
            </Link>
            
          </div>

          <Link to="/" className="footer-link">Besoin d'aide ?</Link>
          <Link to="/" className="footer-link">Comment vendre ?</Link>
          <Link to="/" className="footer-link">Comment acheter</Link>
       </div>
      </div>
    </div>
  </footer>

    </>
  );
}
