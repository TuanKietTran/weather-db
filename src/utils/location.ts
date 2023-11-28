// useUserLocation.ts
import { useState, useEffect } from 'react';

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export const useUserLocation = (): UserLocation => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
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
              latitude: null,
              longitude: null,
              error: `Geolocation error: ${error.message}`,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          error: 'Geolocation is not supported by your browser.',
        });
      }
    };

    getLocation();
  }, []);

  return location;
};

