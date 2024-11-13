import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    restaurant: 'Burger House',
    status: 'Delivered',
    date: '2024-03-10',
    items: [
      { name: 'Classic Cheeseburger', quantity: 2 },
      { name: 'French Fries', quantity: 1 },
    ],
    total: 32.97,
  },
  {
    id: '2',
    restaurant: 'Sushi Master',
    status: 'In Progress',
    date: '2024-03-09',
    items: [
      { name: 'Dragon Roll', quantity: 1 },
      { name: 'California Roll', quantity: 2 },
    ],
    total: 45.98,
  },
];

export const Orders: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Orders</h1>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{order.restaurant}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};