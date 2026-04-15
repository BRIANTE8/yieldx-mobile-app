/**
 * Geocoding Service - Reverse geocodes coordinates to get location names
 * Uses Google Maps Geocoding API
 */

export interface GeocodingResult {
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  address?: string;
}

/**
 * Reverse geocode coordinates to get district/location name
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns GeocodingResult with location information
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeocodingResult> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.warn('Google Maps API key not configured');
      return { address: 'Unknown Location' };
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.warn('Geocoding returned no results');
      return { address: 'Unknown Location' };
    }

    // Extract address components from the first result
    const result = data.results[0];
    const addressComponents = result.address_components || [];

    const geocoding: GeocodingResult = {
      address: result.formatted_address || 'Unknown Location',
    };

    // Extract district, city, province, and country from address components
    for (const component of addressComponents) {
      const types = component.types || [];

      if (types.includes('administrative_area_level_2')) {
        geocoding.district = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        geocoding.province = component.long_name;
      } else if (types.includes('locality') || types.includes('postal_town')) {
        geocoding.city = component.long_name;
      } else if (types.includes('country')) {
        geocoding.country = component.long_name;
      }
    }

    // If no district found, try to extract from address
    if (!geocoding.district && geocoding.address) {
      // For Rwanda, the district might be in the address
      // Common Rwanda districts: Musanze, Rubavu, Ruhango, etc.
      const districtMatch = geocoding.address.match(/(\w+) District|District (\w+)/);
      if (districtMatch) {
        geocoding.district = districtMatch[1] || districtMatch[2];
      }
    }

    return geocoding;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return { address: 'Unknown Location' };
  }
}

/**
 * Get just the district name from coordinates
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns District name
 */
export async function getDistrictName(
  latitude: number,
  longitude: number
): Promise<string> {
  const result = await reverseGeocode(latitude, longitude);
  return result.district || result.city || result.address || 'Unknown District';
}
