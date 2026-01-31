import React, { useContext, useState, useEffect } from "react";
import "./Nav.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function Nav() {
  const { cartItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const currentPage = location.pathname;

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStatusChanged'));
  };

  return (
    <>
      <header className={`hero-section ${!isHomePage ? 'nav-only' : ''}`} data-page={currentPage}>
        <nav className="navbar navbar-expand-lg hero-nav" data-page={currentPage}>
          <div className="container">
            <Link to="/" className="navbar-brand fw-bold">
              C A S A   M O D A
            </Link>

            <div className="d-flex gap-3 align-items-center d-lg-none">
              <Link className="nav-link cart-icon" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-badge">{cartCount}</span>
              </Link>
              {isLoggedIn ? (
                <button className="nav-link login-btn" onClick={handleLogout} style={{background: 'none', border: 'none'}}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              ) : (
                <Link className="nav-link login-btn" to="/Login">
                  <i className="fas fa-user"></i>
                </Link>
              )}
              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>

            <div className={`navbar-collapse ${isMobileMenuOpen ? 'show' : 'collapse'}`}>
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link className="nav-link" to="/homme" onClick={() => setIsMobileMenuOpen(false)}>Homme</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/femme" onClick={() => setIsMobileMenuOpen(false)}>Femme</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/enfants" onClick={() => setIsMobileMenuOpen(false)}>Enfants</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/accessoires" onClick={() => setIsMobileMenuOpen(false)}>Accessoires</Link></li>
              </ul>

              <div className="d-none d-lg-flex gap-3 align-items-center">
                <Link className="nav-link cart-icon" to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-badge">{cartCount}</span>
                </Link>
                {isLoggedIn ? (
                  <button className="nav-link login-btn" onClick={handleLogout} style={{background: 'none', border: 'none'}}>
                    <i className="fas fa-sign-out-alt"></i> Déconnexion
                  </button>
                ) : (
                  <Link className="nav-link login-btn" to="/Login">Connexion</Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {isHomePage && (
          <div className="hero-content container">
            <h6 className="text-uppercase hero-subtitle">Nouvelle Collection Automne</h6>
            <button type="button" className="hero-link">Découvrir →</button>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
