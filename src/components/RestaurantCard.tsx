import React from 'react';
import { Clock, Star, Bike } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <div className="relative h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.featured && (
          <div className="absolute top-4 right-4 bg-[#f27f0c] text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
        <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#f27f0c]" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{restaurant.deliveryTime} min</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Bike className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">${restaurant.deliveryFee.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};