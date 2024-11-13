import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { menuItems } from '../data/menuData';

export const Restaurant: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState(category);

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
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.img_url}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.product_name}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#f27f0c]">{item.price}</span>
                  <button className="px-4 py-2 bg-[#f27f0c] text-white rounded-lg hover:bg-[#e06d0b] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};