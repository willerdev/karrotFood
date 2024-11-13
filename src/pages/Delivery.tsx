import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Delivery: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions - in a real app, this would come from an API
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    
    // Mock search suggestions
    if (value.length > 2) {
      setSuggestions([
        `${value} Street, Kigali`,
        `${value} Avenue, Kigali`,
        `${value} District, Kigali`,
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    const deliveryDetails = {
      address,
      additionalInfo
    };
    localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Delivery Location</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                ref={inputRef}
                label="Search Location"
                value={address}
                onChange={handleAddressChange}
                placeholder="Search for your address"
                className="mb-2"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Input
              label="Additional Information"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Apartment number, building name, etc."
            />
          </div>
        </div>

        <Button 
          fullWidth 
          size="lg" 
          onClick={handleSubmit}
          disabled={!address.trim()}
        >
          Confirm Location
        </Button>
      </main>
    </div>
  );
};