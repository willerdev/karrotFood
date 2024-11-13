import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { menuItems } from '../data/menuData';

const categories = [
  { id: 'main-dishes', name: 'Main Dishes', icon: '🍖' },
  { id: 'daily-meals', name: 'Daily Meals', icon: '🍱' },
  { id: 'soups', name: 'Soups', icon: '🥣' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'fresh-juice', name: 'Fresh Juice', icon: '🥤' },
  { id: 'wraps', name: 'Wraps', icon: '🌯' },
];

export const Categories: React.FC = () => {
  // Count items in each category
  const categoryCount = categories.reduce((acc, category) => {
    acc[category.name] = menuItems.filter(item => item.category === category.name).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-semibold">Food Categories</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/restaurant/${category.id}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {categoryCount[category.name]} items
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};