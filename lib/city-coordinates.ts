/**
 * City Coordinates Mapping - Maps city names to their coordinates
 * Used for weather fetching and map rendering
 */

export interface CityCoordinates {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const CITY_COORDINATES: Record<string, Record<string, CityCoordinates>> = {
  Rwanda: {
    Kigali: { name: 'Kigali', country: 'Rwanda', latitude: -1.9495, longitude: 29.8739 },
    Muhanga: { name: 'Muhanga', country: 'Rwanda', latitude: -2.0045, longitude: 30.0262 },
    Gitarama: { name: 'Gitarama', country: 'Rwanda', latitude: -2.0064, longitude: 29.7442 },
    Rwamagana: { name: 'Rwamagana', country: 'Rwanda', latitude: -2.4474, longitude: 30.4087 },
    Huye: { name: 'Huye', country: 'Rwanda', latitude: -2.6028, longitude: 29.7411 },
    Nyabihu: { name: 'Nyabihu', country: 'Rwanda', latitude: -1.5708, longitude: 29.3333 },
    Nyagatare: { name: 'Nyagatare', country: 'Rwanda', latitude: -1.3949, longitude: 30.2753 },
    Kayonza: { name: 'Kayonza', country: 'Rwanda', latitude: -2.2405, longitude: 30.3862 },
    Ruhango: { name: 'Ruhango', country: 'Rwanda', latitude: -2.5905, longitude: 29.9333 },
    Kicukiro: { name: 'Kicukiro', country: 'Rwanda', latitude: -1.8833, longitude: 30.0833 },
    Gasabo: { name: 'Gasabo', country: 'Rwanda', latitude: -1.9667, longitude: 30.1333 },
    Bugesera: { name: 'Bugesera', country: 'Rwanda', latitude: -2.3667, longitude: 30.2333 },
  },
  Kenya: {
    Nairobi: { name: 'Nairobi', country: 'Kenya', latitude: -1.2866, longitude: 36.816 },
    Mombasa: { name: 'Mombasa', country: 'Kenya', latitude: -4.0435, longitude: 39.6682 },
    Kisumu: { name: 'Kisumu', country: 'Kenya', latitude: -0.1022, longitude: 34.7617 },
    Nakuru: { name: 'Nakuru', country: 'Kenya', latitude: -0.303, longitude: 36.066 },
    Eldoret: { name: 'Eldoret', country: 'Kenya', latitude: 0.5143, longitude: 35.2799 },
    Kericho: { name: 'Kericho', country: 'Kenya', latitude: -0.369, longitude: 35.297 },
    Nyeri: { name: 'Nyeri', country: 'Kenya', latitude: -0.425, longitude: 36.949 },
    Muranga: { name: 'Muranga', country: 'Kenya', latitude: -0.7234, longitude: 37.6634 },
    Thika: { name: 'Thika', country: 'Kenya', latitude: -1.0347, longitude: 37.0833 },
    Machakos: { name: 'Machakos', country: 'Kenya', latitude: -2.7199, longitude: 37.254 },
    Kilifi: { name: 'Kilifi', country: 'Kenya', latitude: -3.6333, longitude: 39.85 },
    Garissa: { name: 'Garissa', country: 'Kenya', latitude: -0.4667, longitude: 39.65 },
  },
  India: {
    Mumbai: { name: 'Mumbai', country: 'India', latitude: 19.076, longitude: 72.8479 },
    Delhi: { name: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025 },
    Bangalore: { name: 'Bangalore', country: 'India', latitude: 12.9716, longitude: 77.5946 },
    Hyderabad: { name: 'Hyderabad', country: 'India', latitude: 17.3688, longitude: 78.4711 },
    Chennai: { name: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707 },
    Kolkata: { name: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639 },
    Pune: { name: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567 },
    Ahmedabad: { name: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714 },
    Jaipur: { name: 'Jaipur', country: 'India', latitude: 26.9124, longitude: 75.7873 },
    Lucknow: { name: 'Lucknow', country: 'India', latitude: 26.8467, longitude: 80.9462 },
    Chandigarh: { name: 'Chandigarh', country: 'India', latitude: 30.7333, longitude: 76.7794 },
    Indore: { name: 'Indore', country: 'India', latitude: 22.7196, longitude: 75.8577 },
  },
  Uganda: {
    Kampala: { name: 'Kampala', country: 'Uganda', latitude: 0.3476, longitude: 32.5825 },
    Gulu: { name: 'Gulu', country: 'Uganda', latitude: 2.7769, longitude: 32.3089 },
    Lira: { name: 'Lira', country: 'Uganda', latitude: 2.2523, longitude: 32.9012 },
    Mbarara: { name: 'Mbarara', country: 'Uganda', latitude: -0.6117, longitude: 29.6303 },
    'Fort Portal': { name: 'Fort Portal', country: 'Uganda', latitude: 0.7099, longitude: 30.269 },
    Jinja: { name: 'Jinja', country: 'Uganda', latitude: 0.4422, longitude: 33.1337 },
    Masaka: { name: 'Masaka', country: 'Uganda', latitude: -0.34, longitude: 31.74 },
    Mbale: { name: 'Mbale', country: 'Uganda', latitude: 1.0801, longitude: 34.1848 },
    Soroti: { name: 'Soroti', country: 'Uganda', latitude: 1.7128, longitude: 33.5903 },
    Tororo: { name: 'Tororo', country: 'Uganda', latitude: 0.6884, longitude: 34.1819 },
    Arua: { name: 'Arua', country: 'Uganda', latitude: 3.5833, longitude: 30.95 },
    Kasese: { name: 'Kasese', country: 'Uganda', latitude: 0.2, longitude: 30.0667 },
  },
  Ghana: {
    Accra: { name: 'Accra', country: 'Ghana', latitude: 5.6037, longitude: -0.187 },
    Kumasi: { name: 'Kumasi', country: 'Ghana', latitude: 6.6753, longitude: -1.6263 },
    'Sekondi-Takoradi': { name: 'Sekondi-Takoradi', country: 'Ghana', latitude: 4.9028, longitude: -1.7533 },
    Tamale: { name: 'Tamale', country: 'Ghana', latitude: 9.2806, longitude: -0.8418 },
    'Cape Coast': { name: 'Cape Coast', country: 'Ghana', latitude: 5.1048, longitude: -1.2462 },
    Tema: { name: 'Tema', country: 'Ghana', latitude: 5.6333, longitude: -0.0167 },
    Koforidua: { name: 'Koforidua', country: 'Ghana', latitude: 6.0828, longitude: -0.3733 },
    Obuasi: { name: 'Obuasi', country: 'Ghana', latitude: 5.8167, longitude: -1.6333 },
    'Ashanti Region': { name: 'Ashanti Region', country: 'Ghana', latitude: 6.5, longitude: -1.5 },
    'Greater Accra': { name: 'Greater Accra', country: 'Ghana', latitude: 5.65, longitude: -0.2 },
  },
  Nigeria: {
    Lagos: { name: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 },
    Kano: { name: 'Kano', country: 'Nigeria', latitude: 12.0022, longitude: 8.6753 },
    Abuja: { name: 'Abuja', country: 'Nigeria', latitude: 9.0765, longitude: 7.3986 },
    Ibadan: { name: 'Ibadan', country: 'Nigeria', latitude: 7.3775, longitude: 3.9470 },
    Kaduna: { name: 'Kaduna', country: 'Nigeria', latitude: 10.5054, longitude: 7.4314 },
    'Port Harcourt': { name: 'Port Harcourt', country: 'Nigeria', latitude: 4.7466, longitude: 7.0833 },
    'Benin City': { name: 'Benin City', country: 'Nigeria', latitude: 6.4969, longitude: 5.6267 },
    Enugu: { name: 'Enugu', country: 'Nigeria', latitude: 6.4547, longitude: 7.5132 },
    Katsina: { name: 'Katsina', country: 'Nigeria', latitude: 12.9833, longitude: 7.6167 },
    Jos: { name: 'Jos', country: 'Nigeria', latitude: 9.9265, longitude: 8.8953 },
  },
  Tanzania: {
    'Dar es Salaam': { name: 'Dar es Salaam', country: 'Tanzania', latitude: -6.8, longitude: 39.2667 },
    Dodoma: { name: 'Dodoma', country: 'Tanzania', latitude: -6.1667, longitude: 35.7333 },
    Arusha: { name: 'Arusha', country: 'Tanzania', latitude: -3.3667, longitude: 36.6833 },
    Moshi: { name: 'Moshi', country: 'Tanzania', latitude: -3.3667, longitude: 37.6667 },
    Mbeya: { name: 'Mbeya', country: 'Tanzania', latitude: -8.7514, longitude: 33.4653 },
    Iringa: { name: 'Iringa', country: 'Tanzania', latitude: -8.7747, longitude: 35.7871 },
    Morogoro: { name: 'Morogoro', country: 'Tanzania', latitude: -6.8167, longitude: 37.6667 },
    Tabora: { name: 'Tabora', country: 'Tanzania', latitude: -5.0333, longitude: 32.7667 },
    Mwanza: { name: 'Mwanza', country: 'Tanzania', latitude: -2.5167, longitude: 32.9167 },
    Tanga: { name: 'Tanga', country: 'Tanzania', latitude: -5.0667, longitude: 39.2 },
  },
  Malawi: {
    Lilongwe: { name: 'Lilongwe', country: 'Malawi', latitude: -13.9833, longitude: 34.3167 },
    Blantyre: { name: 'Blantyre', country: 'Malawi', latitude: -15.4708, longitude: 35.0092 },
    Mzuzu: { name: 'Mzuzu', country: 'Malawi', latitude: -11.4658, longitude: 34.3597 },
    Zomba: { name: 'Zomba', country: 'Malawi', latitude: -15.3833, longitude: 35.3333 },
    Kasungu: { name: 'Kasungu', country: 'Malawi', latitude: -13.055, longitude: 33.48 },
    Mangochi: { name: 'Mangochi', country: 'Malawi', latitude: -14.4725, longitude: 35.2558 },
    Salima: { name: 'Salima', country: 'Malawi', latitude: -13.7622, longitude: 34.3097 },
    Ncheu: { name: 'Ncheu', country: 'Malawi', latitude: -15.6, longitude: 34.3 },
    Ntchisi: { name: 'Ntchisi', country: 'Malawi', latitude: -13.6, longitude: 34.3 },
    Dedza: { name: 'Dedza', country: 'Malawi', latitude: -14.37, longitude: 34.32 },
  },
};

/**
 * Get coordinates for a city
 * @param country - Country name
 * @param city - City name
 * @returns CityCoordinates object or null if not found
 */
export function getCityCoordinates(
  country: string,
  city: string
): CityCoordinates | null {
  return CITY_COORDINATES[country]?.[city] || null;
}
