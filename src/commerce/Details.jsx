import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './Details.css';

export default function Details() {
    const {id}=useParams();
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState('M');
    const navigate = useNavigate();

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
    {id:26,title:"estro",prix:400 ,description:"A warm wool coat with a classic design, perfect for the winter season.",img:"/images/kids/photo6.webp" , quantity:15},
    {id:27,title:"Aviator Sunglasses",prix:450 ,description:"Stylish aviator sunglasses with UV protection for sunny days.",img:"/images/kids/photo7.webp" , quantity:10},
    {id:28,title:"Leather Belt",prix:350 ,description:"A durable leather belt with a classic buckle, suitable for both casual and formal outfits.",img:"/images/kids/photo8.webp" , quantity:50},
    {id:29,title:"tiyer",prix:100 ,description:"A sporty digital watch with multiple functions, perfect for active lifestyles.",img:"/images/kids/photo9.webp" , quantity:40},
    {id:30,title:"Cologne",prix:100 ,description:"A fresh and invigorating cologne with woody and citrus notes.",img:"/images/kids/photo10.webp" , quantity:30},
  ],
  acces: [
  {
    id: 31,
    title: "Swatch Classic",
    description: "Montre élégante et moderne pour toutes occasions.",
    prix: "120 DH",
    img: "/images/acces/acces13.webp",
    quantity: 10
  },
  {
    id: 32,
    title: "Lunettes Aviator",
    description: "Glasses style aviator, protection UV maximale.",
    prix: "80 DH",
    img: "/images/acces/acces11.webp",
    quantity: 50
  },
  {
    id: 33,
    title: "Chapeau Fedora",
    description: "Chapeau en feutre pour un style chic et décontracté.",
    prix: "60 DH",
    img: "/images/acces/acces12.webp",
    quantity: 25
  },
  {
    id: 34,
    title: "Bag Sport",
    description: "Sac ergonomique pour activités sportives et voyage.",
    prix: "50 DH",
    img: "/images/acces/acces4.webp",
    quantity: 10
  },
  {
    id: 35,
    title: "Swatch Sport",
    description: "Montre résistante à l'eau pour les aventuriers.",
    prix: "130 DH",
    img: "/images/acces/acces1.webp",
    quantity: 30
  },
  {
    id: 36,
    title: "Lunettes Wayfarer",
    description: "Glasses style Wayfarer pour un look urbain.",
    prix: "90 DH",
    img: "/images/acces/acces2.webp",
    quantity: 24
  },
  {
    id: 37,
    title: "Chapeau Panama",
    description: "Chapeau léger, parfait pour l'été.",
    prix: "70 DH",
    img: "/images/acces/acces3.webp",
    quantity: 19
  },
  {
    id: 38,
    title: "Bag Classique",
    description: "Sac confortable pour usage quotidien.",
    prix: "45 DH",
    img: "/images/acces/acces5.webp",
    quantity: 1
  },
  {
    id: 39,
    title: "Swatch Luxe",
    description: "Montre premium avec finition dorée.",
    prix: "250 DH",
    img: "/images/acces/acces6.webp",
    quantity: 15
  },
  {
    id: 40,
    title: "Lunettes Retro",
    description: "Glasses rétro pour un style vintage.",
    prix: "85 DH",
    img: "/images/acces/acces7.webp",
    quantity: 8
  },
  {
    id: 41,
    title: "Chapeau Trilby",
    description: "Chapeau élégant pour soirées et événements.",
    prix: "65 DH",
    img: "/images/acces/acces8.webp",
    quantity: 20
  },
  {
    id: 42,
    title: "Bag Pro",
    description: "Sac professionnel pour performances optimales.",
    prix: "75 DH",
    img: "/images/acces/acces9.webp",
    quantity: 12
  },
  {
    id: 43,
    title: "Swatch Fashion",
    description: "Montre tendance avec bracelet coloré.",
    prix: "140 DH",
    img: "/images/acces/acces10.webp",
    quantity: 14
  },
],

  
}

const allProducts=[...products.women,...products.men,...products.kids,...products.acces]

    const pr=allProducts.find(p=>p.id===Number(id))



    if (!pr) {
      return (
        <div className="details-container">
          <div className="text-center">
            <h2>Produit non trouvé (ID: {id})</h2>
            <button onClick={() => navigate('/')} className="back-btn">
              Retour aux produits
            </button>
          </div>
        </div>
      );
    }

   return (
    <div className="details-container">
      <div className="mb-3">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fas fa-arrow-left"></i> Retour aux produits
        </button>
      </div>

      <div className="row product-card">
        <div className="col-md-6 product-image-container">
          <img
            src={pr.img}
            alt="Produit"
            className={pr.id >= 31 && pr.id <= 43 ? "product-image accessory-image" : "product-image"}
            loading="lazy"
          />
        </div>

        <div className="col-md-6 product-info">
          <h1 className="product-title">{pr.title}</h1>

          <div className="product-rating">
            <span className="text-warning">★★★★☆</span>
            <span className="text-muted ms-2">(4.2/5)</span>
          </div>

          <h2 className="product-price">{pr.prix} </h2>

          <div className="product-description">
            <strong>Description:</strong><br />
            {pr.description}
          </div>

          {(pr.id >= 21 && pr.id <= 30) && (
            <div className="size-selection">
              <h6>Choisir la taille:</h6>
              <div>
                {['4-5 ans', '6-7 ans', '8-9 ans', '10-11 ans', '12-13 ans'].map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {(pr.id >= 1 && pr.id <= 16) && (
            <div className="size-selection">
              <h6>Choisir la taille:</h6>
              <div>
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>

                ))}
              </div>
            </div>
          )}
          {(pr.id >= 17 && pr.id <= 20) && (
            <div className="size-selection">
              <h6>Choisir la taille:</h6>
              <div>
                {['40', '41', '42', '43'].map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}

              </div>
            </div>
          )}
          <button className="add-to-cart-btn" onClick={() => addToCart(pr)}>
            <i className="fas fa-shopping-cart"></i>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
