import React from 'react';
import { User, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Account: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const userMetadata = user.user_metadata;
  const fullName = userMetadata?.full_name || user.email?.split('@')[0] || 'User';

  const menuItems = [
    { icon: User, label: 'Personal Information', onClick: () => {} },
    { icon: MapPin, label: 'Delivery Addresses', onClick: () => {} },
    { icon: CreditCard, label: 'Payment Methods', onClick: () => {} },
    { icon: Settings, label: 'Preferences', onClick: () => {} },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-[#f27f0c] rounded-full flex items-center justify-center">
            <span className="text-2xl text-white font-semibold">
              {fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center px-6 py-4 hover:bg-gray-50 border-b border-gray-200 last:border-0"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              <span className="ml-3 text-gray-700">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
          className="flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};