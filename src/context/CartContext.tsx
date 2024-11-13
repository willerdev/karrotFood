import React, { createContext, useContext, useState } from 'react';
import { CartContextType, CartItem, MenuItem } from '../types';

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (menuItem: MenuItem, quantity: number, customizations?: Record<string, string>) => {
    setItems(prev => {
      const cartItemId = `${menuItem.id}-${JSON.stringify(customizations || {})}`;
      const existingItem = prev.find(item => item.id === cartItemId);

      if (existingItem) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, {
        id: cartItemId,
        menuItem: {
          id: menuItem.id || menuItem.menu_item_id,
          name: menuItem.product_name || menuItem.name,
          price: typeof menuItem.price === 'string' 
            ? parseFloat(menuItem.price.replace(/[^0-9.]/g, ''))
            : menuItem.price,
          image: menuItem.img_url || menuItem.image,
          restaurantId: menuItem.restaurant_id || menuItem.restaurantId || "128a4226-be42-4c4f-817c-e08f6e68ff45",
          description: menuItem.description || '',
          category: menuItem.category || '',
          popular: menuItem.popular || false
        },
        quantity,
        customizations
      }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => {
      // Log item removal
      console.group('Cart Item Removed');
      console.log('Item ID:', itemId);
      console.log('Previous Cart:', prev);
      const updatedItems = prev.filter(item => item.id !== itemId);
      console.log('Updated Cart:', updatedItems);
      console.groupEnd();
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      // Log quantity update
      console.group('Cart Quantity Updated');
      console.log('Item ID:', itemId);
      console.log('New Quantity:', quantity);
      const updatedItems = prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      console.log('Updated Cart:', updatedItems);
      console.groupEnd();
      return updatedItems;
    });
  };

  const clearCart = () => {
    // Log cart clear
    console.log('Cart Cleared');
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    return sum + (item.menuItem.price * item.quantity);
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