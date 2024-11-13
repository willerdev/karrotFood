import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useOrderStore } from '../stores/useOrderStore';
import { OrderConfirmationModal } from '../components/OrderConfirmationModal';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Load delivery details from localStorage
    const deliveryDetails = localStorage.getItem('deliveryDetails');
    if (deliveryDetails) {
      const { address: savedAddress } = JSON.parse(deliveryDetails);
      setAddress(savedAddress);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!address || !phone) {
        throw new Error('Please fill in all delivery details');
      }

      const deliveryDetails = {
        address,
        phone,
        paymentMethod,
        location: JSON.parse(localStorage.getItem('deliveryDetails') || '{}').location
      };

      setOrderDetails(deliveryDetails);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to process order:', error);
      alert(error instanceof Error ? error.message : 'Failed to process order');
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const { createOrder } = useOrderStore.getState();
      const orderId = await createOrder(orderDetails, items, total);

      if (paymentMethod === 'card') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      clearCart();
      localStorage.removeItem('deliveryDetails');
      
      alert('Order placed successfully!');
      navigate(`/orders`);
    } catch (error) {
      console.error('Failed to process order:', error);
      alert(error instanceof Error ? error.message : 'Failed to process order');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to checkout</p>
          <Button onClick={() => navigate('/explore')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <Input
                label="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#f27f0c] focus:ring-[#f27f0c]"
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#f27f0c] focus:ring-[#f27f0c]"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.quantity}x {item.menuItem.name}
                  </span>
                  <span className="font-medium">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" fullWidth size="lg">
            Place Order (${total.toFixed(2)})
          </Button>
        </form>
      </main>

      <OrderConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmOrder}
        deliveryDetails={orderDetails}
        items={items}
        total={total}
      />
    </div>
  );
}; 