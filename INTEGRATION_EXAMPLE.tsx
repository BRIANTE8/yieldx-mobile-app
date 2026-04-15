/**
 * Integration Example: Adding Map Tab to Farmer Dashboard
 * 
 * This file shows how to integrate the FarmerMapView component
 * into your existing farmer dashboard.
 */

/*
// STEP 1: Add import to components/farmer/dashboard.tsx
import FarmerMapView from '@/components/map/farmer-map-view';

// STEP 2: Add a new Tab value for the map
// Inside your Tabs component, add:

<TabsContent value="map" className="space-y-4 p-4">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        🗺️ Farm Location Map
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        View your location and other farmers in Rwanda
      </p>
    </div>
  </div>
  <FarmerMapView
    farmerId={farmerData?.id || 'farmer-001'}
    farmerName={farmerData?.name || 'Your Farm'}
    onSignOut={onSignOut}
  />
</TabsContent>

// STEP 3: Add Map tab button to your TabsList
// In the TabsList, add:

<TabsButton value="map" className="flex items-center gap-2">
  <Globe className="w-4 h-4" />
  Map
</TabsButton>

// STEP 4: Import the Globe icon
import { Globe } from 'lucide-react';
*/

/**
 * COMPLETE EXAMPLE: How to integrate into existing dashboard
 * This is a code snippet showing the structure
 */

/*
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsButton } from '@/components/ui/tabs';
import { Globe, BarChart3, MessageSquare, User } from 'lucide-react';
import FarmerDashboardContent from '@/components/farmer/dashboard-content';
import AIAssistant from '@/components/ai/ai-assistant';
import FarmerMapView from '@/components/map/farmer-map-view';
import MarketEnhanced from '@/components/market/market-enhanced';

export default function FarmerDashboard({ onSignOut }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsButton value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsButton>
          <TabsButton value="market" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Market</span>
          </TabsButton>
          <TabsButton value="map" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Map</span>
          </TabsButton>
          <TabsButton value="ai" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsButton>
          <TabsButton value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsButton>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <FarmerDashboardContent onSignOut={onSignOut} />
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market">
          <MarketEnhanced />
        </TabsContent>

        {/* MAP TAB - NEW */}
        <TabsContent value="map" className="p-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <FarmerMapView
              farmerId="current-farmer-id"
              farmerName="Your Farm Name"
              onSignOut={onSignOut}
            />
          </div>
        </TabsContent>

        {/* AI Tab */}
        <TabsContent value="ai">
          <AIAssistant />
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <FarmerProfile onSignOut={onSignOut} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
*/

/**
 * AUTO-LOCATION CAPTURE ON LOGIN
 * 
 * Add this to your sign-in component to capture location automatically
 * when a farmer logs in:
 */

/*
import { getCurrentLocation, saveLocationToDB, requestLocationPermission } from '@/lib/location-service';

// In your sign-in handler:
const handleSignIn = async (farmerId: string, farmerName: string, password: string) => {
  try {
    // 1. First validate credentials (your existing logic)
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farmerId, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // 2. Request location permission (will show browser prompt)
    const hasPermission = await requestLocationPermission();

    if (hasPermission) {
      try {
        // 3. Get current location
        const location = await getCurrentLocation();

        // 4. Save to database
        const saved = await saveLocationToDB(farmerId, farmerName, location);

        if (saved) {
          console.log('Location captured and saved');
        }
      } catch (locationError) {
        console.warn('Could not capture location:', locationError);
        // Continue with login even if location fails
      }
    }

    // 5. Proceed with login
    setIsAuthenticated(true);
    setUserRole('farmer');
  } catch (error) {
    console.error('Sign in error:', error);
    setError(error.message);
  }
};
*/

/**
 * CUSTOMIZE GPS MARKER DATA
 * 
 * To include additional farmer information with their location:
 */

/*
// In your location-service.ts, update the farmer data structure:

interface FarmerLocation extends LocationCoordinates {
  id: string;
  name: string;
  farmerType?: string;           // e.g., "Vegetable Farmer"
  contactNumber?: string;        // e.g., "+250123456789"
  farmSize?: number;             // e.g., 2.5 (hectares)
  mainCrops?: string[];          // e.g., ["Tomatoes", "Peppers"]
  photoUrl?: string;             // Profile photo URL
  rating?: number;               // 1-5 stars
  lastUpdated?: string;
}

// When saving location, include these details:
const farmerData = {
  id: farmerId,
  name: farmerName,
  latitude: location.latitude,
  longitude: location.longitude,
  farmerType: 'Coffee Farmer',   // Add from farmer profile
  contactNumber: '+250123456789', // Add from farmer profile
  mainCrops: ['Coffee', 'Banana'],
  farmSize: 3.5,
};
*/

/**
 * DISTANCE CALCULATION UTILITIES
 * 
 * The component includes distance calculation between farms:
 */

/*
// Get distance in kilometers:
import { calculateDistance } from '@/lib/location-service';

const distance = calculateDistance(farmerLocation1, farmerLocation2);
console.log(`Distance: ${distance.toFixed(2)} km`);

// Use in your UI:
<p className="text-sm text-blue-600">
  📍 {distance.toFixed(2)} km away
</p>
*/

/**
 * LOCATION PRIVACY OPTIONS
 * 
 * Add privacy controls to let farmers choose sharing settings:
 */

/*
// Add to farmer profile settings:
interface LocationPrivacySettings {
  shareLocationEnabled: boolean;      // Can others see my location?
  shareLocationWithBuyers: boolean;   // Only visible to buyers?
  shareLocationPublic: boolean;       // Visible to all?
  updateFrequency: 'realtime' | 'hourly' | 'daily'; // How often to update
}

// Update location save function:
const canShareLocation = await checkPrivacySettings(farmerId);
if (canShareLocation) {
  await saveLocationToDB(farmerId, farmerName, location);
}
*/

/**
 * REAL-TIME LOCATION UPDATES
 * 
 * For continuous location tracking (battery intensive - use carefully):
 */

/*
import { watchLocation, stopWatchingLocation } from '@/lib/location-service';

// Start watching when map loads:
useEffect(() => {
  const watchId = watchLocation(
    async (location) => {
      // Update UI with new location
      setCurrentLocation(location);
      
      // Save to database (throttle to every 30 seconds)
      if (lastSave.current < Date.now() - 30000) {
        await saveLocationToDB(farmerId, farmerName, location);
        lastSave.current = Date.now();
      }
    }
  );

  // Cleanup
  return () => stopWatchingLocation(watchId);
}, []);
*/

export default function IntegrationGuide() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">Google Maps Integration Guide</h1>
      <p className="text-gray-600 mb-4">
        See the comments in this file for code examples on how to integrate the
        FarmerMapView component into your application.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="font-bold text-blue-900 mb-2">Quick Start Steps:</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Add Google Maps API key to .env.local</li>
          <li>Install @react-google-maps/api package</li>
          <li>Implement the API endpoints (/api/farmers/location and /api/farmers/locations)</li>
          <li>Import FarmerMapView into your dashboard</li>
          <li>Add the map tab to your Tabs component</li>
          <li>Test location permission and GPS capture</li>
        </ol>
      </div>
    </div>
  );
}
