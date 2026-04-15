'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from '@react-google-maps/api';
import { AlertCircle, MapPin, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getCurrentLocation,
  requestLocationPermission,
  saveLocationToDB,
  fetchFarmerLocations,
  calculateDistance,
  RWANDA_CENTER,
  DEFAULT_MAP_ZOOM,
  ZOOM_TO_SHOW_ALL,
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

interface FarmerMapProps {
  farmerId?: string;
  farmerName?: string;
  onSignOut?: () => void;
}

// Custom map styles for better UX
const mapStyles = {
  height: '100%',
  width: '100%',
};

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const defaultCenter = {
  lat: RWANDA_CENTER.latitude,
  lng: RWANDA_CENTER.longitude,
};

// Custom marker icons
const FARMER_MARKER_ICON = {
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
  fillColor: '#4F46E5', // Indigo
  fillOpacity: 1,
  strokeColor: '#fff',
  strokeWeight: 2,
  scale: 2,
};

const CURRENT_LOCATION_MARKER_ICON = {
  path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
  fillColor: '#10B981', // Green
  fillOpacity: 1,
  strokeColor: '#fff',
  strokeWeight: 2,
  scale: 2,
};

export default function FarmerMapView({
  farmerId = 'farmer-001',
  farmerName = 'Your Farm',
  onSignOut,
}: FarmerMapProps) {
  const [currentLocation, setCurrentLocation] = useState<FarmerLocation | null>(null);
  const [farmers, setFarmers] = useState<FarmerLocation[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<FarmerLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const mapRef = useRef(null);

  // Request location permission and get current location on mount
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Request location permission
        const hasPermission = await requestLocationPermission();
        setPermissionGranted(hasPermission);

        if (!hasPermission) {
          setError(
            'Location access denied. Please enable location permission in browser settings.'
          );
          setLoading(false);
          return;
        }

        // Get current location
        const location = await getCurrentLocation();

        const currentFarmerLocation: FarmerLocation = {
          id: farmerId,
          name: farmerName,
          latitude: location.latitude,
          longitude: location.longitude,
          lastUpdated: new Date().toLocaleString(),
        };

        setCurrentLocation(currentFarmerLocation);
        setMapCenter({
          lat: location.latitude,
          lng: location.longitude,
        });

        // Save location to database
        setSyncStatus('syncing');
        const saved = await saveLocationToDB(farmerId, farmerName, location);

        if (saved) {
          setSyncStatus('synced');
          setTimeout(() => setSyncStatus('idle'), 3000);
        }

        // Fetch all farmer locations
        const allFarmers = await fetchFarmerLocations();
        setFarmers(allFarmers);

        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to get location';
        setError(errorMessage);
        setLoading(false);
      }
    };

    initializeLocation();
  }, [farmerId, farmerName]);

  // Refresh farmer locations
  const handleRefreshLocations = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      const allFarmers = await fetchFarmerLocations();
      setFarmers(allFarmers);
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err) {
      setError('Failed to refresh locations');
      setSyncStatus('idle');
    }
  }, []);

  // Update current farmer location
  const handleUpdateLocation = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      const location = await getCurrentLocation();

      const updatedLocation: FarmerLocation = {
        id: farmerId,
        name: farmerName,
        latitude: location.latitude,
        longitude: location.longitude,
        lastUpdated: new Date().toLocaleString(),
      };

      setCurrentLocation(updatedLocation);
      setMapCenter({
        lat: location.latitude,
        lng: location.longitude,
      });

      // Save to database
      await saveLocationToDB(farmerId, farmerName, location);

      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err) {
      setError('Failed to update location');
      setSyncStatus('idle');
    }
  }, [farmerId, farmerName]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Getting your location...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* Google Map */}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={DEFAULT_MAP_ZOOM}
          ref={mapRef}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          }}
        >
          {/* Current farmer location with radius indicator */}
          {currentLocation && (
            <>
              <Marker
                position={{
                  lat: currentLocation.latitude,
                  lng: currentLocation.longitude,
                }}
                title={`${currentLocation.name} (You)`}
                icon={CURRENT_LOCATION_MARKER_ICON}
                onClick={() => setSelectedMarker(currentLocation)}
              />
              {/* Accuracy circle */}
              {currentLocation && (
                <Circle
                  center={{
                    lat: currentLocation.latitude,
                    lng: currentLocation.longitude,
                  }}
                  radius={100} // 100 meters
                  options={{
                    fillColor: '#10B981',
                    fillOpacity: 0.1,
                    strokeColor: '#10B981',
                    strokeOpacity: 0.3,
                    strokeWeight: 1,
                  }}
                />
              )}
            </>
          )}

          {/* Other farmer markers */}
          {farmers.map((farmer) => (
            <Marker
              key={farmer.id}
              position={{
                lat: farmer.latitude,
                lng: farmer.longitude,
              }}
              title={farmer.name}
              icon={FARMER_MARKER_ICON}
              onClick={() => setSelectedMarker(farmer)}
            />
          ))}

          {/* Info window for selected marker */}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="max-w-sm p-2">
                <h3 className="font-bold text-gray-900">{selectedMarker.name}</h3>
                {selectedMarker.id === farmerId && (
                  <p className="text-xs text-green-600 font-semibold">📍 Your Location</p>
                )}
                {selectedMarker.farmerType && (
                  <p className="text-xs text-gray-600">
                    Type: {selectedMarker.farmerType}
                  </p>
                )}
                {selectedMarker.contactNumber && (
                  <p className="text-xs text-gray-600">
                    Contact: {selectedMarker.contactNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Lat: {selectedMarker.latitude.toFixed(4)}°
                  <br />
                  Lon: {selectedMarker.longitude.toFixed(4)}°
                </p>
                {selectedMarker.lastUpdated && (
                  <p className="text-xs text-gray-400 mt-1">
                    Updated: {selectedMarker.lastUpdated}
                  </p>
                )}
                {currentLocation && selectedMarker.id !== farmerId && (
                  <p className="text-xs text-blue-600 mt-1 font-semibold">
                    Distance:{' '}
                    {calculateDistance(currentLocation, selectedMarker).toFixed(2)} km
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 space-y-3">
        {/* Error Alert */}
        {error && (
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </Card>
        )}

        {/* Location Info Card */}
        {currentLocation && (
          <Card className="p-4 backdrop-blur-sm bg-white/80">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900">{currentLocation.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>
                  {currentLocation.latitude.toFixed(4)}°, {currentLocation.longitude.toFixed(4)}°
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Updated: {currentLocation.lastUpdated}
              </div>

              {/* Sync Status */}
              {syncStatus !== 'idle' && (
                <div
                  className={`text-xs font-semibold ${
                    syncStatus === 'synced' ? 'text-green-600' : 'text-orange-600'
                  } flex items-center gap-2`}
                >
                  {syncStatus === 'syncing' && (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  )}
                  {syncStatus === 'syncing' ? 'Syncing...' : '✓ Synced'}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Farmer Count */}
        <Card className="p-4 backdrop-blur-sm bg-white/80">
          <div className="text-sm">
            <p className="text-gray-600">
              <span className="font-bold text-blue-600">{farmers.length}</span> farmers visible
            </p>
            {permissionGranted && (
              <p className="text-xs text-green-600 mt-1">✓ Location sharing enabled</p>
            )}
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-3">
        <Button
          onClick={handleUpdateLocation}
          disabled={syncStatus === 'syncing'}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-green-600 hover:bg-green-700"
          title="Update my location"
        >
          {syncStatus === 'syncing' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </Button>

        <Button
          onClick={handleRefreshLocations}
          disabled={syncStatus === 'syncing'}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700"
          title="Refresh all locations"
        >
          {syncStatus === 'syncing' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
        </Button>

        <Button
          onClick={onSignOut}
          variant="outline"
          className="shadow-lg"
        >
          Sign Out
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="p-4 backdrop-blur-sm bg-white/80 text-sm">
          <p className="font-bold mb-2 text-gray-900">Legend</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              <span className="text-gray-700">Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white" />
              <span className="text-gray-700">Other Farmers</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
