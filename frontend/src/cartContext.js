import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

/**
 * Custom hook to access the cart context.
 * Provides access to cart state and actions like adding, removing, and clearing items.
 *
 * @returns {Object} The cart context with `cart`, `addToCart`, `removeFromCart`, and `clearCart` methods.
 */
export const useCart = () => {
  return useContext(CartContext);
};
/**
 * CartProvider component to manage cart state globally.
 * Wrap your application or components tree with this provider to use cart-related functionality.
 *
 * @param {Object} props - The props for the CartProvider.
 * @param {React.ReactNode} props.children - The components that require access to the cart context.
 * @returns {JSX.Element} The CartContext.Provider wrapping the children.
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
