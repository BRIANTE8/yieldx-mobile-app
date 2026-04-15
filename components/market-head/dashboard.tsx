'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  TrendingUp,
  MapPin,
  ShoppingCart,
  AlertCircle,
  User,
  LogOut,
  Bell,
  Search,
  Plus,
  Loader,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  Settings,
  MessageSquare,
  Package,
  Filter,
  Download,
  Phone,
  Mail,
} from 'lucide-react';

interface MarketHeadDashboardProps {
  onSignOut: () => void;
  country: string;
  city: string;
}

export default function MarketHeadDashboard({ onSignOut, country, city }: MarketHeadDashboardProps) {
  const [activeTab, setActiveTab] = useState('crops');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [bookedCrops, setBookedCrops] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  // Available crops from farmers in the selected city
  const availableCrops = [
    {
      id: 1,
      crop: 'Premium Basmati Rice',
      farmer: 'Raj Kumar',
      farmerId: 'F001',
      quantity: 500,
      unit: 'kg',
      pricePerUnit: '₹450',
      totalPrice: '₹225,000',
      quality: 'Grade A',
      harvest: 'Ready',
      delivery: '2-3 days',
      location: city,
      image: '🌾',
      rating: 4.8,
      reviews: 156,
      contact: '+91 98765 43210',
    },
    {
      id: 2,
      crop: 'Onion (Premium)',
      farmer: 'Priya Singh',
      farmerId: 'F002',
      quantity: 800,
      unit: 'bags',
      pricePerUnit: '₹1800',
      totalPrice: '₹1,440,000',
      quality: 'Premium Grade',
      harvest: 'Ready',
      delivery: '1-2 days',
      location: city,
      image: '🧅',
      rating: 4.6,
      reviews: 234,
      contact: '+91 99876 54321',
    },
    {
      id: 3,
      crop: 'Potato (Fresh)',
      farmer: 'Aman Patel',
      farmerId: 'F003',
      quantity: 1200,
      unit: 'bags',
      pricePerUnit: '₹2200',
      totalPrice: '₹2,640,000',
      quality: 'Grade A',
      harvest: 'Fresh Stock',
      delivery: '1-2 days',
      location: city,
      image: '🥔',
      rating: 4.8,
      reviews: 289,
      contact: '+91 97654 32109',
    },
    {
      id: 4,
      crop: 'Tomato (Fresh)',
      farmer: 'Meera Sharma',
      farmerId: 'F004',
      quantity: 500,
      unit: 'crates',
      pricePerUnit: '₹2000',
      totalPrice: '₹1,000,000',
      quality: 'Grade A',
      harvest: 'Fresh Daily',
      delivery: '1-2 days',
      location: city,
      image: '🍅',
      rating: 4.7,
      reviews: 312,
      contact: '+91 88765 43210',
    },
    {
      id: 5,
      crop: 'Wheat',
      farmer: 'Vikram Singh',
      farmerId: 'F005',
      quantity: 400,
      unit: 'tons',
      pricePerUnit: '₹380',
      totalPrice: '₹152,000',
      quality: 'Premium',
      harvest: 'Ready',
      delivery: '3-5 days',
      location: city,
      image: '🌾',
      rating: 4.7,
      reviews: 198,
      contact: '+91 78765 43210',
    },
    {
      id: 6,
      crop: 'Bell Pepper (Mixed)',
      farmer: 'Neha Gupta',
      farmerId: 'F006',
      quantity: 300,
      unit: 'crates',
      pricePerUnit: '₹3500',
      totalPrice: '₹1,050,000',
      quality: 'Grade A',
      harvest: 'Fresh Daily',
      delivery: '2-3 days',
      location: city,
      image: '🫑',
      rating: 4.6,
      reviews: 198,
      contact: '+91 68765 43210',
    },
  ];

  // Orders tracking
  const orders = [
    {
      id: 'ORD001',
      crop: 'Basmati Rice',
      farmer: 'Raj Kumar',
      quantity: 250,
      unit: 'kg',
      totalPrice: '₹112,500',
      status: 'Delivered',
      orderedDate: '2024-03-28',
      deliveredDate: '2024-03-30',
      image: '🌾',
    },
    {
      id: 'ORD002',
      crop: 'Onion',
      farmer: 'Priya Singh',
      quantity: 400,
      unit: 'bags',
      totalPrice: '₹720,000',
      status: 'In Transit',
      orderedDate: '2024-04-10',
      expectedDate: '2024-04-13',
      image: '🧅',
    },
    {
      id: 'ORD003',
      crop: 'Potato',
      farmer: 'Aman Patel',
      quantity: 600,
      unit: 'bags',
      totalPrice: '₹1,320,000',
      status: 'Processing',
      orderedDate: '2024-04-12',
      expectedDate: '2024-04-15',
      image: '🥔',
    },
  ];

  const handleBookCrop = (crop: any, quantity: number) => {
    const newBooking = {
      id: Date.now(),
      ...crop,
      bookedQuantity: quantity,
      bookingDate: new Date().toLocaleDateString(),
      status: 'Pending Confirmation',
    };
    setBookedCrops([...bookedCrops, newBooking]);
    alert(`Booking request sent to ${crop.farmer}!`);
  };

  return (
    <div className="bg-gradient-to-b from-lime-50/70 via-background to-emerald-50/40 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-lime-700 text-white sticky top-0 z-40 shadow-xl border-b border-emerald-700/70">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-100 font-semibold mb-1">AgroHub Market Ops</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">🏬 Market Head Dashboard</h1>
              <div className="flex items-center gap-3 mt-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-semibold">{city}, {country}</span>
              </div>
              <p className="text-emerald-100 text-sm mt-1">Manage crops, bookings & market operations</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition relative">
                <Bell className="w-6 h-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button onClick={onSignOut} className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 border border-white border-opacity-30">
              <p className="text-blue-100 text-xs font-semibold">Available Crops</p>
              <p className="text-2xl font-bold text-white mt-1">{availableCrops.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 border border-white border-opacity-30">
              <p className="text-blue-100 text-xs font-semibold">Active Orders</p>
              <p className="text-2xl font-bold text-white mt-1">{orders.filter(o => o.status !== 'Delivered').length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 border border-white border-opacity-30">
              <p className="text-blue-100 text-xs font-semibold">This Month Sales</p>
              <p className="text-2xl font-bold text-white mt-1">₹45L</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 border border-white border-opacity-30">
              <p className="text-blue-100 text-xs font-semibold">Farmer Partners</p>
              <p className="text-2xl font-bold text-white mt-1">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 mb-8 sticky top-24 z-30 bg-white/90 backdrop-blur shadow-lg rounded-xl p-2 border border-emerald-100">
            <TabsTrigger value="crops" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span>Available Crops</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <Zap className="w-5 h-5 mr-2" />
              <span>Urgent Needs</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <Package className="w-5 h-5 mr-2" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <BarChart3 className="w-5 h-5 mr-2" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-sm font-bold py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <User className="w-5 h-5 mr-2" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* AVAILABLE CROPS TAB */}
          <TabsContent value="crops" className="space-y-6 mt-6">
            <Card className="p-6 bg-white border-2 border-green-200">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search crops by name or farmer..."
                    className="pl-12 h-12 border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 font-bold h-12">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              {availableCrops.map((crop) => (
                <Card key={crop.id} className="p-6 hover:shadow-xl transition border-l-4 border-green-500 bg-gradient-to-r from-white to-green-50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* Crop Image & Name */}
                    <div className="flex items-center gap-4">
                      <span className="text-6xl">{crop.image}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{crop.crop}</h3>
                        <p className="text-sm text-gray-600">By {crop.farmer}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          <span className="text-xs text-gray-600 ml-1">({crop.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-600 mb-1">QUANTITY</p>
                      <p className="text-2xl font-bold text-blue-600">{crop.quantity} {crop.unit}</p>
                      <p className="text-xs text-gray-600 mt-2">Quality: {crop.quality}</p>
                    </div>

                    {/* Price */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-600 mb-1">PRICE PER UNIT</p>
                      <p className="text-xl font-bold text-green-600">{crop.pricePerUnit}</p>
                      <p className="text-xs text-gray-600 mt-2">Total: {crop.totalPrice}</p>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-600 mb-1">DELIVERY</p>
                      <p className="text-sm font-semibold text-gray-900">{crop.delivery}</p>
                      <p className="text-xs text-gray-600 mt-2">Status: {crop.harvest}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleBookCrop(crop, crop.quantity)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold h-12 rounded-lg"
                      >
                        📌 Book Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold h-10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* URGENT NEEDS TAB */}
          <TabsContent value="requests" className="space-y-6 mt-6">
            <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📢 Request Crops Urgently</h2>
              <p className="text-gray-700 mb-6">Send urgent crop requests to farmers in {city}. They'll see your demand and respond with their available stock.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Crop Type</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold">
                    <option>Select Crop...</option>
                    <option>Rice</option>
                    <option>Wheat</option>
                    <option>Onion</option>
                    <option>Potato</option>
                    <option>Tomato</option>
                    <option>Vegetables</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Quantity Needed</label>
                  <Input type="number" placeholder="Enter quantity" className="border-2 border-gray-300 h-11 font-semibold" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold">
                    <option>kg</option>
                    <option>bags</option>
                    <option>tons</option>
                    <option>crates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Urgency Level</label>
                  <select className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold">
                    <option>Medium - 1 Week</option>
                    <option>High - 3 Days</option>
                    <option>Critical - 24 Hours</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                  <textarea placeholder="Quality preferences, specifications, etc." className="w-full p-3 border-2 border-gray-300 rounded-lg font-semibold h-24"></textarea>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold h-12 text-lg rounded-lg">
                🔥 Send Urgent Request
              </Button>
            </Card>

            {/* Past Requests */}
            <Card className="p-6 bg-white border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Your Requests</h3>
              <div className="space-y-3">
                {[
                  { crop: 'Rice', quantity: 500, status: 'Responses: 3 farmers', date: '2 days ago' },
                  { crop: 'Onion', quantity: 200, status: 'Responses: 5 farmers', date: '5 days ago' },
                ].map((req, idx) => (
                  <Card key={idx} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{req.crop} - {req.quantity} units</p>
                        <p className="text-sm text-gray-600">{req.status} • {req.date}</p>
                      </div>
                      <Button variant="outline" className="border-blue-600 text-blue-600">View Responses</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* MY BOOKINGS TAB */}
          <TabsContent value="bookings" className="space-y-6 mt-6">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Your Bookings</h2>
              <p className="text-gray-700 mb-6">Track all your crop bookings and their confirmation status</p>
            </Card>

            {bookedCrops.length === 0 ? (
              <Card className="p-12 bg-white border-2 border-dashed border-gray-300 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-semibold">No bookings yet</p>
                <p className="text-gray-500 text-sm mt-2">Book crops from the "Available Crops" tab to see them here</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookedCrops.map((booking) => (
                  <Card key={booking.id} className="p-6 border-l-4 border-purple-500 bg-gradient-to-r from-white to-purple-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{booking.image}</span>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{booking.crop}</h4>
                          <p className="text-sm text-gray-600">From: {booking.farmer}</p>
                        </div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-bold">
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white rounded p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 font-semibold">QUANTITY</p>
                        <p className="text-lg font-bold text-gray-900">{booking.bookedQuantity} {booking.unit}</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 font-semibold">TOTAL PRICE</p>
                        <p className="text-lg font-bold text-green-600">{booking.totalPrice}</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-gray-200">
                        <p className="text-xs text-gray-600 font-semibold">BOOKED ON</p>
                        <p className="text-lg font-bold text-gray-900">{booking.bookingDate}</p>
                      </div>
                      <div className="flex gap-2 items-end">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders" className="space-y-6 mt-6">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Order Tracking</h2>
              <p className="text-gray-700">Monitor all your orders and deliveries in real-time</p>
            </Card>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className={`p-6 border-l-4 ${
                  order.status === 'Delivered' ? 'border-green-500 bg-gradient-to-r from-white to-green-50' :
                  order.status === 'In Transit' ? 'border-blue-500 bg-gradient-to-r from-white to-blue-50' :
                  'border-yellow-500 bg-gradient-to-r from-white to-yellow-50'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{order.image}</span>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{order.crop}</h4>
                        <p className="text-sm text-gray-600">Order: {order.id}</p>
                        <p className="text-sm text-gray-600">From: {order.farmer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.status === 'Delivered' && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {order.status === 'In Transit' && <Loader className="w-6 h-6 text-blue-600 animate-spin" />}
                      {order.status === 'Processing' && <Clock className="w-6 h-6 text-yellow-600" />}
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">QUANTITY</p>
                      <p className="text-lg font-bold text-gray-900">{order.quantity} {order.unit}</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">TOTAL PRICE</p>
                      <p className="text-lg font-bold text-green-600">{order.totalPrice}</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">ORDERED</p>
                      <p className="text-sm font-bold text-gray-900">{order.orderedDate}</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold">EXPECTED</p>
                      <p className="text-sm font-bold text-gray-900">{order.deliveredDate || order.expectedDate}</p>
                    </div>
                    <div className="flex gap-2 items-end">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold">Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl">
                <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs text-gray-600 font-bold mb-2">TOTAL ORDERS</p>
                <p className="text-3xl font-bold text-blue-700">156</p>
                <p className="text-xs text-gray-600 mt-2">↑ 12% from last month</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-xs text-gray-600 font-bold mb-2">TOTAL REVENUE</p>
                <p className="text-3xl font-bold text-green-700">₹85.5L</p>
                <p className="text-xs text-gray-600 mt-2">↑ 8% from last month</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl">
                <Package className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-xs text-gray-600 font-bold mb-2">ACTIVE BOOKINGS</p>
                <p className="text-3xl font-bold text-purple-700">28</p>
                <p className="text-xs text-gray-600 mt-2">Pending confirmation</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl">
                <User className="w-8 h-8 text-orange-600 mb-2" />
                <p className="text-xs text-gray-600 font-bold mb-2">FARMER PARTNERS</p>
                <p className="text-3xl font-bold text-orange-700">24</p>
                <p className="text-xs text-gray-600 mt-2">in {city}</p>
              </Card>
            </div>

            <Card className="p-6 bg-white border-2 border-gray-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Sales Performance</h3>
              <div className="space-y-4">
                {[
                  { crop: 'Rice', orders: 45, revenue: '₹32L' },
                  { crop: 'Vegetables', orders: 38, revenue: '₹28.5L' },
                  { crop: 'Wheat', orders: 32, revenue: '₹18L' },
                  { crop: 'Pulses', orders: 28, revenue: '₹22L' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-900">{item.crop}</span>
                      <span className="text-lg font-bold text-green-600">{item.revenue}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${(item.orders / 50) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{item.orders} orders</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border-2 border-gray-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌐 Market Insights</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Most Demanded', value: 'Rice' },
                  { label: 'Best Price', value: 'Wheat' },
                  { label: 'Peak Orders', value: 'Apr-May' },
                  { label: 'Avg Order Size', value: '250 kg' },
                  { label: 'Customer Rating', value: '4.7/5.0' },
                  { label: 'Delivery Rate', value: '98%' },
                ].map((insight, idx) => (
                  <Card key={idx} className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 rounded-lg">
                    <p className="text-xs text-gray-600 font-bold mb-1">{insight.label}</p>
                    <p className="text-xl font-bold text-indigo-700">{insight.value}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 Market Head Profile</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Section */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
                      🏪
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Market Head Name</h3>
                    <p className="text-sm text-gray-600 mt-1">Premium Market Manager</p>
                  </div>

                  <div className="space-y-3 border-t-2 border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-600 font-bold mb-1">MARKET NAME</p>
                      <p className="font-semibold text-gray-900">Central Produce Market</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-bold mb-1">LOCATION</p>
                      <p className="font-semibold text-gray-900">{city}, {country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-bold mb-1">EXPERIENCE</p>
                      <p className="font-semibold text-gray-900">8 years in agriculture</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">📞 Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-600 font-bold">PHONE</p>
                        <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-600 font-bold">WHATSAPP</p>
                        <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-600 font-bold">EMAIL</p>
                        <p className="text-sm font-semibold text-gray-900">markethead@example.com</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold h-11 rounded-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Market Statistics */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">📈 Market Statistics</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 font-bold mb-1">RATING</p>
                      <p className="text-2xl font-bold text-green-700">4.8/5.0</p>
                      <p className="text-xs text-gray-600 mt-1">Based on 342 reviews</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold mb-1">ACTIVE FARMERS</p>
                      <p className="text-2xl font-bold text-blue-700">24</p>
                      <p className="text-xs text-gray-600 mt-1">Regular suppliers</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                      <p className="text-xs text-gray-600 font-bold mb-1">AVG MONTHLY TURNOVER</p>
                      <p className="text-2xl font-bold text-orange-700">₹85.5L</p>
                      <p className="text-xs text-gray-600 mt-1">Commission: 8%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">🎯 Verification Status</h4>
                <div className="space-y-2">
                  {[
                    { item: 'Identity Verified', verified: true },
                    { item: 'Market License', verified: true },
                    { item: 'Bank Account', verified: true },
                    { item: 'Business Registration', verified: false },
                  ].map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-semibold text-gray-900">{check.item}</span>
                      {check.verified ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
