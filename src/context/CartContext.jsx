import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Get current user ID
  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('casaModa_user') || 'null');
    return user ? user.id || user.uid || user.email : 'guest';
  };

  // Load user-specific cart
  const loadUserCart = useCallback(() => {
    const userId = getCurrentUserId();
    const userCartKey = `cart_${userId}`;
    const saved = localStorage.getItem(userCartKey);
    return saved ? JSON.parse(saved) : [];
  }, []);

  // Save user-specific cart
  const saveUserCart = useCallback((cartItems) => {
    const userId = getCurrentUserId();
    const userCartKey = `cart_${userId}`;
    localStorage.setItem(userCartKey, JSON.stringify(cartItems));
  }, []);

  // Initialize cart on mount and when user changes
  useEffect(() => {
    const userCart = loadUserCart();
    setItems(userCart);
  }, [loadUserCart]);

  // Listen for user changes
  useEffect(() => {
    const handleUserChange = () => {
      const userCart = loadUserCart();
      setItems(userCart);
    };

    window.addEventListener('storage', handleUserChange);
    return () => window.removeEventListener('storage', handleUserChange);
  }, [loadUserCart]);

  // Persist to localStorage whenever items change
  useEffect(() => {
    saveUserCart(items);
  }, [items, saveUserCart]);

  // Clear guest data when user logs in (optional)
  const clearGuestData = useCallback(() => {
    localStorage.removeItem('cart_guest');
    localStorage.removeItem('wishlist_guest');
  }, []);

  const addItem = useCallback((product, quantity = 1, size, color) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.salePrice || product.price,
          image: product.images[0],
          quantity,
          size,
          color,
          originalPrice: product.price
        }
      ];
    });
  }, []);

  const removeItem = useCallback((id, size, color) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback((id, quantity, size, color) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    getCurrentUserId,
    clearGuestData
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
