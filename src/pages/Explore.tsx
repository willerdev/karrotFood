import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { RestaurantCard } from '../components/RestaurantCard';
import { restaurants, cuisineCategories } from '../data/mockData';

export const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Input
          placeholder="Search restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />

        <div className="flex overflow-x-auto pb-4 space-x-4">
          {cuisineCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCuisine(selectedCuisine === category.name ? null : category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCuisine === category.name
                  ? 'bg-[#f27f0c] text-white'
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};