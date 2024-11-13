import { Restaurant, MenuItem } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '25-35',
    deliveryFee: 3.99,
    featured: true,
  },
  {
    id: '2',
    name: 'Burger House',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=800',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '20-30',
    deliveryFee: 2.99,
    featured: true,
  },
  {
    id: '3',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '30-40',
    deliveryFee: 1.99,
    featured: false,
  },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Dragon Roll',
    description: 'Shrimp tempura, avocado, cucumber, topped with eel and spicy mayo',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800',
    category: 'Sushi Rolls',
    popular: true,
  },
  {
    id: '2',
    restaurantId: '2',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty, cheddar cheese, lettuce, tomato, special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'Burgers',
    popular: true,
    customization: {
      options: [
        {
          name: 'Cooking Preference',
          choices: [
            { label: 'Medium Rare', price: 0 },
            { label: 'Medium', price: 0 },
            { label: 'Well Done', price: 0 },
          ],
        },
        {
          name: 'Add-ons',
          choices: [
            { label: 'Bacon', price: 2.50 },
            { label: 'Extra Cheese', price: 1.50 },
            { label: 'Caramelized Onions', price: 1.00 },
          ],
        },
      ],
    },
  },
];

export const cuisineCategories = [
  { id: '1', name: 'Japanese', icon: '🍱' },
  { id: '2', name: 'American', icon: '🍔' },
  { id: '3', name: 'Italian', icon: '🍕' },
  { id: '4', name: 'Mexican', icon: '🌮' },
  { id: '5', name: 'Chinese', icon: '🥡' },
  { id: '6', name: 'Indian', icon: '🍛' },
];