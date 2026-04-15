'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, RefreshCw, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getCurrentLocation,
  requestLocationPermission,
  fetchFarmerLocations,
  calculateDistance,
  RWANDA_CENTER,
} from '@/lib/location-service';

interface FarmerLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  farmerType?: string;
  contactNumber?: string;
  lastUpdated?: string;
}

export default function FarmerMapSimple() {
  const [currentLocation, setCurrentLocation] = useState<FarmerLocation | null>(null);
  const [farmers, setFarmers] = useState<FarmerLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

  // Initialize location on mount
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Request permission
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setError('Location permission denied. Please enable location in browser settings.');
          setLoading(false);
          return;
        }

        // Get current location
        const location = await getCurrentLocation();
        const currentFarmerLocation: FarmerLocation = {
          id: 'current-farmer',
          name: 'Your Location',
          latitude: location.latitude,
          longitude: location.longitude,
          lastUpdated: new Date().toLocaleTimeString(),
        };

        setCurrentLocation(currentFarmerLocation);

        // Fetch all farmers
        setSyncStatus('syncing');
        const allFarmers = await fetchFarmerLocations();
        setFarmers(allFarmers);
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);

        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
        setError(errorMessage);
        setLoading(false);
      }
    };

    initializeLocation();
  }, []);

  const handleRefresh = async () => {
    try {
      setSyncStatus('syncing');
      const allFarmers = await fetchFarmerLocations();
      setFarmers(allFarmers);
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (err) {
      setError('Failed to refresh locations');
      setSyncStatus('idle');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Getting your location...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-800">⚠️ {error}</p>
        </Card>
      )}

      {/* Current Location Card */}
      {currentLocation && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-green-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Your Location
              </h3>
              <p className="text-sm text-green-700 mt-1">
                {currentLocation.latitude.toFixed(4)}°, {currentLocation.longitude.toFixed(4)}°
              </p>
              <p className="text-xs text-green-600 mt-1">Updated: {currentLocation.lastUpdated}</p>
            </div>
            {syncStatus !== 'idle' && (
              <div className={`text-xs font-semibold ${syncStatus === 'synced' ? 'text-green-600' : 'text-orange-600'} flex items-center gap-2`}>
                {syncStatus === 'syncing' && <Loader2 className="w-3 h-3 animate-spin" />}
                {syncStatus === 'syncing' ? 'Syncing...' : '✓ Synced'}
              </div>
            )}
          </div>

          <Button 
            onClick={handleRefresh}
            disabled={syncStatus === 'syncing'}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            Refresh Locations
          </Button>
        </Card>
      )}

      {/* Farmers List */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Farmers in Rwanda ({farmers.length})
        </h3>

        <div className="space-y-3">
          {farmers.length > 0 ? (
            farmers.map((farmer) => {
              const distance = currentLocation
                ? calculateDistance(currentLocation, farmer)
                : null;

              return (
                <Card
                  key={farmer.id}
                  onClick={() => setSelectedFarmer(selectedFarmer === farmer.id ? null : farmer.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedFarmer === farmer.id
                      ? 'bg-blue-50 border-blue-300 shadow-md'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{farmer.name}</h4>
                      {farmer.farmerType && (
                        <p className="text-sm text-gray-600">{farmer.farmerType}</p>
                      )}
                    </div>
                    {distance && (
                      <span className="text-sm font-semibold text-blue-600">
                        📍 {distance.toFixed(2)} km
                      </span>
                    )}
                  </div>

                  {selectedFarmer === farmer.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 text-xs">Latitude</p>
                          <p className="font-mono font-bold text-gray-900">
                            {farmer.latitude.toFixed(4)}°
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs">Longitude</p>
                          <p className="font-mono font-bold text-gray-900">
                            {farmer.longitude.toFixed(4)}°
                          </p>
                        </div>
                      </div>

                      {farmer.contactNumber && (
                        <div>
                          <p className="text-gray-600 text-xs">Contact</p>
                          <p className="font-bold text-gray-900">{farmer.contactNumber}</p>
                        </div>
                      )}

                      {farmer.lastUpdated && (
                        <div>
                          <p className="text-gray-600 text-xs">Last Updated</p>
                          <p className="text-gray-900">{farmer.lastUpdated}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-600">No farmers found in the database</p>
            </Card>
          )}
        </div>
      </div>

      {/* Map Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-900 mb-2">
          <strong>💡 Full Google Map:</strong> Coming soon! Install the package with:
        </p>
        <code className="block bg-gray-900 text-green-400 p-3 rounded text-xs font-mono mt-2 overflow-x-auto">
          npm install @react-google-maps/api
        </code>
        <p className="text-xs text-blue-700 mt-2">
          Then set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local to enable the interactive map.
        </p>
      </Card>
    </div>
  );
}
