/**
 * Weather Service - Fetches weather data based on coordinates
 * Uses Open-Meteo API (free, no API key required)
 */

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  rainfall: number;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rainfall: number;
}

/**
 * Fetch current weather data from Open-Meteo API
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns WeatherData object with current weather information
 */
export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,weather&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    const current = data.current;

    // Map WMO weather codes to condition strings
    const weatherCondition = getWeatherCondition(current.weather_code || 0);

    return {
      temperature: Math.round(current.temperature_2m),
      condition: weatherCondition,
      humidity: current.relative_humidity_2m || 0,
      windSpeed: Math.round(current.wind_speed_10m || 0),
      pressure: Math.round(current.pressure_msl || 1013),
      visibility: 10, // Default visibility - Open-Meteo doesn't provide this
      uvIndex: 0, // Will be fetched separately if needed
      feelsLike: Math.round(current.apparent_temperature || current.temperature_2m),
      rainfall: 0, // Will be calculated from hourly data if needed
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return default weather data on error
    return {
      temperature: 25,
      condition: 'Unknown',
      humidity: 0,
      windSpeed: 0,
      pressure: 1013,
      visibility: 10,
      uvIndex: 0,
      feelsLike: 25,
      rainfall: 0,
    };
  }
}

/**
 * Get 7-day weather forecast
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns Array of ForecastDay objects
 */
export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<ForecastDay[]> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    const daily = data.daily;

    const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weatherIcons = ['☀️', '⛅', '🌧️', '⛈️', '🌧️'];

    return daily.time.slice(0, 7).map((date: string, index: number) => {
      const weatherCode = daily.weather_code[index];
      const condition = getWeatherCondition(weatherCode);
      const iconIndex = Math.min(Math.floor(weatherCode / 10), 4);

      return {
        day: days[index] || new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(daily.temperature_2m_max[index]),
        low: Math.round(daily.temperature_2m_min[index]),
        condition,
        icon: weatherIcons[iconIndex],
        rainfall: Math.round(daily.precipitation_sum[index] || 0),
      };
    });
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return [];
  }
}

/**
 * Convert WMO weather code to human-readable condition
 * @param code - WMO weather code
 * @returns Weather condition string
 */
function getWeatherCondition(code: number): string {
  // Clear sky
  if (code === 0) return 'Clear Skies';
  if (code === 1) return 'Mostly Clear';
  
  // Cloudy
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  
  // Fog and mist
  if (code === 45) return 'Foggy';
  if (code === 48) return 'Foggy';
  
  // Drizzle
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 56 && code <= 57) return 'Freezing Drizzle';
  if (code >= 61 && code <= 65) return 'Light Rain';
  if (code >= 66 && code <= 67) return 'Freezing Rain';
  
  // Rain
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code === 85 || code === 86) return 'Heavy Rain Showers';
  
  // Snow
  if (code >= 71 && code <= 77) return 'Snow';
  if (code === 78) return 'Mixed Rain & Snow';
  
  // Thunderstorm
  if (code === 80) return 'Slight Rain Showers';
  if (code === 81) return 'Moderate Rain Showers';
  if (code === 82) return 'Violent Rain Showers';
  if (code >= 85 && code <= 86) return 'Heavy Rain Showers';
  if (code >= 90 && code <= 82) return 'Thunderstorm';
  if (code >= 80 && code <= 82) return 'Thunderstorm with Slight Rain';
  if (code >= 90 && code <= 99) return 'Thunderstorm';
  
  // Fallback based on code range
  if (code < 10) return 'Clear to Partly Cloudy';
  if (code < 50) return 'Cloudy';
  if (code < 80) return 'Rainy';
  if (code < 90) return 'Heavy Rain';
  
  return 'Cloudy';
}
