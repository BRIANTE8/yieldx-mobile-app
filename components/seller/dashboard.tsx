'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  MapPin,
  AlertCircle,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  MessageSquare,
  Plus,
} from 'lucide-react';
import MarketplaceListings from '@/components/marketplace/marketplace-listings';
import FarmerMap from '@/components/map/farmer-map';

interface SellerDashboardProps {
  onSignOut: () => void;
  country?: string;
  city?: string;
}

export default function SellerDashboard({ onSignOut, country, city }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  const stats = [
    { label: 'Active Listings', value: '12', change: '+2 this week', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { label: 'Orders Received', value: '24', change: '+5 this week', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Monthly Revenue', value: '₹2.5L', change: '+12% this month', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { label: 'Avg Rating', value: '4.7/5', change: '98 reviews', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const recentOrders = [
    { id: 1, crop: 'Basmati Rice', farmer: 'Raj Kumar', quantity: '50 tons', status: 'Completed', amount: '₹22.5L', date: 'Today' },
    { id: 2, crop: 'Corn', farmer: 'Priya Singh', quantity: '30 tons', status: 'In Transit', amount: '₹9.6L', date: 'Yesterday' },
    { id: 3, crop: 'Wheat', farmer: 'Aman Patel', quantity: '40 tons', status: 'Pending', amount: '₹15.2L', date: '2 days ago' },
  ];

  const demandAlerts = [
    { id: 1, crop: 'Rice', urgency: 'Critical', quantity: '500 tons', price: '₹460/kg', deadline: 'This week' },
    { id: 2, crop: 'Corn', urgency: 'High', quantity: '200 tons', price: '₹330/kg', deadline: '2-3 days' },
    { id: 3, crop: 'Wheat', urgency: 'Medium', quantity: '300 tons', price: '₹390/kg', deadline: '1 week' },
  ];

  return (
    <div className="bg-gradient-to-b from-lime-50/60 via-background to-emerald-50/40 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-lime-700 text-white p-4 sticky top-0 z-40 shadow-lg border-b border-emerald-600/70">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-100 font-semibold mb-1">AgroHub Buyer</p>
            <h1 className="text-2xl font-bold">Welcome, Agro Exports Ltd</h1>
            <p className="text-emerald-100 text-sm">Delhi Market • Verified Buyer</p>
          </div>
          <div className="relative">
            <button className="p-2 hover:bg-emerald-600 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
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
            <TabsTrigger value="listings" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm data-[state=active]:text-emerald-800">
              <Settings className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, idx) => {
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
                    <p className="text-xs text-green-600 font-semibold mt-1">{stat.change}</p>
                  </Card>
                );
              })}
            </div>

            {/* Urgent Demands */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Urgent Crop Demands
              </h3>
              <div className="space-y-3">
                {demandAlerts.map((demand) => (
                  <div
                    key={demand.id}
                    className={`p-4 rounded-lg border-l-4 flex justify-between items-center ${
                      demand.urgency === 'Critical'
                        ? 'bg-red-50 border-l-red-500'
                        : demand.urgency === 'High'
                        ? 'bg-orange-50 border-l-orange-500'
                        : 'bg-yellow-50 border-l-yellow-500'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-gray-900">{demand.crop}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {demand.quantity} • {demand.price}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Deadline: {demand.deadline}</p>
                    </div>
                    <Button className={`${
                      demand.urgency === 'Critical'
                        ? 'bg-red-600 hover:bg-red-700'
                        : demand.urgency === 'High'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    } text-white`}>
                      Find Farmers
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Orders */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Crop</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Farmer</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Quantity</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-3 font-semibold text-gray-900">{order.crop}</td>
                        <td className="py-3 px-3 text-gray-600">{order.farmer}</td>
                        <td className="py-3 px-3 text-gray-600">{order.quantity}</td>
                        <td className="py-3 px-3 font-bold text-green-600">{order.amount}</td>
                        <td className="py-3 px-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            <MarketplaceListings userRole="seller" />
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-4">
            <FarmerMap />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Orders</h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Card key={order.id} className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{order.crop}</h4>
                        <p className="text-sm text-gray-600 mt-1">From: {order.farmer}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold text-white ${
                        order.status === 'Completed' ? 'bg-green-600' :
                        order.status === 'In Transit' ? 'bg-blue-600' :
                        'bg-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-200 bg-gray-50 p-2 rounded mb-3">
                      <div>
                        <p className="text-xs text-gray-600">Quantity</p>
                        <p className="font-bold text-gray-900">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Amount</p>
                        <p className="font-bold text-green-600">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Date</p>
                        <p className="font-bold text-gray-900">{order.date}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Farmer
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Sales Trends</h4>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-end justify-around px-4 py-4">
                  {[40, 60, 80, 55, 90, 75, 85].map((height, idx) => (
                    <div
                      key={idx}
                      className="flex-1 mx-1 bg-blue-500 rounded-t"
                      style={{ height: `${(height / 100) * 200}px` }}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center mt-3">Sales (Last 7 days)</p>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Top Crops Sold</h4>
                <div className="space-y-3">
                  {[
                    { crop: 'Rice', percentage: 45 },
                    { crop: 'Wheat', percentage: 30 },
                    { crop: 'Corn', percentage: 15 },
                    { crop: 'Cotton', percentage: 10 },
                  ].map((item) => (
                    <div key={item.crop}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{item.crop}</span>
                        <span className="text-sm font-bold text-blue-600">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-4">Monthly Revenue</h4>
              <div className="space-y-3">
                {[
                  { month: 'January', amount: '₹1.8L' },
                  { month: 'February', amount: '₹2.1L' },
                  { month: 'March', amount: '₹2.5L' },
                  { month: 'April (Current)', amount: '₹1.9L' },
                ].map((item) => (
                  <div key={item.month} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-900">{item.month}</span>
                    <span className="text-lg font-bold text-green-600">{item.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Agro Exports Ltd</h2>
                  <p className="text-gray-600 mt-1">Premium Buyer • Verified since 2020</p>
                </div>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold">⭐ 4.8/5</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Location</p>
                  <p className="font-bold text-gray-900">Delhi Market</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                  <p className="font-bold text-gray-900">245</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-2">
                Edit Profile
              </Button>
              <Button
                onClick={onSignOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
