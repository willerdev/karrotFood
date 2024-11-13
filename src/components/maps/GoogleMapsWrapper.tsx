import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { LoadingSpinner } from '../LoadingSpinner';
import type { Google } from '@types/google.maps';

const libraries: ("places")[] = ["places"];

interface GoogleMapsWrapperProps {
  children: (google: Google) => React.ReactNode;
}

export const GoogleMapsWrapper: React.FC<GoogleMapsWrapperProps> = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return <>{children(window.google)}</>;
};
