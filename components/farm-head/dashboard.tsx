'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Briefcase,
  TrendingUp,
  MapPin,
  AlertCircle,
  Settings,
  LogOut,
  BarChart3,
  Target,
  Shield,
  Zap,
} from 'lucide-react';

interface FarmHeadDashboardProps {
  onSignOut: () => void;
  country?: string;
  city?: string;
}

export default function FarmHeadDashboard({ onSignOut, country, city }: FarmHeadDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  const farmStats = [
    { label: 'Total Farms', value: '8', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Farmers', value: '156', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Annual Revenue', value: '₹45L', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'Avg Rating', value: '4.6/5', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const farms = [
    { id: 1, name: 'Green Valley Farm', location: 'Delhi', farmers: 25, crops: 'Rice, Wheat', status: 'Active', yield: '85%' },
    { id: 2, name: 'Golden Harvest Farm', location: 'Punjab', farmers: 32, crops: 'Wheat, Corn', status: 'Active', yield: '92%' },
    { id: 3, name: 'Rural Excellence', location: 'Haryana', farmers: 18, crops: 'Cotton, Sugarcane', status: 'Active', yield: '78%' },
    { id: 4, name: 'Future Farms', location: 'UP', farmers: 21, crops: 'Rice, Soybean', status: 'Active', yield: '88%' },
    { id: 5, name: 'Organic Valley', location: 'MP', farmers: 12, crops: 'Organic crops', status: 'Active', yield: '75%' },
  ];

  const teamMembers = [
    { id: 1, name: 'Raj Kumar', role: 'Senior Farm Manager', status: 'Active', lastSeen: 'Today' },
    { id: 2, name: 'Priya Singh', role: 'Agricultural Specialist', status: 'Active', lastSeen: 'Today' },
    { id: 3, name: 'Aman Patel', role: 'Operations Manager', status: 'Active', lastSeen: '2 hours ago' },
    { id: 4, name: 'Neha Sharma', role: 'Marketing Head', status: 'Offline', lastSeen: 'Yesterday' },
  ];

  const recentActivities = [
    { id: 1, type: 'Harvest Complete', farm: 'Green Valley Farm', details: '500 tons rice harvested', time: '2 hours ago', color: 'bg-green-50 border-l-green-500' },
    { id: 2, type: 'Pest Alert', farm: 'Golden Harvest Farm', details: 'Fall armyworm detected', time: '4 hours ago', color: 'bg-orange-50 border-l-orange-500' },
    { id: 3, type: 'Sales Transaction', farm: 'Rural Excellence', details: '₹12L transaction completed', time: '6 hours ago', color: 'bg-blue-50 border-l-blue-500' },
    { id: 4, type: 'Equipment Update', farm: 'Future Farms', details: 'New irrigation system installed', time: 'Yesterday', color: 'bg-purple-50 border-l-purple-500' },
  ];

  const performanceMetrics = [
    { metric: 'Crop Yield', value: '85.6%', status: 'Excellent', trend: '+5% from last month' },
    { metric: 'Farmer Satisfaction', value: '92%', status: 'Excellent', trend: '+3% from last month' },
    { metric: 'Production Efficiency', value: '88%', status: 'Very Good', trend: '+2% from last month' },
    { metric: 'Market Competitiveness', value: '79%', status: 'Good', trend: '+4% from last month' },
  ];

  return (
    <div className="bg-gradient-to-b from-lime-50/60 via-background to-emerald-50/40 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-lime-700 text-white p-4 sticky top-0 z-40 shadow-lg border-b border-emerald-700/70">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-100 font-semibold mb-1">AgroHub Management</p>
            <h1 className="text-2xl font-bold">Farm Management Dashboard</h1>
            <p className="text-emerald-100 text-sm">Organization Head • 8 Farms • 156 Farmers</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 mb-6 sticky top-16 z-40 bg-white/90 backdrop-blur border border-emerald-100 shadow-sm">
            <TabsTrigger value="home" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="farms" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Briefcase className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Farms</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Shield className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Settings className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {farmStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Performance Overview */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {performanceMetrics.map((pm, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1">{pm.metric}</p>
                    <p className="text-2xl font-bold text-purple-600">{pm.value}</p>
                    <p className="text-xs text-green-600 font-semibold mt-2">{pm.trend}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border-l-4 ${activity.color}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{activity.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{activity.farm}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{activity.details}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-6 bg-orange-50 border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Action Required
              </h3>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>✓ Weather alert: Heavy rainfall expected in Golden Harvest Farm region</li>
                <li>✓ Pest detected in Rural Excellence Farm - Treatment plan needed</li>
                <li>✓ Two team members pending approval for additional farm assignments</li>
              </ul>
            </Card>
          </TabsContent>

          {/* Farms Tab */}
          <TabsContent value="farms" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Farms</h2>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Add New Farm
              </Button>
            </div>

            <div className="space-y-3">
              {farms.map((farm) => (
                <Card key={farm.id} className="p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        {farm.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {farm.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      farm.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {farm.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200 bg-gray-50 p-3 rounded mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Farmers</p>
                      <p className="font-bold text-gray-900">{farm.farmers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Crops</p>
                      <p className="font-bold text-gray-900 text-sm">{farm.crops}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Yield</p>
                      <p className="font-bold text-green-600">{farm.yield}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-sm">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm">
                      Edit Farm
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Team Management</h2>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-4 flex items-center justify-between hover:shadow-md transition">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500 mt-1">Last seen: {member.lastSeen}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      member.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {member.status}
                    </span>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Revenue Trend</h4>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-end justify-around px-4 py-4">
                  {[30, 50, 45, 70, 85, 92, 88].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 mx-1 bg-purple-500 rounded-t"
                      style={{ height: `${(height / 100) * 200}px` }}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center mt-3">Revenue (Last 7 months)</p>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Farm Production Share</h4>
                <div className="space-y-3">
                  {[
                    { farm: 'Green Valley', percentage: 25 },
                    { farm: 'Golden Harvest', percentage: 35 },
                    { farm: 'Rural Excellence', percentage: 20 },
                    { farm: 'Future Farms', percentage: 15 },
                    { farm: 'Organic Valley', percentage: 5 },
                  ].map((item) => (
                    <div key={item.farm}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{item.farm}</span>
                        <span className="text-sm font-bold text-purple-600">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${item.percentage * 4}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-4">Crop Production Analytics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { crop: 'Rice', tons: '1,200', value: '₹54L' },
                  { crop: 'Wheat', tons: '950', value: '₹36L' },
                  { crop: 'Corn', tons: '780', value: '₹25L' },
                  { crop: 'Cotton', tons: '450', value: '₹22L' },
                  { crop: 'Sugarcane', tons: '2,100', value: '₹32L' },
                  { crop: 'Soybean', tons: '320', value: '₹14L' },
                ].map((crop) => (
                  <div key={crop.crop} className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{crop.crop}</p>
                    <p className="text-lg font-bold text-purple-600">{crop.tons} tons</p>
                    <p className="text-sm text-gray-600 mt-1">{crop.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">Compliance Status</h3>
              <p className="text-sm text-blue-800">All farms are in compliance with local and national agricultural standards.</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-bold text-gray-900 mb-3">Safety Certifications</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    ISO 9001:2015
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Organic Certification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Food Safety Standards
                  </li>
                </ul>
              </Card>

              <Card className="p-4">
                <h4 className="font-bold text-gray-900 mb-3">Environmental Compliance</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Water Management Act
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Pesticide Regulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                    Carbon Footprint Tracking (In Progress)
                  </li>
                </ul>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-4">Compliance Documents</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📄 View Certifications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📄 View Inspection Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📄 Download Compliance Summary
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organization Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="Green Agricultural Organization"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="admin@greenagri.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Save Changes
                </Button>
              </div>
            </Card>

            <Button
              onClick={onSignOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
