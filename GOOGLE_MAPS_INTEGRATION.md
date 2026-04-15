# Google Maps Integration Guide for Farmers in Rwanda

## Overview

This guide helps you integrate Google Maps functionality into your Next.js agricultural app, allowing farmers to:
- Share their GPS location automatically after login
- View other farmers' locations on a map
- Track distances between farms
- Manage location permissions

## Prerequisites

Before starting, you need:
1. A Google Maps API Key with the following APIs enabled:
   - Maps JavaScript API
   - Geolocation API
2. The `@react-google-maps/api` package installed

## Installation

### 1. Install Required Dependencies

```bash
npm install @react-google-maps/api
# or
pnpm add @react-google-maps/api
```

### 2. Set Up Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API"
4. Create an API key (Credentials → Create Credentials → API Key)
5. Restrict your API key to prevent unauthorized use:
   - Application restrictions: HTTP referrers
   - Add your domain (e.g., `localhost:3000` for development)
   - API restrictions: Select only "Maps JavaScript API"

### 3. Add API Key to Environment Variables

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

**Important**: The `NEXT_PUBLIC_` prefix makes this key accessible in the browser (which is required for Google Maps), but it's still protected by HTTP referrer restrictions on Google Cloud.

## File Structure

The implementation consists of two main files:

### 1. Location Service (`lib/location-service.ts`)
- Handles GPS coordinate retrieval
- Manages location permissions
- Provides database integration functions
- Calculates distances between locations

### 2. Map View Component (`components/map/farmer-map-view.tsx`)
- Displays the Google Map centered on Rwanda
- Shows farmer locations as markers
- Handles user interactions with markers
- Manages location updates and syncing

## API Endpoints (To Be Implemented)

Your backend should provide these endpoints:

### POST `/api/farmers/location`
Save a farmer's current location

**Request Body:**
```json
{
  "farmerId": "farmer-001",
  "farmerName": "John's Farm",
  "latitude": -1.9403,
  "longitude": 29.8739,
  "accuracy": 10,
  "timestamp": 1713052800000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Location saved successfully"
}
```

### GET `/api/farmers/locations`
Fetch all farmer locations (for displaying markers)

**Response:**
```json
[
  {
    "id": "farmer-001",
    "name": "John's Farm",
    "latitude": -1.9403,
    "longitude": 29.8739,
    "farmerType": "Vegetable Farmer",
    "contactNumber": "+250123456789",
    "lastUpdated": "2026-04-13 10:30:00"
  },
  {
    "id": "farmer-002",
    "name": "Jane's Farm",
    "latitude": -1.9450,
    "longitude": 29.8850,
    "farmerType": "Coffee Farmer",
    "contactNumber": "+250987654321",
    "lastUpdated": "2026-04-13 10:25:00"
  }
]
```

## Usage in Your App

### Integrate into Your Dashboard

In your farmer dashboard (`components/farmer/dashboard.tsx`), add a Map tab:

```tsx
import FarmerMapView from '@/components/map/farmer-map-view';

// Inside your Tabs component:
<TabsContent value="map" className="space-y-4">
  <FarmerMapView
    farmerId={your-farmer-id}
    farmerName="Your Farm Name"
    onSignOut={handleSignOut}
  />
</TabsContent>
```

### Automatic Location Capture on Login

To automatically capture location when a farmer logs in, update your sign-in component:

```tsx
import { getCurrentLocation, saveLocationToDB } from '@/lib/location-service';

const handleSignIn = async (farmerId: string, farmerName: string) => {
  // ... existing sign-in logic ...
  
  try {
    // Get current location
    const location = await getCurrentLocation();
    
    // Save to database
    await saveLocationToDB(farmerId, farmerName, location);
    
    // Proceed with login
    setUserRole('farmer');
  } catch (error) {
    console.error('Failed to capture location:', error);
    // Still allow login even if location capture fails
    setUserRole('farmer');
  }
};
```

## Key Features Explained

### 1. Location Permissions
The app uses the browser's Geolocation API to request permission:
- User is prompted on first map load
- Permission persists across sessions (until revoked)
- Works on HTTPS and localhost

### 2. GPS Coordinate Accuracy
The implementation uses:
- `enableHighAccuracy: true` - Uses all available location sources
- 10-second timeout for getting coordinates
- Returns accuracy radius (in meters) along with latitude/longitude

