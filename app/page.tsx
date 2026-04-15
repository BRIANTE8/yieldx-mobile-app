'use client';

import { useState } from 'react';
import { SignIn } from '@/components/auth/sign-in';
import FarmerDashboard from '@/components/farmer/dashboard';
import SellerDashboard from '@/components/seller/dashboard';
import FarmHeadDashboard from '@/components/farm-head/dashboard';
import MarketHeadDashboard from '@/components/market-head/dashboard';
import LocationSelector from '@/components/auth/location-selector';

type UserRole = 'farmer' | 'seller' | 'farm-head' | 'market-head' | null;

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSignIn = (role: UserRole) => {
    setUserRole(role);
    // Show location selector for all roles
    setShowLocationSelector(true);
  };

  const handleLocationSelect = (country: string, city: string) => {
    setSelectedCountry(country);
    setSelectedCity(city);
    setShowLocationSelector(false);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    setShowLocationSelector(false);
    setSelectedCountry('');
    setSelectedCity('');
  };

  if (showLocationSelector) {
    return <LocationSelector userRole={userRole} onLocationSelect={handleLocationSelect} />;
  }

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      {userRole === 'farmer' && <FarmerDashboard onSignOut={handleSignOut} country={selectedCountry} city={selectedCity} />}
      {userRole === 'seller' && <SellerDashboard onSignOut={handleSignOut} country={selectedCountry} city={selectedCity} />}
      {userRole === 'farm-head' && <FarmHeadDashboard onSignOut={handleSignOut} country={selectedCountry} city={selectedCity} />}
      {userRole === 'market-head' && <MarketHeadDashboard onSignOut={handleSignOut} country={selectedCountry} city={selectedCity} />}
    </div>
  );
}
