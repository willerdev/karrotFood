import React, { useEffect } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RestaurantCard } from '../components/RestaurantCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/useAuthStore';
import { useRestaurantStore } from '../stores/useRestaurantStore';
import { useCategoryStore } from '../stores/useCategoryStore';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    restaurants, 
    isLoading: restaurantsLoading, 
    error: restaurantsError,
    fetchRestaurants 
  } = useRestaurantStore();
  const { 
    categories, 
    isLoading: categoriesLoading, 
    error: categoriesError,
    fetchCategories 
  } = useCategoryStore();

  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, [fetchRestaurants, fetchCategories]);

  if (restaurantsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  if (restaurantsError || categoriesError) {
    return <ErrorMessage message="Failed to load content. Please try again later." />;
  }

  const featuredRestaurants = restaurants.filter(restaurant => restaurant.featured);

  // console.log('Featured Restaurants:', featuredRestaurants.map(r => r.id));
  // console.log('All Restaurants:', restaurants.map(r => r.id));

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
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hello, {user.email}</span>
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
              )}
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
              className="text-lg"
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => {

              return (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              );
            })}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => {

              return (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};