/**
 * Network Configuration - Customizable settings for network detection
 */

export const NETWORK_CONFIG = {
  // Update intervals (in milliseconds)
  UPDATE_CHECK_INTERVAL: 10 * 1000, // Check network every 10 seconds

  // Weather update intervals
  WEATHER_UPDATE_WIFI: 15 * 60 * 1000, // Every 15 minutes on Wi-Fi
  WEATHER_UPDATE_CELLULAR: 60 * 60 * 1000, // Every 60 minutes on cellular
  WEATHER_UPDATE_OFFLINE: 0, // No updates offline

  // Map image sizes
  MAP_HIGH_RES_SIZE: '800x600', // High resolution
  MAP_LOW_RES_SIZE: '400x300', // Low resolution
  MAP_ZOOM_LEVEL: 12, // Default zoom

  // Image compression quality (0-1)
  QUALITY_WIFI: 0.95, // 95% quality on Wi-Fi
  QUALITY_CELLULAR: 0.6, // 60% quality on cellular

  // Data limits
  MAX_FORECAST_DAYS_WIFI: 7, // 7-day forecast on Wi-Fi
  MAX_FORECAST_DAYS_CELLULAR: 0, // No forecast on cellular
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second between retries

  // Message text
  MESSAGES: {
    NO_CONNECTION: 'Please check your internet connection',
    CHECKING_CONNECTION: 'Checking connection...',
    DATA_SAVING_MODE: 'Data Saving Mode Active - Limited features',
    WIFI_CONNECTED: 'Wi-Fi Connected - Full quality available',
    CELLULAR_CONNECTED: 'Cellular Data - Data saving mode active',
    OFFLINE_MODE: 'Offline Mode',
    LOADING_DATA: 'Loading data...',
    HIGH_RES_MAP: '✅ High-resolution map loaded',
    LOW_RES_MAP: '📶 Low-resolution map (saving data)',
    DATA_MINIMAL: '📊 Minimal data mode',
  },

  // Feature flags
  FEATURES: {
    SHOW_NETWORK_BANNER: true, // Show network status banner
    SHOW_DATA_SAVING_INDICATOR: true, // Show when in data saving mode
    SHOW_QUALITY_INDICATOR: true, // Show map quality indicator
    AUTO_RETRY_ON_FAIL: true, // Auto-retry failed requests
    CACHE_OFFLINE_DATA: true, // Cache data for offline viewing
  },
};

// Get appropriate update interval based on network
export function getWeatherUpdateInterval(networkType: 'WIFI' | 'CELLULAR' | 'NONE'): number {
  switch (networkType) {
    case 'WIFI':
      return NETWORK_CONFIG.WEATHER_UPDATE_WIFI;
    case 'CELLULAR':
      return NETWORK_CONFIG.WEATHER_UPDATE_CELLULAR;
    case 'NONE':
      return NETWORK_CONFIG.WEATHER_UPDATE_OFFLINE;
    default:
      return NETWORK_CONFIG.WEATHER_UPDATE_WIFI;
  }
}

// Get appropriate image quality based on network
export function getImageQuality(networkType: 'WIFI' | 'CELLULAR' | 'NONE'): number {
  switch (networkType) {
    case 'WIFI':
      return NETWORK_CONFIG.QUALITY_WIFI;
    case 'CELLULAR':
      return NETWORK_CONFIG.QUALITY_CELLULAR;
    case 'NONE':
      return NETWORK_CONFIG.QUALITY_CELLULAR; // Use lowest on offline
    default:
      return NETWORK_CONFIG.QUALITY_WIFI;
  }
}

// Get forecast days to fetch based on network
export function getForecastDays(networkType: 'WIFI' | 'CELLULAR' | 'NONE'): number {
  switch (networkType) {
    case 'WIFI':
      return NETWORK_CONFIG.MAX_FORECAST_DAYS_WIFI;
    case 'CELLULAR':
      return NETWORK_CONFIG.MAX_FORECAST_DAYS_CELLULAR;
    case 'NONE':
      return 0;
    default:
      return NETWORK_CONFIG.MAX_FORECAST_DAYS_WIFI;
  }
}

// Export helper function to get message
export function getNetworkMessage(key: keyof typeof NETWORK_CONFIG.MESSAGES): string {
  return NETWORK_CONFIG.MESSAGES[key];
}
