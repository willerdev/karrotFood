import React, { useEffect, useState } from 'react';
import { Clock, CreditCard, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../stores/useOrderStore';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { PaymentModal } from '../components/PaymentModal';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error, fetchOrders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Error loading orders: {error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Your Orders</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  const handleTrackOrder = (orderId: string) => {
    navigate(`/track-order/${orderId}`);
  };

  const handlePayOrder = (order: any) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {order.restaurant?.name || 'Unknown Restaurant'}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {item.quantity}x {item.menu_item?.name || 'Unknown Item'}
                  </span>
                  <span className="text-gray-900">
                    {(item.unit_price * item.quantity).toFixed(2)} {import.meta.env.VITE_CURRENCY_RW}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between font-medium mb-4">
                <span>Total</span>
                <span>{order.total_amount.toFixed(2)} {import.meta.env.VITE_CURRENCY_RW}</span>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => handleTrackOrder(order.id)}
                  className="flex-1"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
                {order.status !== 'paid' && (
                  <Button 
                    onClick={() => handlePayOrder(order)}
                    className="flex-1"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};