### 3. Marker Types
- **Green Markers**: Current farmer's location
- **Purple Markers**: Other farmers' locations
- Each marker shows a 100-meter accuracy circle

### 4. Info Windows
Click any marker to see:
- Farmer name
- GPS coordinates (up to 4 decimal places)
- Distance to current location (if not your own marker)
- Contact information (if available)
- Last update time

### 5. Sync Status
- **Syncing...**: Location is being saved to database
- **✓ Synced**: Location saved successfully
- Status auto-clears after 3 seconds

## Geolocation API Methods

### Get Current Location (One-time)
```tsx
import { getCurrentLocation } from '@/lib/location-service';

const location = await getCurrentLocation();
console.log(`Lat: ${location.latitude}, Lon: ${location.longitude}`);
```

### Watch Location (Continuous)
```tsx
import { watchLocation, stopWatchingLocation } from '@/lib/location-service';

const watchId = watchLocation((location) => {
  console.log('Location updated:', location);
});

// Stop watching when done
stopWatchingLocation(watchId);
```

### Request Permission
```tsx
import { requestLocationPermission } from '@/lib/location-service';

const hasPermission = await requestLocationPermission();
if (hasPermission) {
  // Proceed with location services
}
```

## Customization

### Change Map Center
Edit `RWANDA_CENTER` in `lib/location-service.ts`:
```tsx
export const RWANDA_CENTER = {
  latitude: -1.9403,  // Your latitude
  longitude: 29.8739, // Your longitude
};
```

### Customize Marker Icons
Modify marker styles in `components/map/farmer-map-view.tsx`:
```tsx
const FARMER_MARKER_ICON = {
  path: '...', // SVG path
  fillColor: '#4F46E5', // Change color
  scale: 2, // Change size
};
```

### Adjust Zoom Levels
```tsx
export const DEFAULT_MAP_ZOOM = 12; // Default zoom
export const ZOOM_TO_SHOW_ALL = 8;   // Zoom to show all markers
```

## Security Considerations

1. **API Key Protection**:
   - Use HTTP referrer restrictions
   - Set specific domains only
   - Regenerate if compromised

2. **Location Data**:
   - Encrypt GPS coordinates in transit (use HTTPS)
   - Only store recent location data
   - Enforce user privacy controls
   - Add option to hide location from other users

3. **Database**:
   - Validate farmer ID matches authenticated user
   - Rate-limit location update requests
   - Implement proper authentication/authorization

## Troubleshooting

### API Key Errors
- **"Invalid API key"**: Check `.env.local` and restart dev server
- **"Forbidden"**: Add domain to HTTP referrer restrictions in Google Cloud

### Location Permission Denied
- Check browser privacy settings
- Clear site data and retry
- On mobile browsers, ensure app has location permission

### Map Not Displaying
- Verify API key is valid
- Check network tab for 403/404 errors
- Ensure `NEXT_PUBLIC_` prefix is present in env var name

### Markers Not Showing
- Verify `/api/farmers/locations` endpoint returns data
- Check browser console for JavaScript errors
- Ensure farmer data has valid latitude/longitude

## Mobile Browser Support

The app works on mobile browsers (iOS Safari, Chrome) with these considerations:
- HTTPS required for location on production domains
- Localhost works without HTTPS for development
- iOS may require app to be in foreground for location updates
- Background location requires PWA setup (future enhancement)

## Performance Optimization

### Current Implementation
- Fetches all farmer locations once on component mount
- Updates on manual refresh button click
- Single Geolocation API call per location update

### For Scaling
To handle thousands of farmers:
1. Implement map-bounds-based querying
2. Add pagination to farmer locations
3. Use clustering for markers
4. Implement location history archival
5. Add real-time updates via WebSocket

## Next Steps

1. Create the API endpoints described above
2. Test with sample farmer data
3. Add location privacy controls
4. Implement real-time location updates (WebSocket)
5. Add analytics for farmer movement patterns
6. Create heatmaps for crop production areas

## Support

For issues with:
- **Google Maps API**: Check [Google Maps Documentation](https://developers.google.com/maps/documentation)
- **Geolocation**: Check [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- **React Implementation**: Check [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/)
