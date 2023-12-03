// useUserLocation.ts
import { useState, useEffect } from 'react';

interface UserLocation {
  latitude?: number;
  longitude?: number;
  error: string | null;
}

export const useUserLocation = (): UserLocation => {
  const [location, setLocation] = useState<UserLocation>({
    error: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation({
              error: `Geolocation error: ${error.message}`,
            });
          }
        );
      } else {
        setLocation({
          error: 'Geolocation is not supported by your browser.',
        });
      }
    };

    getLocation();
  }, []);

  return location;
};

