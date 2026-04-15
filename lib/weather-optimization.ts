/**
 * Weather Data Optimization Service
 * Fetches minimal data on cellular to save airtime
 */

import { getNetworkQuality } from '@/lib/network-service';

export interface WeatherFetchOptions {
  includeForecast?: boolean;
  includeDetails?: boolean;
  dataSavingMode?: boolean;
}

/**
 * Get weather with smart data fetching based on network
 * @param latitude - Latitude
 * @param longitude - Longitude
 * @param options - Fetch options
 * @returns Optimized weather data
 */
export async function getSmartWeatherData(
  latitude: number,
  longitude: number,
  options: WeatherFetchOptions = {}
) {
  const quality = await getNetworkQuality();
  
  // Build query parameters based on network
  const params = new URLSearchParams();
  params.append('latitude', latitude.toString());
  params.append('longitude', longitude.toString());

  // On cellular, only fetch current weather (no forecast)
  if (quality.dataSavingMode || options.dataSavingMode) {
    params.append('dataSaving', 'true');
  } else {
    params.append('dataSaving', 'false');
  }

  try {
    const response = await fetch(`/api/weather?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }

    const data = await response.json();
    
    // Return only essential data on cellular
    if (quality.dataSavingMode) {
      return {
        success: data.success,
        data: data.data ? {
          district: data.data.district,
          weather: {
            temperature: data.data.weather.temperature,
            condition: data.data.weather.condition,
            humidity: data.data.weather.humidity,
            windSpeed: data.data.weather.windSpeed,
          },
          // Skip forecast on cellular
          forecast: [],
        } : null,
        dataSize: 'minimal',
      };
    }

    return {
      ...data,
      dataSize: 'full',
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return {
      success: false,
      error: 'Failed to fetch weather data',
    };
  }
}

/**
 * Get weather update frequency based on network
 * @returns Update interval in milliseconds
 */
export async function getWeatherUpdateInterval(): Promise<number> {
  const quality = await getNetworkQuality();
  
  // Wi-Fi: Update every 15 minutes
  // Cellular: Update every 60 minutes (save data)
  // Offline: No updates
  
  if (quality.quality === 'none') {
    return 0; // No updates when offline
  }
  
  return quality.dataSavingMode ? 60 * 60 * 1000 : 15 * 60 * 1000;
}
