import React from 'react';
import { Home, Search, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart' },
    { icon: ClipboardList, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="grid grid-cols-5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 ${
                isActive ? 'text-[#f27f0c]' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};