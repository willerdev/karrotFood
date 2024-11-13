import React, { createContext, useContext, useState } from 'react';
import { CartContextType, CartItem, MenuItem } from '../types';

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (menuItem: MenuItem, quantity: number, customizations?: Record<string, string>) => {
    setItems(prev => {
      const existingItem = prev.find(
        item => 
          item.menuItem.id === menuItem.id && 
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItem) {
        return prev.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { id: `${menuItem.id}-${Date.now()}`, menuItem, quantity, customizations }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const itemTotal = item.menuItem.price * item.quantity;
    const customizationTotal = item.customizations
      ? Object.values(item.customizations).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0)
      : 0;
    return sum + itemTotal + customizationTotal;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};