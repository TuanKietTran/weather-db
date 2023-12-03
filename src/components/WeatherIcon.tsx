import React from 'react';
import Image from "next/image";

interface WeatherIconProps {
  code: number; // Weather code from the WeatherAPI response
  isDay: boolean; // Indicates whether it's daytime
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay }) => {
  const getIconPath = (iconName: string) => `/fill/all/${iconName}.svg`;

  const weatherIcons: Record<number, { day: string; night: string }> = {
    1000: { day: 'clear-day', night: 'clear-night' },
    1003: { day: 'partly-cloudy-day', night: 'partly-cloudy-night' },
    1006: { day: 'cloudy', night: 'cloudy' },
    1009: { day: 'overcast-day', night: 'overcast-cloudy' },
    1030: { day: 'fog', night: 'fog' },
    1063: { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
    1069: { day: 'partly-cloudy-day-sleet', night: 'partly-cloudy-night-sleet' },
    1066: { day: 'partly-cloudy-day-snow', night: 'partly-cloudy-night-snow' },
    1072: { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
    1240: { day: 'rain', night: 'rain' },
    // Include partly cloudy icons
    1007: { day: 'partly-cloudy-day-fog', night: 'partly-cloudy-night-fog' },
    1010: { day: 'partly-cloudy-day-hail', night: 'partly-cloudy-night-hail' },
    1013: { day: 'partly-cloudy-day-haze', night: 'partly-cloudy-night-haze' },
    1022: { day: 'partly-cloudy-day-smoke', night: 'partly-cloudy-night-smoke' },
    1038: { day: 'partly-cloudy-day', night: 'partly-cloudy-night' },
    1075: { day: 'partly-cloudy-night-drizzle', night: 'partly-cloudy-night-drizzle' },
    1078: { day: 'partly-cloudy-night-fog', night: 'partly-cloudy-night-fog' },
    1081: { day: 'partly-cloudy-night-hail', night: 'partly-cloudy-night-hail' },
    1084: { day: 'partly-cloudy-night-haze', night: 'partly-cloudy-night-haze' },
    1087: { day: 'partly-cloudy-night-rain', night: 'partly-cloudy-night-rain' },
    1090: { day: 'partly-cloudy-night-sleet', night: 'partly-cloudy-night-sleet' },
    1093: { day: 'partly-cloudy-night-smoke', night: 'partly-cloudy-night-smoke' },
    1096: { day: 'partly-cloudy-night-snow', night: 'partly-cloudy-night-snow' },
    1135: { day: 'partly-cloudy-night', night: 'partly-cloudy-night' }, // This is used as a placeholder; use the actual icon for this code if available
    // ... (other mappings)
  };

  const iconName = (isDay ? weatherIcons[code]?.day : weatherIcons[code]?.night) ?? 'not-available';

  return <Image src={getIconPath(iconName)} alt={`Weather icon for code ${code}`} width="100" height="100"  />;
};

export default WeatherIcon;
