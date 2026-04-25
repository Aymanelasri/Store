import React, { createContext, useState, useEffect, useCallback } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Get current user ID
  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('casaModa_user') || 'null');
    return user ? user.id || user.uid || user.email : 'guest';
  };

  // Load user-specific wishlist
  const loadUserWishlist = useCallback(() => {
    const userId = getCurrentUserId();
    const userWishlistKey = `wishlist_${userId}`;
    const saved = localStorage.getItem(userWishlistKey);
    return saved ? JSON.parse(saved) : [];
  }, []);

  // Save user-specific wishlist
  const saveUserWishlist = useCallback((wishlistItems) => {
    const userId = getCurrentUserId();
    const userWishlistKey = `wishlist_${userId}`;
    localStorage.setItem(userWishlistKey, JSON.stringify(wishlistItems));
  }, []);

  // Initialize wishlist on mount and when user changes
  useEffect(() => {
    const userWishlist = loadUserWishlist();
    setItems(userWishlist);
  }, [loadUserWishlist]);

  // Listen for user changes
  useEffect(() => {
    const handleUserChange = () => {
      const userWishlist = loadUserWishlist();
      setItems(userWishlist);
    };

    window.addEventListener('storage', handleUserChange);
    return () => window.removeEventListener('storage', handleUserChange);
  }, [loadUserWishlist]);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveUserWishlist(items);
  }, [items, saveUserWishlist]);

  // Clear guest data when user logs in (optional)
  const clearGuestData = useCallback(() => {
    localStorage.removeItem('wishlist_guest');
  }, []);

  const addItem = useCallback((product) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) return prevItems;
      return [...prevItems, product];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const toggleItem = useCallback((product) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  }, []);

  const isWishlisted = useCallback(
    (id) => items.some((item) => item.id === id),
    [items]
  );

  const getItemCount = useCallback(() => items.length, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isWishlisted,
    getItemCount,
    getCurrentUserId,
    clearGuestData
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
