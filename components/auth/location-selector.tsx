'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Globe, MapPin, Search } from 'lucide-react';

interface LocationData {
  [country: string]: string[];
}

const LOCATION_DATA: LocationData = {
  Rwanda: [
    'Kigali',
    'Muhanga',
    'Gitarama',
    'Rwamagana',
    'Huye',
    'Nyabihu',
    'Nyagatare',
    'Kayonza',
    'Ruhango',
    'Kicukiro',
    'Gasabo',
    'Bugesera',
  ],
  Kenya: [
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Eldoret',
    'Kericho',
    'Nyeri',
    'Muranga',
    'Thika',
    'Machakos',
    'Kilifi',
    'Garissa',
  ],
  India: [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Chandigarh',
    'Indore',
  ],
  Uganda: [
    'Kampala',
    'Gulu',
    'Lira',
    'Mbarara',
    'Fort Portal',
    'Jinja',
    'Masaka',
    'Mbale',
    'Soroti',
    'Tororo',
    'Arua',
    'Kasese',
  ],
  Ghana: [
    'Accra',
    'Kumasi',
    'Sekondi-Takoradi',
    'Tamale',
    'Cape Coast',
    'Tema',
    'Koforidua',
    'Obuasi',
    'Ashanti Region',
    'Greater Accra',
  ],
  Nigeria: [
    'Lagos',
    'Kano',
    'Abuja',
    'Ibadan',
    'Kaduna',
    'Port Harcourt',
    'Benin City',
    'Enugu',
    'Katsina',
    'Jos',
  ],
  Tanzania: [
    'Dar es Salaam',
    'Dodoma',
    'Arusha',
    'Moshi',
    'Mbeya',
    'Iringa',
    'Morogoro',
    'Tabora',
    'Mwanza',
    'Tanga',
  ],
  Malawi: [
    'Lilongwe',
    'Blantyre',
    'Mzuzu',
    'Zomba',
    'Kasungu',
    'Mangochi',
    'Salima',
    'Ncheu',
    'Ntchisi',
    'Dedza',
  ],
};

interface LocationSelectorProps {
  userRole: string;
  onLocationSelect: (country: string, city: string) => void;
}

export default function LocationSelector({
  userRole,
  onLocationSelect,
}: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [step, setStep] = useState<'country' | 'city'>('country');

  const countries = Object.keys(LOCATION_DATA).sort();

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCities = selectedCountry
    ? LOCATION_DATA[selectedCountry]
        .filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
        .sort()
    : [];

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setStep('city');
    setCitySearch('');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onLocationSelect(selectedCountry, city);
  };

  const getRoleLabel = () => {
    const roleLabels: { [key: string]: string } = {
      farmer: 'Farmer',
      seller: 'Seller',
      'farm-head': 'Farm Head',
      'market-head': 'Market Head',
    };
    return roleLabels[userRole] || userRole;
  };

  if (step === 'country') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-emerald-200 shadow-2xl rounded-2xl bg-white/95">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-emerald-700" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Country
              </h1>
              <p className="text-sm text-gray-600">
                You are logging in as <span className="font-semibold">{getRoleLabel()}</span>
              </p>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="space-y-2 max-h-96 overflow-y-auto mb-6">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-left border border-transparent hover:border-emerald-200"
                  >
                    <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{country}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-emerald-200 shadow-2xl rounded-2xl bg-white/95">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-emerald-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Select Your City
            </h1>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-semibold text-emerald-700">{selectedCountry}</span>
            </p>

            {/* Progress */}
            <button
              onClick={() => {
                setStep('country');
                setCountrySearch('');
              }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 rounded-full text-emerald-800 transition-colors"
            >
              ← Change Country
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search city..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* City List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-left border border-transparent hover:border-emerald-200"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{city}</span>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No cities found
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
