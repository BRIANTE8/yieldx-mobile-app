'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Users,
  ShoppingCart,
  AlertCircle,
  Filter,
  X,
  Phone,
  Mail,
  Globe,
  Leaf,
} from 'lucide-react';

export default function FarmerMap() {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'farmers' | 'sellers' | 'global'>('all');

  // Mock location data - Local
  const farmers = [
    {
      id: 1,
      name: 'Raj Kumar',
      type: 'farmer',
      location: 'Green Valley, Delhi',
      crops: 'Rice, Wheat',
      coords: { lat: 28.7041, lng: 77.1025 },
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      name: 'Priya Singh',
      type: 'farmer',
      location: 'Rural Delhi',
      crops: 'Corn, Soybean',
      coords: { lat: 28.6692, lng: 77.2100 },
      phone: '+91 99876 54321',
    },
    {
      id: 3,
      name: 'Aman Patel',
      type: 'farmer',
      location: 'Haryana Region',
      crops: 'Sugarcane, Cotton',
      coords: { lat: 28.5355, lng: 77.3910 },
      phone: '+91 97654 32109',
    },
  ];

  const sellers = [
    {
      id: 101,
      name: 'Agro Exports Ltd',
      type: 'seller',
      location: 'Delhi Market',
      crops: 'All types',
      urgentDemand: 'Rice - 500 tons',
      urgencyLevel: 'Critical',
      coords: { lat: 28.6139, lng: 77.2090 },
      phone: '+91 11-2000-0000',
    },
    {
      id: 102,
      name: 'Harvest Foods',
      type: 'seller',
      location: 'Noida',
      crops: 'All types',
      urgentDemand: 'Corn - 200 tons',
      urgencyLevel: 'High',
      coords: { lat: 28.5355, lng: 77.3910 },
      phone: '+91 11-2000-1111',
    },
    {
      id: 103,
      name: 'Fresh Produce Hub',
      type: 'seller',
      location: 'West Delhi',
      crops: 'All types',
      urgentDemand: 'Wheat - 300 tons',
      urgencyLevel: 'Medium',
      coords: { lat: 28.7282, lng: 77.0500 },
      phone: '+91 11-2000-2222',
    },
  ];

  // Global agricultural regions
  const globalRegions = [
    {
      id: 'asia',
      name: 'Southeast Asia',
      crop: 'Rice Production',
      production: '700M tons/year',
      coords: { lat: 15, lng: 105 },
      icon: '🌾',
      color: 'bg-green-500',
    },
    {
      id: 'americas',
      name: 'North America',
      crop: 'Corn Belt',
      production: '380M tons/year',
      coords: { lat: 40, lng: -95 },
      icon: '🌽',
      color: 'bg-yellow-500',
    },
    {
      id: 'europe',
      name: 'Western Europe',
      crop: 'Wheat & Barley',
      production: '200M tons/year',
      coords: { lat: 50, lng: 10 },
      icon: '🌾',
      color: 'bg-amber-500',
    },
    {
      id: 'africa',
      name: 'Sub-Saharan Africa',
      crop: 'Maize Farming',
      production: '85M tons/year',
      coords: { lat: -5, lng: 25 },
      icon: '🌽',
      color: 'bg-orange-500',
    },
    {
      id: 'india',
      name: 'India',
      crop: 'Mixed Farming',
      production: '280M tons/year',
      coords: { lat: 22, lng: 78 },
      icon: '🌾',
      color: 'bg-green-600',
    },
    {
      id: 'brazil',
      name: 'Brazil',
      crop: 'Sugarcane & Soybean',
      production: '120M tons/year',
      coords: { lat: -10, lng: -55 },
      icon: '🍃',
      color: 'bg-emerald-500',
    },
  ];

  const markers = filterType === 'global' 
    ? globalRegions as any
    : filterType === 'all' 
    ? [...farmers, ...sellers]
    : filterType === 'farmers' 
    ? farmers 
    : sellers;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-2 justify-between items-center">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg text-xs font-semibold">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            Farmers ({farmers.length})
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg text-xs font-semibold">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            Buyers ({sellers.length})
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-lg text-xs font-semibold">
            <Globe className="w-3 h-3" />
            Global Regions ({globalRegions.length})
          </span>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="p-4 space-y-3">
          <h3 className="font-bold text-gray-900 mb-3">Filter by Type</h3>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'Local Locations' },
              { value: 'farmers', label: 'Farmers Only' },
              { value: 'sellers', label: 'Buyers Only' },
              { value: 'global', label: 'Global Regions' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="filterType"
                  value={option.value}
                  checked={filterType === option.value}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </Card>
      )}

      {/* Map Container */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 min-h-96 rounded-lg overflow-hidden relative">
        {/* Simplified Map Representation */}
        <div className="relative w-full h-full bg-white rounded-lg border-2 border-blue-300 flex items-center justify-center overflow-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50 pointer-events-none"></div>
          
          {/* Map markers */}
          <div className="relative w-full h-96">
            {markers.map((marker) => (
              <div
                key={marker.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${marker.coords.lng > 77 ? 60 + (marker.coords.lng - 77) * 50 : 60}px`,
                  top: `${marker.coords.lat > 28.6 ? 50 + (marker.coords.lat - 28.6) * 50 : 50}px`,
                }}
                onClick={() => setSelectedMarker(marker.id)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-110 transition ${
                  marker.type === 'farmer'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                  {marker.type === 'farmer' ? '🚜' : '🛒'}
                </div>
                {selectedMarker === marker.id && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 w-72 bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                    <button
                      onClick={() => setSelectedMarker(null)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {marker.type === 'farmer' ? (
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{marker.name}</h4>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {marker.location}
                          </p>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                          <p className="text-xs text-gray-600">Crops</p>
                          <p className="text-sm font-semibold text-gray-900">{marker.crops}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                            <Phone className="w-3 h-3 mr-1" /> Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="w-3 h-3 mr-1" /> Message
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{marker.name}</h4>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {marker.location}
                          </p>
                        </div>
                        <div className={`p-3 rounded border-l-4 ${
                          marker.urgencyLevel === 'Critical' ? 'bg-red-50 border-red-500' :
                          marker.urgencyLevel === 'High' ? 'bg-orange-50 border-orange-500' :
                          'bg-yellow-50 border-yellow-500'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className={`w-4 h-4 ${
                              marker.urgencyLevel === 'Critical' ? 'text-red-600' :
                              marker.urgencyLevel === 'High' ? 'text-orange-600' :
                              'text-yellow-600'
                            }`} />
                            <span className={`text-xs font-bold ${
                              marker.urgencyLevel === 'Critical' ? 'text-red-700' :
                              marker.urgencyLevel === 'High' ? 'text-orange-700' :
                              'text-yellow-700'
                            }`}>
                              {marker.urgencyLevel} Demand
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{marker.urgentDemand}</p>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <ShoppingCart className="w-4 h-4 mr-2" /> Sell to Them
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Global Regions Display */}
      {filterType === 'global' && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            Global Agricultural Regions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalRegions.map((region) => (
              <Card key={region.id} className="p-4 hover:shadow-lg transition">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{region.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{region.name}</h4>
                    <p className="text-xs text-gray-600">{region.crop}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-xs text-gray-600 mb-1">Annual Production</p>
                  <p className="text-sm font-bold text-blue-600">{region.production}</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm">
                  Learn About This Region
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Buyers List (for farmers) */}
      {filterType !== 'farmers' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Urgent Buyer Demands
          </h3>
          <div className="space-y-3">
            {sellers.map((seller) => (
              <div
                key={seller.id}
                className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition ${
                  seller.urgencyLevel === 'Critical'
                    ? 'bg-red-50 border-red-500'
                    : seller.urgencyLevel === 'High'
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{seller.name}</h4>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {seller.location}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${
                    seller.urgencyLevel === 'Critical'
                      ? 'bg-red-600 text-white'
                      : seller.urgencyLevel === 'High'
                      ? 'bg-orange-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {seller.urgencyLevel}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  {seller.urgentDemand}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Contact & Sell
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Nearby Farmers List (for buyers) */}
      {filterType !== 'sellers' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Nearby Farmers
          </h3>
          <div className="space-y-3">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                className="p-4 rounded-lg border border-green-200 bg-green-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{farmer.name}</h4>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {farmer.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  <Leaf className="w-4 h-4 inline mr-2" />
                  Growing: {farmer.crops}
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm">
                  Connect with Farmer
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
