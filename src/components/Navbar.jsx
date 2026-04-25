import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../commerce/firebase';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({ showToast }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('casaModa_user') || 'null')
  );
  const { getItemCount: getCartCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    
    // Close search and user menu when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container') && !event.target.closest('.search-button')) {
        setSearchOpen(false);
      }
      if (!event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          provider: user.providerData[0]?.providerId
        };
        localStorage.setItem('casaModa_user', JSON.stringify(userData));
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('casaModa_user');
        setCurrentUser(null);
      }
    });
    
    const handleStorage = () => {
      setCurrentUser(
        JSON.parse(localStorage.getItem('casaModa_user') || 'null')
      );
    };
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('click', handleClickOutside);
      unsubscribe();
    };
  }, []);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
    if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/products?search=${searchQuery.trim()}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('casaModa_user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset user state
    setCurrentUser(null);
    setUserMenuOpen(false);
    
    // Force cart and wishlist to refresh for guest user
    window.dispatchEvent(new Event('storage'));
    
    if (showToast) {
      showToast('Déconnecté', 'info');
    }
    navigate('/');
  };

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ background: '#1a1a1a', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '13px', letterSpacing: '0.4px' }}>
        🚚 Livraison gratuite dès 400 DH &nbsp;|&nbsp; Retour sous 14 jours
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top bg-white border-bottom"
        style={{ boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none', transition: 'box-shadow 0.3s', zIndex: 500, position: 'relative' }}
      >
        <div className="container" style={{ maxWidth: '1280px' }}>

          {/* Logo */}
          <Link className="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#1a1a1a', letterSpacing: '1px' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ color: '#C9A96E' }}>
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="16,6 20,14 28,14 22,20 24,28 16,22 8,28 10,20 4,14 12,14" fill="currentColor" />
            </svg>
            Casa Moda
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ boxShadow: 'none' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Collapsible Content */}
          <div className={`collapse navbar-collapse ${mobileOpen ? 'show' : ''}`}>
            {/* Nav Links — centered */}
            <ul className="navbar-nav mx-auto gap-1">
              {[
                { label: 'Femme', to: '/femme?gender=femme' },
                { label: 'Homme', to: '/homme?gender=homme' },
                { label: 'Nouveautés', to: '/femme?sort=nouveau' },
                { label: 'Soldes', to: '/femme?sale=true' },
              ].map(({ label, to }) => (
                <li className="nav-item" key={label}>
                  <Link
                    className="nav-link px-3"
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    style={{ fontSize: '14px', fontWeight: '500', color: '#333', letterSpacing: '0.4px', position: 'relative' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search & Icons — right */}
            <div className="d-flex align-items-center gap-3">
              <button 
                className="btn btn-link p-0 text-dark search-button" 
                style={{ lineHeight: 1 }} 
                title="Rechercher"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchOpen(!searchOpen);
                }}
              >
                <Search size={19} />
              </button>

              <Link to="/wishlist" className="position-relative text-dark" style={{ lineHeight: 1 }}>
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill position-absolute" style={{ background: '#C9A96E', top: '-8px', right: '-8px', fontSize: '10px', minWidth: '18px', padding: '2px 5px' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="position-relative text-dark" style={{ lineHeight: 1 }}>
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="badge rounded-pill position-absolute" style={{ background: '#C9A96E', top: '-8px', right: '-8px', fontSize: '10px', minWidth: '18px', padding: '2px 5px' }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="position-relative user-menu-container" style={{ lineHeight: 1 }}>
                {currentUser?.photo ? (
                  <img 
                    src={currentUser.photo} 
                    alt="Profile"
                    style={{ width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                ) : (
                  <button 
                    className="btn btn-link p-0 text-dark"
                    style={{ lineHeight: 1, fontSize: '16px', fontWeight: 'bold' }}
                    onClick={() => currentUser ? setUserMenuOpen(!userMenuOpen) : navigate('/login')}
                    title={currentUser ? 'Mon compte' : 'Se connecter'}
                  >
                    {currentUser ? currentUser.email[0].toUpperCase() : <User size={19} />}
                  </button>
                )}
                
                {userMenuOpen && currentUser && (
                  <div style={{
                    position: 'absolute', 
                    right: 0, 
                    top: '100%',
                    background: 'white', 
                    border: '1px solid #E8E0D5',
                    borderRadius: '8px', 
                    padding: '8px', 
                    minWidth: '160px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    zIndex: 999,
                    marginTop: '8px'
                  }}>
                    <p style={{ padding: '8px 12px', fontSize: '13px', color: '#888', margin: 0, borderBottom: '1px solid #f0f0f0' }}>
                      {currentUser.email}
                    </p>
                    <button 
                      onClick={handleLogout}
                      style={{
                        width: '100%', 
                        padding: '8px 12px', 
                        textAlign: 'left',
                        border: 'none', 
                        background: 'none', 
                        cursor: 'pointer',
                        color: '#E53935', 
                        fontSize: '13px'
                      }}
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {searchOpen && (
          <div className="search-container" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            padding: '12px 24px',
            borderBottom: '1px solid #E8E0D5',
            zIndex: 999,
            display: 'flex',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <input
              autoFocus
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              style={{
                flex: 1,
                border: 'none',
                borderBottom: '1px solid #C9A96E',
                outline: 'none',
                fontSize: '16px',
                padding: '8px 0',
                background: 'transparent',
              }}
            />
            <button
              onClick={handleSearchClick}
              style={{
                background: '#C9A96E',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Rechercher
            </button>
            <button
              onClick={() => setSearchOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#888',
              }}
            >
              ×
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
