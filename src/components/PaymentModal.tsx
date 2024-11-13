import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // Implement your payment logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated payment
      alert('Payment successful!');
      onClose();
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">
                  {order.total_amount.toFixed(2)} {import.meta.env.VITE_CURRENCY_RW}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!phone || isProcessing}
              fullWidth
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
