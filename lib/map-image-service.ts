/**
 * Map Image Service - Handles high-res and low-res map images based on network
 * Optimizes image loading for Wi-Fi vs Cellular
 */

import { getNetworkQuality } from '@/lib/network-service';

export interface MapImageOptions {
  highRes?: boolean;
  zoom?: number;
  quality?: 'high' | 'low';
}

/**
 * Get optimized map image URL based on network connection
 * @param latitude - Map center latitude
 * @param longitude - Map center longitude
 * @param options - Map options
 * @returns Optimized map image URL
 */
export async function getOptimizedMapURL(
  latitude: number,
  longitude: number,
  options: MapImageOptions = {}
): Promise<string> {
  const quality = await getNetworkQuality();

  // Determine resolution based on network
  const useHighRes = options.highRes !== undefined 
    ? options.highRes && quality.downloadHighRes
    : quality.downloadHighRes;

  const zoom = options.zoom || 12;
  const size = useHighRes ? '800x600' : '400x300'; // High-res vs Low-res

  // Using Google Static Maps API
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.warn('Google Maps API key not configured');
    return '';
  }

  return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&scale=${useHighRes ? 2 : 1}&key=${apiKey}`;
}

/**
 * Determine if should show high-quality content
 */
export async function shouldLoadHighRes(): Promise<boolean> {
  const quality = await getNetworkQuality();
  return quality.downloadHighRes;
}

/**
 * Get image compression quality for current network
 * @returns Compression quality (0-1)
 */
export async function getImageCompressionQuality(): Promise<number> {
  const quality = await getNetworkQuality();
  return quality.dataSavingMode ? 0.6 : 0.95; // 60% quality on cellular, 95% on Wi-Fi
}
