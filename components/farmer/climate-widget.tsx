'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Sun,
  Eye,
  Gauge,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { getCityCoordinates } from '@/lib/city-coordinates';

interface WeatherResponse {
  success: boolean;
  data?: {
    district: string;
    weather: {
      temperature: number;
      condition: string;
      humidity: number;
      windSpeed: number;
      pressure: number;
      visibility: number;
      uvIndex: number;
      feelsLike: number;
      rainfall: number;
    };
    forecast: Array<{
      day: string;
      high: number;
      low: number;
      condition: string;
      icon: string;
      rainfall: number;
    }>;
  };
  error?: string;
}

/**
 * Get weather icon based on condition
 */
function getWeatherIcon(condition: string) {
  const iconClass = 'w-12 h-12 mr-3';
  
  if (condition.includes('Clear') || condition.includes('Mostly Clear')) {
    return <Sun className={`${iconClass} text-yellow-500`} />;
  } else if (condition.includes('Cloudy') || condition.includes('Overcast')) {
    return <Cloud className={`${iconClass} text-gray-500`} />;
  } else if (condition.includes('Rain') || condition.includes('Drizzle') || condition.includes('Showers')) {
    return <CloudRain className={`${iconClass} text-blue-500`} />;
  } else if (condition.includes('Thunderstorm')) {
    return <AlertTriangle className={`${iconClass} text-purple-500`} />;
  } else if (condition.includes('Snow') || condition.includes('Freezing')) {
    return <Cloud className={`${iconClass} text-cyan-400`} />;
  } else if (condition.includes('Foggy') || condition.includes('Fog')) {
    return <Cloud className={`${iconClass} text-gray-400`} />;
  }
  
  return <Sun className={`${iconClass} text-yellow-500`} />;
}

interface ClimateWidgetProps {
  country?: string;
  city?: string;
}

export default function ClimateWidget({ country = 'Rwanda', city = 'Kigali' }: ClimateWidgetProps) {
  // Get coordinates from city mapping
  const cityCoords = getCityCoordinates(country, city);
  const LATITUDE = cityCoords?.latitude || -1.9495; // Default to Kigali
  const LONGITUDE = cityCoords?.longitude || 29.8739;

  const [weatherData, setWeatherData] = useState<WeatherResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/weather?latitude=${LATITUDE}&longitude=${LONGITUDE}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data: WeatherResponse = await response.json();
        
        if (data.success && data.data) {
          setWeatherData(data.data);
        } else {
          setError(data.error || 'Failed to load weather data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [LATITUDE, LONGITUDE]);

  // Default values while loading
  const currentWeather = weatherData?.weather || {
    temperature: 0,
    condition: 'Loading...',
    humidity: 0,
    windSpeed: 0,
    pressure: 0,
    visibility: 0,
    uvIndex: 0,
    feelsLike: 0,
    rainfall: 0,
  };

  const forecast = weatherData?.forecast || [
    { day: 'Today', high: 0, low: 0, condition: 'Loading', icon: '⏳', rainfall: 0 },
    { day: 'Tomorrow', high: 0, low: 0, condition: 'Loading', icon: '⏳', rainfall: 0 },
    { day: 'Wednesday', high: 0, low: 0, condition: 'Loading', icon: '⏳', rainfall: 0 },
    { day: 'Thursday', high: 0, low: 0, condition: 'Loading', icon: '⏳', rainfall: 0 },
  ];

  // Use district from API response, fallback to city + country
  const displayLocation = weatherData?.district || `${city}, ${country}`;

  const cropStatus = [
    { name: 'Rice', growth: 65, waterNeeded: 'High', pestRisk: 'Medium' },
    { name: 'Wheat', growth: 45, waterNeeded: 'Medium', pestRisk: 'Low' },
    { name: 'Corn', growth: 78, waterNeeded: 'Medium', pestRisk: 'High' },
  ];

  return (
    <div className="space-y-4">
      {/* Loading State */}
      {loading && (
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 p-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="text-gray-600">Loading weather data for {displayLocation}...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Error Loading Weather</h4>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Current Weather - Large Card */}
      {!loading && (
        <>
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Current Weather: {displayLocation}</h2>
            <p className="text-sm text-gray-600 mb-4">Coordinates: {LATITUDE.toFixed(4)}, {LONGITUDE.toFixed(4)}</p>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Temperature Section */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getWeatherIcon(currentWeather.condition)}
                  </div>
                  <div className="text-5xl font-bold text-gray-900">{currentWeather.temperature}°C</div>
                  <p className="text-lg font-semibold text-blue-600 mt-2">{currentWeather.condition || 'Weather Data Loading'}</p>
                  <p className="text-sm text-gray-500 mt-1">Feels like {currentWeather.feelsLike}°C</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <span className="font-bold text-gray-900">{currentWeather.humidity}%</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Wind</span>
                  </div>
                  <span className="font-bold text-gray-900">{currentWeather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  <span className="font-bold text-gray-900">{currentWeather.visibility} km</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Pressure</span>
                  </div>
                  <span className="font-bold text-gray-900">{currentWeather.pressure} mb</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Forecast */}
          <Card className="p-6 border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">7-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {forecast.map((day, idx) => (
                <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{day.day}</p>
                  <p className="text-2xl mb-2">{day.icon}</p>
                  <p className="text-xs text-gray-600 mb-3">{day.condition}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900">
                      {day.high}° / {day.low}°
                    </p>
                    <div className="flex items-center justify-center gap-1 text-blue-600">
                      <CloudRain className="w-3 h-3" />
                      <span className="text-xs">{day.rainfall}mm</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Crop Status & Recommendations */}
      <Card className="p-6 border-green-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Crops Status</h3>
        <div className="space-y-4">
          {cropStatus.map((crop, idx) => (
            <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  crop.growth > 70 ? 'bg-green-100 text-green-700' :
                  crop.growth > 40 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {crop.growth}% Growth
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${
                    crop.growth > 70 ? 'bg-green-500' :
                    crop.growth > 40 ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${crop.growth}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-gray-600">Water Needed</p>
                  <p className="font-semibold text-gray-900">{crop.waterNeeded}</p>
                </div>
                <div className={`p-2 rounded ${
                  crop.pestRisk === 'High' ? 'bg-red-50' :
                  crop.pestRisk === 'Medium' ? 'bg-yellow-50' :
                  'bg-green-50'
                }`}>
                  <p className="text-gray-600">Pest Risk</p>
                  <p className={`font-semibold ${
                    crop.pestRisk === 'High' ? 'text-red-700' :
                    crop.pestRisk === 'Medium' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>{crop.pestRisk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weather Alerts */}
      <Card className="border-orange-200 bg-orange-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-orange-900 mb-1">Weather Alert</h4>
            <p className="text-sm text-orange-800">
              Heavy rainfall expected Thursday. Ensure proper drainage and delay pesticide application.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
