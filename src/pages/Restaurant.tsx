import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { menuItems } from '../data/menuData';

export const Restaurant: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { id: 'main-dishes', name: 'Main Dishes' },
    { id: 'daily-meals', name: 'Daily Meals' },
    { id: 'soups', name: 'Soups' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'salads', name: 'Salads' },
    { id: 'fresh-juice', name: 'Fresh Juice' },
    { id: 'wraps', name: 'Wraps' },
  ];

  const categoryName = categories.find(c => c.id === selectedCategory)?.name || categories[0].name;
  const filteredItems = menuItems.filter(item => item.category === categoryName);

  const handleAddToCart = (item: any) => {
    const menuItemWithRestaurant = {
      ...item,
      restaurantId: item.restaurantId || "128a4226-be42-4c4f-817c-e08f6e68ff45"
    };
    addItem(menuItemWithRestaurant, quantity);
    setQuantity(1);
    setSelectedItem(null);
    
    // Show a toast or notification
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/categories" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-semibold">Menu</h1>
        </div>
      </header>

      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 space-x-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-[#f27f0c] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.product_name} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.img_url}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.product_name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#f27f0c]">{item.price}</span>
                  
                  {selectedItem === item.product_name ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <Button onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setSelectedItem(item.product_name)}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};