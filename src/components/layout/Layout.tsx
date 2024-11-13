import React from 'react';
import { MobileNavigation } from './MobileNavigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {children}
      {!isAuthPage && <MobileNavigation />}
    </div>
  );
};