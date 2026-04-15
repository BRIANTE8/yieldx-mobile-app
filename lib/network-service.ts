/**
 * Network Service - Detects network type and connectivity (Web Version)
 * Uses browser APIs - works on Next.js web apps
 * No external dependencies needed!
 */

export enum NetworkType {
  WIFI = 'WIFI',
  CELLULAR = 'CELLULAR',
  NONE = 'NONE',
  UNKNOWN = 'UNKNOWN',
}

export interface NetworkState {
  isConnected: boolean;
  type: NetworkType;
  isInternetReachable: boolean;
}

/**
 * Check current network state
 * @returns NetworkState object with connection info
 */
/**
 * Get current network type using browser APIs
 */
function getBrowserNetworkType(): NetworkType {
  if (typeof navigator === 'undefined') {
    return NetworkType.UNKNOWN;
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

  if (connection) {
    const effectiveType = connection.effectiveType;

    if (effectiveType) {
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        return NetworkType.CELLULAR;
      }
      return NetworkType.WIFI;
    }

    const type = connection.type;
    if (type === 'wifi' || type === 'ethernet' || type === 'broadband') {
      return NetworkType.WIFI;
    }
    if (type === 'cellular' || type === '2g' || type === '3g' || type === '4g') {
      return NetworkType.CELLULAR;
    }
  }

  return navigator.onLine ? NetworkType.UNKNOWN : NetworkType.NONE;
}

export async function checkNetworkState(): Promise<NetworkState> {
  try {
    const isConnected = typeof navigator !== 'undefined' && navigator.onLine;
    const type = getBrowserNetworkType();

    return {
      isConnected,
      type,
      isInternetReachable: isConnected,
    };
  } catch (error) {
    console.error('Network check error:', error);
    return {
      isConnected: false,
      type: NetworkType.UNKNOWN,
      isInternetReachable: false,
    };
  }
}

/**
 * Check if device is on Wi-Fi
 */
export async function isWiFi(): Promise<boolean> {
  const state = await checkNetworkState();
  return state.type === NetworkType.WIFI && state.isConnected;
}

/**
 * Check if device is on cellular data
 */
export async function isCellular(): Promise<boolean> {
  const state = await checkNetworkState();
  return state.type === NetworkType.CELLULAR && state.isConnected;
}

/**
 * Check if device is offline
 */
export async function isOffline(): Promise<boolean> {
  const state = await checkNetworkState();
  return !state.isConnected;
}

/**
 * Get network quality recommendation
 */
export async function getNetworkQuality(): Promise<{
  quality: 'high' | 'low' | 'none';
  downloadHighRes: boolean;
  dataSavingMode: boolean;
}> {
  const state = await checkNetworkState();

  if (state.type === NetworkType.NONE || !state.isConnected) {
    return {
      quality: 'none',
      downloadHighRes: false,
      dataSavingMode: false,
    };
  }

  if (state.type === NetworkType.WIFI) {
    return {
      quality: 'high',
      downloadHighRes: true,
      dataSavingMode: false,
    };
  }

  // Cellular data
  return {
    quality: 'low',
    downloadHighRes: false,
    dataSavingMode: true,
  };
}
