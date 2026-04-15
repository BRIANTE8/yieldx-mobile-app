'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Cloud,
  Brain,
  Map,
  Store,
  AlertCircle,
  User,
  LogOut,
  Bell,
  Droplets,
  Sprout,
  TrendingUp,
  Calendar,
  Award,
  Globe,
  Compass,
  Mic,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NetworkStatus from '@/components/network-status';
import ClimateWidget from './climate-widget';
import AIAssistant from '@/components/ai/ai-assistant';
import FarmerMapView from '@/components/map/farmer-map-view';
import MarketEnhanced from '@/components/market/market-enhanced';
import SmartAlerts from '@/components/alerts/smart-alerts';
import FarmerProfile from './farmer-profile';

interface FarmerDashboardProps {
  onSignOut: () => void;
  country?: string;
  city?: string;
}

type FarmingRegion = 'africa' | 'middleeast' | 'australia' | 'asia' | 'americas' | 'europe' | null;

export default function FarmerDashboard({ onSignOut, country, city }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [unreadAlerts, setUnreadAlerts] = useState(3);
  const [selectedRegion, setSelectedRegion] = useState<FarmingRegion>(null);

  const regionDetails: Record<FarmingRegion, any> = {
    africa: {
      title: 'Africa - Climate-Smart Farming',
      emoji: '🌱',
      color: 'from-orange-400 to-red-500',
      description: 'Discover drought-resistant crops, water conservation, and adaptation strategies for arid climates.',
      details: [
        {
          section: 'Climate Challenges',
          content: [
            'Increasing temperatures and unpredictable rainfall patterns',
            'Soil degradation due to deforestation',
            'Water scarcity affecting irrigation systems',
            'Erratic seasonal patterns threatening crop yields'
          ]
        },
        {
          section: 'Key Practices',
          content: [
            'Drought-Resistant Crops: Millet, sorghum, and cassava varieties',
            'Water Harvesting: Rainwater collection and storage systems',
            'Soil Conservation: Terracing and mulching techniques',
            'Crop Diversification: Growing multiple crop types for resilience',
            'Agroforestry: Integrating trees with crops to improve soil quality'
          ]
        },
        {
          section: 'Success Stories',
          content: [
            'Ethiopia: Adopting teff cultivation for drought resilience',
            'Kenya: Implementing drip irrigation in arid regions',
            'Mali: Reviving traditional water management systems',
            'Zimbabwe: Growing indigenous drought-resistant varieties'
          ]
        },
        {
          section: 'Expected Outcomes',
          content: [
            'Increased crop productivity by 30-40%',
            'Reduced water usage by 50%',
            'Improved soil health within 2-3 years',
            'Enhanced farm income through drought resilience'
          ]
        }
      ]
    },
    middleeast: {
      title: 'Middle East - Date Farming',
      emoji: '🌴',
      color: 'from-amber-400 to-amber-600',
      description: 'Explore date palm cultivation and profitable fruit farming in desert conditions.',
      details: [
        {
          section: 'Climate Conditions',
          content: [
            'Extreme heat (40-50°C during summers)',
            'Limited water resources and high salinity',
            'Sandy and rocky soils',
            'Low humidity environments'
          ]
        },
        {
          section: 'Date Palm Cultivation',
          content: [
            'Variety Selection: Deglet Noor, Medjool, and Barhi varieties',
            'Irrigation Methods: Drip and spray irrigation for efficiency',
            'Soil Management: Adding compost and organic matter',
            'Pollination: Hand pollination techniques for premium varieties',
            'Harvesting: Staggered harvesting for quality and freshness'
          ]
        },
        {
          section: 'Value Addition',
          content: [
            'Date paste and energy bars production',
            'Syrup and molasses manufacturing',
            'Organic date certification for premium markets',
            'Agro-tourism and farm experiences',
            'Date-based beverages and health products'
          ]
        },
        {
          section: 'Market Insights',
          content: [
            'Global date market worth $10+ billion annually',
            'Growing demand in China and India',
            'Organic dates commanding 40-50% premium prices',
            'Export opportunities to European markets'
          ]
        }
      ]
    },
    australia: {
      title: 'Australia - Pastoral Farming',
      emoji: '🐑',
      color: 'from-red-400 to-rose-600',
      description: 'Learn about large-scale sheep and cattle ranching in expansive grasslands.',
      details: [
        {
          section: 'Extensive Farming System',
          content: [
            'Large land holdings (1000+ hectares)',
            'Grazing on natural grasslands and pastures',
            'Low input, low output intensive management',
            'Rotational grazing systems for sustainability'
          ]
        },
        {
          section: 'Livestock Types',
          content: [
            'Merino Sheep: Premium wool production',
            'Beef Cattle: High-quality beef breeds',
            'Wool Production: 25% of global wool supply from Australia',
            'Dual-purpose breeds for meat and wool',
            'Breed optimization for environmental conditions'
          ]
        },
        {
          section: 'Pasture Management',
          content: [
            'Native pasture utilization and improvement',
            'Rotational grazing for soil health',
            'Water point management and stock routes',
            'Seasonal variation handling (drought management)',
            'Biodiversity conservation in grazing areas'
          ]
        },
        {
          section: 'Technology & Innovation',
          content: [
            'GPS tracking for livestock monitoring',
            'Drone surveillance for pasture assessment',
            'Automated watering systems',
            'Weather forecasting for grazing decisions',
            'Data-driven stocking rates optimization'
          ]
        }
      ]
    },
    asia: {
      title: 'Southeast Asia - Rice Farming',
      emoji: '🌾',
      color: 'from-green-400 to-emerald-600',
      description: 'Explore the world\'s largest rice producing region with terrace farming techniques.',
      details: [
        {
          section: 'Terrace Farming',
          content: [
            'Ancient terrace systems preventing soil erosion',
            'Gravity-fed irrigation from mountain sources',
            'Maximizing water-holding capacity',
            'Stunning landscape preservation and tourism'
          ]
        },
        {
          section: 'Water Management',
          content: [
            'Flood irrigation systems for rice paddies',
            'Seasonal monsoon water utilization',
            'Groundwater tapping for dry season'
          ]
        },
        {
          section: 'Crop Rotation',
          content: [
            'Rice-rice-fish polyculture systems',
            'Integration of aquaculture with crop farming',
            'Growing vegetables during dry season'
          ]
        },
        {
          section: 'Productivity',
          content: [
            '2-3 crops per year in favorable regions',
            'Yields of 5-7 tons/hectare with modern practices',
            'Supply for over 3 billion people globally'
          ]
        }
      ]
    },
    americas: {
      title: 'North America - Corn Belt',
      emoji: '🌽',
      color: 'from-yellow-400 to-orange-500',
      description: 'Discover advanced mechanized farming and precision agriculture.',
      details: [
        {
          section: 'Technology Integration',
          content: [
            'Mechanized planting and harvesting equipment',
            'GPS-guided tractors for precision',
            'Variable rate application of inputs',
            'Real-time soil and crop monitoring systems'
          ]
        },
        {
          section: 'Crop Varieties',
          content: [
            'Genetically improved corn hybrids',
            'Disease and pest resistant varieties',
            'Yield optimization through genetics',
            'Herbicide-tolerant crop systems'
          ]
        },
        {
          section: 'Sustainable Practices',
          content: [
            'Conservation tillage and no-till systems',
            'Cover crops for soil health',
            'Integrated pest management',
            'Nutrient management for environmental protection'
          ]
        },
        {
          section: 'Market Access',
          content: [
            'Global export of corn and corn products',
            'Commodity trading and price stability',
            'Crop insurance and government programs',
            'Biofuel and industrial applications'
          ]
        }
      ]
    },
    europe: {
      title: 'Europe - Organic Farming',
      emoji: '🥕',
      color: 'from-blue-400 to-blue-600',
      description: 'Learn about sustainable organic farming practices and certification.',
      details: [
        {
          section: 'Organic Standards',
          content: [
            'No synthetic pesticides or fertilizers',
            'Building soil fertility through natural methods',
            'Biodiversity protection and conservation',
            'Strict certification and compliance requirements'
          ]
        },
        {
          section: 'Soil Management',
          content: [
            'Compost and manure application',
            'Legume crops for nitrogen fixation',
            'Crop rotation for pest and disease control',
            'Mycorrhizal fungi promotion'
          ]
        },
        {
          section: 'Biodiversity',
          content: [
            'Hedgerows and wildflower strips',
            'Pollinator habitat creation',
            'Integrated crop-livestock systems',
            'Protected varieties of heirloom crops'
          ]
        },
        {
          section: 'Market Premium',
          content: [
            '30-50% price premium for organic products',
            'Growing consumer demand in Europe and North America',
            'Direct-to-consumer marketing opportunities',
            'Restaurant and food service contracts'
          ]
        }
      ]
    },
    null: null
  };

  return (
    <div className="bg-gradient-to-b from-lime-50/70 via-background to-emerald-50/40 min-h-screen pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-lime-700 text-white sticky top-0 z-40 shadow-lg border-b border-emerald-700/70">
        
        <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-start md:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-emerald-300">
                  <Sprout className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-100 font-semibold mb-1">AgroHub Farmer</p>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Welcome, Raj 👋</h1>
                  <p className="text-emerald-100 text-base">Good morning! Here's your farm overview</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl px-3 py-2 inline-block border border-emerald-200">
                <p className="text-lg font-bold flex items-center gap-2 text-gray-900">
                  🌾 Farm: <span className="text-emerald-700">Green Valley Crops</span>
                </p>
                <p className="text-gray-600 text-sm mt-1">📍 Delhi Region • 87 acres • 15 workers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-4 hover:bg-orange-500 rounded-xl transition relative bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg border-3 border-white transform hover:scale-110">
                <Bell className="w-7 h-7 text-white font-bold" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse border-2 border-white">
                    {unreadAlerts}
                  </span>
                )}
              </button>
              <button 
                onClick={onSignOut}
                className="p-4 hover:bg-red-700 rounded-xl transition bg-gradient-to-br from-red-500 to-pink-600 shadow-lg border-3 border-white transform hover:scale-110"
              >
                <LogOut className="w-7 h-7 text-white font-bold" />
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Network Status Banner */}
      <div className="max-w-7xl mx-auto p-4 md:p-5 pt-4">
        <NetworkStatus showOnlyErrors={false} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 mb-8 fixed top-24 left-0 right-0 z-40 p-2 gap-3 bg-white/90 backdrop-blur border border-emerald-100 shadow-sm mx-auto max-w-7xl rounded-2xl">
            <TabsTrigger value="home" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <Cloud className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Home</span>
            </TabsTrigger>
            <TabsTrigger value="explore" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <Compass className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Explore</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <Brain className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">AI</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <Map className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Map</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <Store className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Market</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <AlertCircle className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Alert</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-sm font-bold py-3 px-3 rounded-xl transition-all duration-300 bg-transparent border border-emerald-100 shadow-none data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=active]:border-emerald-700 flex flex-col items-center gap-1 hover:shadow-lg text-gray-700 hover:text-gray-900">
              <User className="w-7 h-7" />
              <span className="hidden sm:inline text-sm font-bold">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="home" className="space-y-6 animate-in mt-28">
            {/* Key Metrics - Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Available Crops */}
              <div className="rounded-2xl p-6 shadow-2xl border-2 hover:shadow-2xl transition-all transform hover:scale-105" style={{background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderColor: '#10b981'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-black text-xs font-bold uppercase tracking-widest">Available Crops</p>
                    <p className="text-5xl font-black text-black mt-3">12</p>
                    <p className="text-black text-sm mt-2 font-semibold">Ready for Harvest</p>
                  </div>
                  <div className="text-7xl opacity-30">🌾</div>
                </div>
              </div>

              {/* Active Orders */}
              <div className="rounded-2xl p-6 shadow-2xl border-2 hover:shadow-2xl transition-all transform hover:scale-105" style={{background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', borderColor: '#06b6d4'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-black text-xs font-bold uppercase tracking-widest">Active Orders</p>
                    <p className="text-5xl font-black text-black mt-3">8</p>
                    <p className="text-black text-sm mt-2 font-semibold">Pending Delivery</p>
                  </div>
                  <div className="text-7xl opacity-30">📦</div>
                </div>
              </div>

              {/* This Month Sales */}
              <div className="rounded-2xl p-6 shadow-2xl border-2 hover:shadow-2xl transition-all transform hover:scale-105" style={{background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', borderColor: '#f59e0b'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-black text-xs font-bold uppercase tracking-widest">This Month Sales</p>
                    <p className="text-5xl font-black text-black mt-3">₹45.2K</p>
                    <p className="text-black text-sm mt-2 font-semibold">↑ 12% from last month</p>
                  </div>
                  <div className="text-7xl opacity-30">💰</div>
                </div>
              </div>

              {/* Farmer Partners */}
              <div className="rounded-2xl p-6 shadow-2xl border-2 hover:shadow-2xl transition-all transform hover:scale-105" style={{background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderColor: '#a78bfa'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-black text-xs font-bold uppercase tracking-widest">Farmer Partners</p>
                    <p className="text-5xl font-black text-black mt-3">24</p>
                    <p className="text-black text-sm mt-2 font-semibold">In Your Network</p>
                  </div>
                  <div className="text-7xl opacity-30">👥</div>
                </div>
              </div>
            </div>

            {/* Enhanced Home Page */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ClimateWidget country={country} city={city} />
                
                {/* Real-time Crop Monitoring */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 p-6 rounded-2xl shadow-md">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <Sprout className="w-6 h-6" />
                    Real-time Crop Monitoring
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                      <p className="text-xs text-gray-600 font-medium">Crop Stage</p>
                      <p className="text-lg font-bold text-green-700">Flowering</p>
                      <p className="text-xs text-gray-500 mt-1">Day 45/120</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                      <p className="text-xs text-gray-600 font-medium">Health Status</p>
                      <p className="text-lg font-bold text-green-700">✓ Excellent</p>
                      <p className="text-xs text-gray-500 mt-1">98% Coverage</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                      <p className="text-xs text-gray-600 font-medium">Disease Risk</p>
                      <p className="text-lg font-bold text-yellow-600">Low</p>
                      <p className="text-xs text-gray-500 mt-1">Monitor Weekly</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                      <p className="text-xs text-gray-600 font-medium">Water Needs</p>
                      <p className="text-lg font-bold text-blue-600">Moderate</p>
                      <p className="text-xs text-gray-500 mt-1">2-3 days</p>
                    </div>
                  </div>
                </Card>

                {/* Predictive Analytics */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 p-6 rounded-2xl shadow-md">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Yield Prediction & Analytics
                  </h3>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-600 mb-2">Estimated Yield: <span className="font-bold text-blue-600">4.5 Tons/Acre</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Based on current conditions - 25% probability of higher yield</p>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Optimal Output</span>
                      <span className="font-semibold text-green-600">5.2 Tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expected Revenue</span>
                      <span className="font-semibold text-green-600">₹2.34L</span>
                    </div>
                  </div>
                </Card>

                {/* Resource & Equipment Status */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 p-6 rounded-2xl shadow-md">
                  <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                    ⚙️ Resource Status
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">Fertilizer Stock</p>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Low</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">45kg remaining - Reorder in 2 days</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">Irrigation System</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Operational</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Next maintenance: 15 days</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Right Sidebar - Advanced Features */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    This Week
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-900">Irrigation Scheduled</p>
                      <p className="text-xs text-gray-600">Wednesday 6 AM</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-sm font-medium text-gray-900">Pest Inspection Due</p>
                      <p className="text-xs text-gray-600">Friday 10 AM</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-medium text-gray-900">Harvest Readiness Check</p>
                      <p className="text-xs text-gray-600">Next Monday</p>
                    </div>
                  </div>
                </Card>

                {/* Performance Score */}
                <Card className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Farm Performance
                  </h3>
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl">
                      92
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Excellent Score</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Quality</span>
                      <span className="font-semibold text-blue-600">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water Efficiency</span>
                      <span className="font-semibold text-blue-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crop Health</span>
                      <span className="font-semibold text-blue-600">92%</span>
                    </div>
                  </div>
                </Card>

                {/* Market Insights */}
                <Card className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Market Prices
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Rice</span>
                      <span className="font-semibold text-green-600">₹45/kg ↑</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Wheat</span>
                      <span className="font-semibold text-green-600">₹28/kg ↑</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Corn</span>
                      <span className="font-semibold text-red-600">₹22/kg ↓</span>
                    </div>
                  </div>
                </Card>

                {/* Smart Recommendations */}
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 p-6 rounded-2xl shadow-md">
                  <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                    💡 AI Recommendations
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span className="text-gray-700">Increase nitrogen level by 15%</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span className="text-gray-700">Water 2hrs earlier due to heatwave</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span className="text-gray-700">Scout for spider mites</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-4 mt-28">
            {/* Explore Agriculture Worldwide */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🌍 Explore Agriculture Worldwide</h2>
                <p className="text-gray-600 mb-6">Discover farming practices, crops, and agricultural innovations from around the globe</p>
              </div>

              {/* Featured Regions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Asia - Rice Farming */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-6xl">
                    🌾
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Southeast Asia - Rice Farming</h3>
                    <p className="text-gray-600 mb-4">Explore the world's largest rice producing region with terrace farming techniques and flood irrigation methods.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Terrace Farming Techniques</li>
                      <li>✓ Water Management Systems</li>
                      <li>✓ Crop Rotation Methods</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('asia')} className="w-full bg-green-600 hover:bg-green-700">Learn More</Button>
                  </div>
                </Card>

                {/* Americas - Corn Production */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-6xl">
                    🌽
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">North America - Corn Belt</h3>
                    <p className="text-gray-600 mb-4">Discover advanced mechanized farming, precision agriculture, and genetically improved corn varieties.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Precision Agriculture Tech</li>
                      <li>✓ Mechanized Harvesting</li>
                      <li>✓ Crop Insurance Programs</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('americas')} className="w-full bg-yellow-600 hover:bg-yellow-700">Learn More</Button>
                  </div>
                </Card>

                {/* Europe - Organic Farming */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-6xl">
                    🥕
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Europe - Organic Farming</h3>
                    <p className="text-gray-600 mb-4">Learn about sustainable organic farming practices and certification standards in Europe.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Organic Certification</li>
                      <li>✓ Sustainable Practices</li>
                      <li>✓ Biodiversity Protection</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('europe')} className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button>
                  </div>
                </Card>

                {/* Africa - Climate-Smart Farming */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-6xl">
                    🌱
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Africa - Climate-Smart Farming</h3>
                    <p className="text-gray-600 mb-4">Discover drought-resistant crops, water conservation, and adaptation strategies for arid climates.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Drought Resistance</li>
                      <li>✓ Water Conservation</li>
                      <li>✓ Soil Improvement</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('africa')} className="w-full bg-orange-600 hover:bg-orange-700">Learn More</Button>
                  </div>
                </Card>

                {/* Middle East - Date Palm Farming */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-6xl">
                    🌴
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Middle East - Date Farming</h3>
                    <p className="text-gray-600 mb-4">Explore date palm cultivation and profitable fruit farming in desert conditions.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Desert Farming</li>
                      <li>✓ Irrigation Innovation</li>
                      <li>✓ Value Addition</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('middleeast')} className="w-full bg-amber-600 hover:bg-amber-700">Learn More</Button>
                  </div>
                </Card>

                {/* Australia - Livestock Farming */}
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <div className="relative w-full h-48 bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-6xl">
                    🐑
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Australia - Pastoral Farming</h3>
                    <p className="text-gray-600 mb-4">Learn about large-scale sheep and cattle ranching in expansive grasslands.</p>
                    <ul className="text-sm text-gray-700 space-y-2 mb-4">
                      <li>✓ Large-Scale Ranching</li>
                      <li>✓ Pasture Management</li>
                      <li>✓ Wool Production</li>
                    </ul>
                    <Button onClick={() => setSelectedRegion('australia')} className="w-full bg-red-600 hover:bg-red-700">Learn More</Button>
                  </div>
                </Card>
              </div>

              {/* Global Statistics */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Global Agriculture at a Glance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Total Agricultural Land</p>
                    <p className="text-2xl font-bold text-green-600">5 Billion Hectares</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Global Farmers</p>
                    <p className="text-2xl font-bold text-blue-600">1.3 Billion</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Top Crops by Volume</p>
                    <p className="text-lg font-bold text-orange-600">Maize, Rice, Wheat</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Sustainable Farming %</p>
                    <p className="text-2xl font-bold text-purple-600">23%</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 mt-20">
            <AIAssistant userRole="farmer" />
          </TabsContent>

          <TabsContent value="map" className="space-y-4 mt-28">
            <FarmerMapView onSignOut={onSignOut} />
          </TabsContent>

          <TabsContent value="market" className="space-y-4 mt-28">
            <MarketEnhanced userRole="farmer" />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 mt-28">
            <SmartAlerts onAlertRead={() => setUnreadAlerts(Math.max(0, unreadAlerts - 1))} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-28">
            <FarmerProfile onSignOut={onSignOut} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning Modal */}
      {selectedRegion && regionDetails[selectedRegion] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${regionDetails[selectedRegion].color} text-white p-8 sticky top-0`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{regionDetails[selectedRegion].emoji}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{regionDetails[selectedRegion].title}</h2>
                    <p className="text-sm text-white/90 mt-2">{regionDetails[selectedRegion].description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {regionDetails[selectedRegion].details.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded"></span>
                    {section.section}
                  </h3>
                  <ul className="space-y-3">
                    {section.content.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex gap-3 text-gray-700">
                        <span className="text-green-600 font-bold min-w-fit">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="pt-8 border-t border-gray-200">
                <Button
                  onClick={() => setSelectedRegion(null)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
