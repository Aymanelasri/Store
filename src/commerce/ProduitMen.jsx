import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Products.css';

export default function All() {
  const { addToCart } = useContext(CartContext);
  

  const products = {
    women: [
      {id:1,title:"Elegant Midi Dress",prix:300  ,description:"A lightweight printed midi dress that offers comfort and elegance for everyday wear or special occasions.",img:"/images/women/photo1.webp" ,quantity:10},
    {id:2,title:"Satin Blouse",prix:200 ,description:"A simple satin blouse with a soft collar, perfect for work or casual evening outings.",img:"/images/women/photo2.webp" ,quantity:40  },
    {id:3,title:"Leather Crossbody Bag",prix:400 ,description:"A small adjustable leather crossbody bag with a classic yet modern look.",img:"/images/women/photo3.webp" ,quantity:30},
    {id:4,title:"Comfy Sneakers",prix:250 ,description:"Lightweight sport sneakers with cushioned soles for all-day comfort.",img:"/images/women/photo4.webp" ,quantity:20},
    {id:5,title:"Denim Jacket",prix:350,description:"Trendy denim jacket that pairs perfectly with multiple outfits.",img:"/images/women/photo5.webp" ,quantity:15},
    {id:6,title:"Wool Scarf",prix:150 ,description:"Soft and warm wool scarf with elegant colors for the winter season.",img:"/images/women/photo6.webp" ,quantity:50},
    {id:7,title:"Skinny Jeans",prix:300 ,description:"Slim-fit jeans with stretch fabric for comfort and flexibility.",img:"/images/women/photo7.webp" ,quantity:25},
    {id:8,title:"Classic Heels",prix:400 ,description:"Medium-heel classic shoes, suitable for office and formal events.",img:"/images/women/photo8.webp" ,quantity:30},
    {id:9,title:"Minimalist Watch",prix:500 ,description:"A simple wristwatch with a clean and elegant face, perfect for everyday use.",img:"/images/women/photo9.webp" ,quantity:40},
    {id:10,title:"Floral Perfume",prix:700 ,description:"A soft floral fragrance that lasts all day with refreshing notes.",img:"/images/women/photo10.webp" ,quantity:20},

  ],
  men: [
    {id:11,title:"Classic T-Shirt",prix:250 ,description:"A timeless classic t-shirt with a classic fit and classic colors.",img:"/images/men/photo1.webp" , quantity:30},
    {id:12,title:"Sporty Sneakers",prix:350 ,description:"Lightweight sport sneakers with cushioned soles for all-day comfort.",img:"/images/men/photo2.webp" , quantity:20},
    {id:13,title:"Leather Wallet",prix:450 ,description:"A compact leather wallet with multiple compartments for cards and cash.",img:"/images/men/photo3.webp" , quantity:40},
    {id:14,title:"Casual Shirt",prix:100 ,description:"A casual shirt with a relaxed fit, perfect for weekend outings.",img:"/images/men/photo4.webp" , quantity:50},
    {id:15,title:"Chino Pants",prix:50 ,description:"Comfortable chino pants with a modern fit, suitable for both work and casual wear.",img:"/images/men/photo5.webp" , quantity:60},
    {id:16,title:"Wool Coat",prix:800 ,description:"A warm wool coat with a classic design, perfect for the winter season.",img:"/images/men/photo6.webp" , quantity:70},
    {id:17,title:"Aviator Sunglasses",prix:600,description:"Stylish aviator sunglasses with UV protection for sunny days.",img:"/images/men/photo7.webp" , quantity:40},
    {id:18,title:"Leather Belt",prix:350 ,description:"A durable leather belt with a classic buckle, suitable for both casual and formal outfits.",img:"/images/men/photo8.webp" , quantity:30},
    {id:19,title:"Digital Watch",prix:500 ,description:"A sporty digital watch with multiple functions, perfect for active lifestyles.",img:"/images/men/photo9.webp" , quantity:20},
    {id:20,title:"Digital Watch",prix:700 ,description:"A fresh and invigorating cologne with woody and citrus notes.",img:"/images/men/photo10.webp" , quantity:10},     
  ],
  kids: [
    {id:21,title:"Graphic T-Shirt",prix:150 ,description:"A fun graphic t-shirt with colorful prints, perfect for everyday wear.",img:"/images/kids/photo1.webp" , quantity:30},
    {id:22,title:"Denim Overalls",prix:200 ,description:"Durable denim overalls with adjustable straps, ideal for playtime.",img:"/images/kids/photo2.webp" , quantity:40},
    {id:23,title:"Leather Wallet",prix:250 ,description:"A compact leather wallet with multiple compartments for cards and cash.",img:"/images/kids/photo3.webp" , quantity:50},
    {id:24,title:"Casual Shirt",prix:300 ,description:"A casual shirt with a relaxed fit, perfect for weekend outings.",img:"/images/kids/photo4.webp" , quantity:25},
    {id:25,title:"Chino Pants",prix:350 ,description:"Comfortable chino pants with a modern fit, suitable for both work and casual wear.",img:"/images/kids/photo5.webp" , quantity:20},
    {id:26,title:"Wool Coat",prix:400 ,description:"A warm wool coat with a classic design, perfect for the winter season.",img:"/images/kids/photo6.webp" , quantity:15},
    {id:27,title:"Aviator Sunglasses",prix:450 ,description:"Stylish aviator sunglasses with UV protection for sunny days.",img:"/images/kids/photo7.webp" , quantity:10},
    {id:28,title:"Leather Belt",prix:350 ,description:"A durable leather belt with a classic buckle, suitable for both casual and formal outfits.",img:"/images/kids/photo8.webp" , quantity:50},
    {id:29,title:"Digital Watch",prix:100 ,description:"A sporty digital watch with multiple functions, perfect for active lifestyles.",img:"/images/kids/photo9.webp" , quantity:40},
    {id:30,title:"Cologne",prix:100 ,description:"A fresh and invigorating cologne with woody and citrus notes.",img:"/images/kids/photo10.webp" , quantity:30},
  ],
}  
  return (
    <>
     <main >
  {/* Video Section */}
  <section className="video-container">
    <video  autoPlay muted loop playsInline preload="auto" className="video-full">
      <source src="video2.mp4" type="video/mp4" />
    </video>
    <div className="video-text">
       <h1>La mode pour toute la famille</h1>
        <p>Homme, femme et enfant — trouvez votre style parmi nos dernières collections.</p>
        <a className="cta-btn" href="/">Découvrir maintenant</a>
    </div>
  </section>

  {/* All Products Section */}
  <section className="all-products">
    <h2 className="text-center my-4" style={{ fontFamily: 'roboto', fontSize: '2.7vh'  }}>ALL PRODUCTS</h2>
    <div className="container d-flex text-center mb-4 justify-content-around">
      <div>
        <img className='imgc' id='img1' src="/images/3img/men2.Webp" alt="" loading="lazy" />
        <h4>Homme</h4>

      </div>
      <div>
        <img className='imgc' src="/images/3img/women.Webp" alt="" loading="lazy" />
        <h4>Femme</h4>

      </div>
      <div>
        <img className='imgc' src="/images/3img/kids.Webp" alt="" loading="lazy" />
        <h4>Enfants</h4>
      </div>
     

    </div>
    <div className="container">
  <div className="row">
    {Object.entries(products).map(([category, items]) =>
      items.map(product => (
        <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4 d-flex">
          <div className="card h-100 d-flex flex-column">
            <Link to={`/Details/${product.id}`}>
              <img
                src={product.img}
                className="card-img-top"
                alt={product.title}
                style={{ cursor: "pointer" }}
                loading="lazy"
              />
            </Link>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title" style={{ minHeight: "3rem", overflow: "hidden", textOverflow: "ellipsis" }}>
                {product.title}
              </h5>
              <p className="card-text">
                <strong>PRIX :</strong> {product.prix} DH
              </p>
              
              <div className="mt-auto">
                <Link
                  to={`/Details/${product.id}`}
                  className="btn btn-light mb-2 w-100 text-dark text-decoration-none d-flex justify-content-center"
                >
                  Voir Détails
                </Link>
                <button
                  className="btn btn-success btn-sm w-100"
                  onClick={() => addToCart(product)}
                >
                  <i className="fas fa-cart-plus me-1"></i> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>

  

  
        
  </section>
{/* ------------------------------------------------------------------------------------------- */}
  <section className="section-padding text-center">
    <div className="container">
      <h2 className="mb-5 mt-5">
        Pourquoi devriez-vous choisir <span className="highlight">CASA MODA</span> ?
      </h2>

      <div className="row text-start justify-content-center mt-5 g-5">
        
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