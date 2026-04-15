/**
 * Location Service - Handles GPS coordinates and permissions for farmers
 */

interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

interface FarmerLocation extends LocationCoordinates {
  id: string;
  name: string;
  farmerType?: string;
  contactNumber?: string;
}

/**
 * Request foreground location permission from the browser
 * Works with Geolocation API available in modern browsers
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    // Check if geolocation is supported in the browser
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return false;
    }

    // Request permission - returns a promise
    const permission = await navigator.permissions?.query({
      name: 'geolocation',
    });

    if (permission?.state === 'denied') {
      console.warn('Location permission denied by user');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

/**
 * Get current GPS coordinates of the device
 * Returns latitude, longitude, and accuracy
 */
export function getCurrentLocation(): Promise<LocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    const options = {
      enableHighAccuracy: true, // Use GPS for better accuracy
      timeout: 10000,
      maximumAge: 0, // Always get fresh location
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now(),
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        reject(error);
      },
      options
    );
  });
}

/**
 * Watch for continuous location changes (for real-time tracking)
 * Returns a watch ID that can be used to stop watching
 */
export function watchLocation(
  callback: (location: LocationCoordinates) => void,
  onError?: (error: GeolocationPositionError) => void
): number | null {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported');
    return null;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      callback({
        latitude,
        longitude,
        accuracy,
        timestamp: Date.now(),
      });
    },
    (error) => {
      console.error('Watch location error:', error);
      onError?.(error);
    },
    options
  );

  return watchId;
}

/**
 * Stop watching location changes
 */
export function stopWatchingLocation(watchId: number): void {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
}

/**
 * Placeholder function to save farmer location to database
 * You'll need to implement actual API call here
 */
export async function saveLocationToDB(
  farmerId: string,
  farmerName: string,
  location: LocationCoordinates
): Promise<boolean> {
  try {
    // TODO: Replace with actual API call
    const response = await fetch('/api/farmers/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        farmerId,
        farmerName,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        timestamp: location.timestamp,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save location');
    }

    console.log('Location saved to database successfully');
    return true;
  } catch (error) {
    console.error('Error saving location to database:', error);
    return false;
  }
}

/**
 * Fetch all farmer locations from database
 * Returns an array of farmer objects with their locations
 */
export async function fetchFarmerLocations(): Promise<FarmerLocation[]> {
  try {
    // TODO: Replace with actual API call
    const response = await fetch('/api/farmers/locations');

    if (!response.ok) {
      throw new Error('Failed to fetch farmer locations');
    }

    const data: FarmerLocation[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching farmer locations:', error);
    return [];
  }
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * Uses Haversine formula
 */
export function calculateDistance(
  coord1: LocationCoordinates,
  coord2: LocationCoordinates
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.latitude * (Math.PI / 180)) *
      Math.cos(coord2.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Rwanda center coordinates
 */
export const RWANDA_CENTER = {
  latitude: -1.9403,
  longitude: 29.8739,
};

export const DEFAULT_MAP_ZOOM = 12;
export const ZOOM_TO_SHOW_ALL = 8;
