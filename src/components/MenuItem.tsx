import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem as MenuItemType } from '../types';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item, quantity, selectedCustomizations);
    setQuantity(1);
    setSelectedCustomizations({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.popular && (
          <div className="absolute top-4 right-4 bg-[#f27f0c] text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        
        {item.customization?.options.map((option) => (
          <div key={option.name} className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">{option.name}</h4>
            <div className="mt-2 space-y-2">
              {option.choices.map((choice) => (
                <label key={choice.label} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={option.name}
                    value={choice.label}
                    onChange={(e) => setSelectedCustomizations(prev => ({
                      ...prev,
                      [option.name]: e.target.value
                    }))}
                    className="text-[#f27f0c] focus:ring-[#f27f0c]"
                  />
                  <span className="text-sm text-gray-600">
                    {choice.label}
                    {choice.price > 0 && ` (+$${choice.price.toFixed(2)})`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">
              ${(item.price * quantity).toFixed(2)}
            </span>
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};