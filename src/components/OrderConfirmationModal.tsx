import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { CartItem } from '../types';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deliveryDetails: {
    address: string;
    phone: string;
    paymentMethod: string;
    location?: any;
  };
  items: CartItem[];
  total: number;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deliveryDetails,
  items,
  total
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Confirm Your Order</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Delivery Details</h3>
              <div className="text-sm space-y-1 text-gray-600">
                <p>Address: {deliveryDetails.address}</p>
                <p>Phone: {deliveryDetails.phone}</p>
                <p>Payment: {deliveryDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Order Items</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.menuItem.name}
                      {item.customizations && (
                        <span className="text-gray-500 text-xs block">
                          {Object.entries(item.customizations)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(', ')}
                        </span>
                      )}
                    </span>
                    <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={onClose} fullWidth>
                Cancel
              </Button>
              <Button onClick={onConfirm} fullWidth>
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 