import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

export const TrackOrder: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<any>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [locationError, setLocationError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let watchId: number;

    const setupLocationTracking = async () => {
      try {
        // First check if geolocation is supported
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by your browser');
        }

        // Get initial position with a timeout
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            }
          );
        });

        // Set initial position
        const initialPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(initialPosition);
        
        // Set delivery location based on initial position
        const randomLat = initialPosition.lat + (Math.random() - 0.5) * 0.02;
        const randomLng = initialPosition.lng + (Math.random() - 0.5) * 0.02;
        setDeliveryLocation({ lat: randomLat, lng: randomLng });
        
        setIsLoading(false);

        // Start watching position for updates
        watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setLocationError('');
            setCurrentLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
          },
          (error) => {
            handleLocationError(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } catch (error) {
        handleLocationError(error);
        setIsLoading(false);
      }
    };

    const handleLocationError = (error: any) => {
      let errorMessage = 'An unknown error occurred';
      if (error.code === 1) {
        errorMessage = 'Location access denied. Please enable location services in your browser settings.';
      } else if (error.code === 2) {
        errorMessage = 'Location information is unavailable';
      } else if (error.code === 3) {
        errorMessage = 'Location request timed out';
      }
      setLocationError(errorMessage);
    };

    setupLocationTracking();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    if (currentLocation && deliveryLocation) {
      // Calculate distance and duration
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation,
          destination: deliveryLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const route = result.routes[0].legs[0];
            setDistance(route.distance?.text || '');
            setDuration(route.duration?.text || '');
          }
        }
      );
    }
  }, [currentLocation, deliveryLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold">Track Order</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {locationError}
          </div>
        </div>
      </div>
    );
  }

  if (!currentLocation || !deliveryLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Track Order</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentLocation}
              zoom={15}
            >
              <Marker position={currentLocation} label="You" />
              <Marker position={deliveryLocation} label="Driver" />
              <Polyline
                path={[currentLocation, deliveryLocation]}
                options={{
                  strokeColor: '#f27f0c',
                  strokeWeight: 3,
                }}
              />
            </GoogleMap>
          </LoadScript>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Distance</h3>
                <p className="text-lg font-semibold">{distance}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Estimated Time</h3>
                <p className="text-lg font-semibold">{duration}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
