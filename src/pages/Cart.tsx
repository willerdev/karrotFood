import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to your cart</p>
          <Button onClick={() => navigate('/categories')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.menuItem.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.menuItem.price.toFixed(2)} FRW
                </p>
                
                {item.customizations && Object.entries(item.customizations).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-600">
                    {key}: {value}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>{total.toFixed(2)} FRW</span>
        </div>
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => navigate('/delivery')}
        >
          Proceed to Delivery ({total.toFixed(2)} FRW)
        </Button>
      </div>
    </div>
  );
};