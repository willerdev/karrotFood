import React, { useState } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { restaurants, cuisineCategories } from '../data/mockData';
import { RestaurantCard } from '../components/RestaurantCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { items, total } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShoppingBag className="w-8 h-8 text-[#f27f0c]" />
              <span className="ml-2 text-xl font-bold text-gray-900">karrotFood</span>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hello, {user.name}</span>
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
              )}
              
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-600" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f27f0c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Delicious Food,<br />Delivered To Your Door
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Choose from hundreds of restaurants and get your food delivered fast
          </p>
          <div className="max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Search for restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg"
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>

        {/* Cuisine Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Cuisine</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {cuisineCategories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants
              .filter(restaurant => restaurant.featured)
              .map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About karrotFood</h3>
              <p className="text-gray-600">
                Connecting you with the best restaurants in your area.
                Fast delivery, great food, and excellent service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-[#f27f0c]">Home</Link></li>
                <li><Link to="/explore" className="text-gray-600 hover:text-[#f27f0c]">Restaurants</Link></li>
                <li><Link to="/orders" className="text-gray-600 hover:text-[#f27f0c]">Orders</Link></li>
                <li><Link to="/account" className="text-gray-600 hover:text-[#f27f0c]">Account</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Email: support@karrotfood.com</li>
                <li className="text-gray-600">Phone: (555) 123-4567</li>
                <li className="text-gray-600">Address: 123 Food Street, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; 2024 karrotFood. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};