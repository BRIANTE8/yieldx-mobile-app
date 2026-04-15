'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Search,
  Star,
  MapPin,
  Calendar,
  Truck,
  AlertCircle,
  Plus,
  Filter,
} from 'lucide-react';

interface MarketplaceListingsProps {
  userRole: 'farmer' | 'seller' | 'farm-head';
}

export default function MarketplaceListings({ userRole }: MarketplaceListingsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<{type: string, message: string} | null>(null);

  const handleAddToCart = (crop: any) => {
    const existingItem = cartItems.find(item => item.id === crop.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === crop.id ? {...item, quantity: item.quantity + quantity} : item
      ));
    } else {
      setCartItems([...cartItems, {...crop, quantity}]);
    }
    setNotification({type: 'success', message: `✓ ${crop.crop} added to cart!`});
    setTimeout(() => setNotification(null), 2000);
  };

  const handleDetails = (crop: any) => {
    setSelectedCrop(crop);
    setShowDetailsModal(true);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedCrop(null);
  };

  const cropListings = [
    { id: 1, crop: 'Premium Basmati Rice', seller: 'Green Valley Farms', rating: 4.8, reviews: 245, price: '₹450/kg', quantity: '500 tons', location: 'Delhi NCR', harvest: 'Ready', delivery: '3-5 days', quality: 'Grade A', image: '🌾', category: 'cereals', urgency: 'high' },
    { id: 2, crop: 'Organic Corn', seller: 'Organic Harvest Co', rating: 4.6, reviews: 182, price: '₹320/kg', quantity: '300 tons', location: 'Punjab', harvest: 'Ready', delivery: '2-4 days', quality: 'Certified Organic', image: '🌽', category: 'cereals', urgency: 'medium' },
    { id: 3, crop: 'Winter Wheat', seller: 'Golden Grain Farms', rating: 4.7, reviews: 198, price: '₹380/kg', quantity: '400 tons', location: 'Haryana', harvest: '1-2 weeks', delivery: '5-7 days', quality: 'Premium', image: '🌾', category: 'cereals', urgency: 'low' },
    { id: 4, crop: 'Sugarcane', seller: 'Sweet Harvest Ltd', rating: 4.5, reviews: 156, price: '₹650/ton', quantity: '250 tons', location: 'Uttar Pradesh', harvest: 'Ready', delivery: 'Same day', quality: 'Fresh', image: '🍃', category: 'cash-crops', urgency: 'critical' },
    { id: 5, crop: 'Cotton', seller: 'White Gold Farms', rating: 4.9, reviews: 267, price: '₹5500/quintal', quantity: '150 tons', location: 'Gujarat', harvest: 'Ready', delivery: '4-6 days', quality: 'Grade A', image: '☁️', category: 'cash-crops', urgency: 'high' },
    { id: 6, crop: 'Soybean', seller: 'AgriPro Farms', rating: 4.4, reviews: 124, price: '₹4500/quintal', quantity: '200 tons', location: 'Madhya Pradesh', harvest: '2-3 weeks', delivery: '6-8 days', quality: 'Standard', image: '🫘', category: 'pulses', urgency: 'low' },
    { id: 7, crop: 'Chickpea (Gram)', seller: 'Pulse King', rating: 4.6, reviews: 167, price: '₹5200/quintal', quantity: '180 tons', location: 'Rajasthan', harvest: 'Ready', delivery: '3-4 days', quality: 'Grade A', image: '🫘', category: 'pulses', urgency: 'high' },
    { id: 8, crop: 'Lentil (Masoor)', seller: 'Harvest Pulse', rating: 4.5, reviews: 134, price: '₹6800/quintal', quantity: '120 tons', location: 'Bihar', harvest: 'Ready', delivery: '4-5 days', quality: 'Premium', image: '🫘', category: 'pulses', urgency: 'medium' },
    { id: 9, crop: 'Kidney Beans', seller: 'Bean Fresh', rating: 4.3, reviews: 89, price: '₹4800/quintal', quantity: '95 tons', location: 'Himachal Pradesh', harvest: '1-2 weeks', delivery: '5-6 days', quality: 'Organic', image: '🫘', category: 'pulses', urgency: 'low' },
    { id: 10, crop: 'Tomato (Fresh)', seller: 'Fresh Farms', rating: 4.7, reviews: 312, price: '₹2000/crate', quantity: '500 crates', location: 'Karnataka', harvest: 'Fresh Daily', delivery: '1-2 days', quality: 'Grade A', image: '🍅', category: 'vegetables', urgency: 'high' },
    { id: 11, crop: 'Onion', seller: 'Golden Onion Co', rating: 4.6, reviews: 245, price: '₹1800/bag', quantity: '400 bags', location: 'Maharashtra', harvest: 'Ready', delivery: '2-3 days', quality: 'Premium', image: '🧅', category: 'vegetables', urgency: 'medium' },
    { id: 12, crop: 'Potato', seller: 'Earth Fresh', rating: 4.8, reviews: 289, price: '₹2200/bag', quantity: '600 bags', location: 'Punjab', harvest: 'Fresh Stock', delivery: '1-2 days', quality: 'Grade A', image: '🥔', category: 'vegetables', urgency: 'high' },
    { id: 13, crop: 'Cabbage', seller: 'Green Leaf Farms', rating: 4.5, reviews: 167, price: '₹1200/crate', quantity: '300 crates', location: 'Himachal Pradesh', harvest: 'Fresh', delivery: '2-3 days', quality: 'Organic', image: '🥬', category: 'vegetables', urgency: 'low' },
    { id: 14, crop: 'Bell Pepper (Mixed)', seller: 'Color Farm', rating: 4.6, reviews: 198, price: '₹3500/crate', quantity: '250 crates', location: 'Telangana', harvest: 'Fresh Daily', delivery: '2-3 days', quality: 'Grade A', image: '🫑', category: 'vegetables', urgency: 'high' },
    { id: 15, crop: 'Brinjal (Eggplant)', seller: 'Garden Fresh', rating: 4.4, reviews: 143, price: '₹2000/crate', quantity: '200 crates', location: 'Tamil Nadu', harvest: 'Fresh', delivery: '2-4 days', quality: 'Standard', image: '🍆', category: 'vegetables', urgency: 'medium' },
    { id: 16, crop: 'Mango (Alphonso)', seller: 'Mango Paradise', rating: 4.9, reviews: 356, price: '₹8000/crate', quantity: '300 crates', location: 'Maharashtra', harvest: 'Season Ready', delivery: '2-3 days', quality: 'Premium', image: '🥭', category: 'fruits', urgency: 'critical' },
    { id: 17, crop: 'Banana (Fresh)', seller: 'Banana Valley', rating: 4.7, reviews: 267, price: '₹2500/bundle', quantity: '400 bundles', location: 'Karnataka', harvest: 'Fresh Daily', delivery: '1-2 days', quality: 'Grade A', image: '🍌', category: 'fruits', urgency: 'high' },
    { id: 18, crop: 'Apple (Kashmiri)', seller: 'Valley Orchards', rating: 4.8, reviews: 298, price: '₹6500/crate', quantity: '250 crates', location: 'Jammu & Kashmir', harvest: 'Fresh Stock', delivery: '3-4 days', quality: 'Premium', image: '🍎', category: 'fruits', urgency: 'high' },
    { id: 19, crop: 'Papaya (Sweet)', seller: 'Tropical Farms', rating: 4.5, reviews: 156, price: '₹2200/crate', quantity: '200 crates', location: 'Andhra Pradesh', harvest: 'Fresh', delivery: '2-3 days', quality: 'Grade A', image: '🧡', category: 'fruits', urgency: 'medium' },
    { id: 20, crop: 'Groundnut (Peanut)', seller: 'Nut Valley', rating: 4.6, reviews: 189, price: '₹5800/quintal', quantity: '180 tons', location: 'Gujarat', harvest: 'Ready', delivery: '4-5 days', quality: 'Grade A', image: '🥜', category: 'oilseeds', urgency: 'high' },
    { id: 21, crop: 'Sunflower Seeds', seller: 'Oil Gold', rating: 4.5, reviews: 145, price: '₹4900/quintal', quantity: '150 tons', location: 'Karnataka', harvest: 'Ready', delivery: '3-4 days', quality: 'Premium', image: '🌻', category: 'oilseeds', urgency: 'medium' },
    { id: 22, crop: 'Mustard Seeds', seller: 'Golden Oil', rating: 4.7, reviews: 213, price: '₹5400/quintal', quantity: '200 tons', location: 'Rajasthan', harvest: 'Ready', delivery: '3-5 days', quality: 'Grade A', image: '🌾', category: 'oilseeds', urgency: 'high' },
    { id: 23, crop: 'Black Pepper', seller: 'Spice King', rating: 4.8, reviews: 267, price: '₹45000/kg', quantity: '5 tons', location: 'Kerala', harvest: 'Fresh', delivery: '5-7 days', quality: 'Premium', image: '🫑', category: 'spices', urgency: 'low' },
    { id: 24, crop: 'Turmeric Powder', seller: 'Golden Spice', rating: 4.7, reviews: 234, price: '₹8500/kg', quantity: '8 tons', location: 'Telangana', harvest: 'Fresh', delivery: '4-6 days', quality: 'Pure', image: '✨', category: 'spices', urgency: 'medium' },
  ];

  const demandListings = [
    {
      id: 101,
      buyer: 'Agro Exports Ltd',
      cropNeeded: 'Rice (Basmati)',
      quantity: '500 tons',
      priceOffered: '₹460/kg',
      urgency: 'Critical',
      deadline: 'This week',
      location: 'Delhi',
      contact: '+91 11-2000-0000',
    },
    {
      id: 102,
      buyer: 'Harvest Foods',
      cropNeeded: 'Corn',
      quantity: '200 tons',
      priceOffered: '₹330/kg',
      urgency: 'High',
      deadline: '2-3 days',
      location: 'Noida',
      contact: '+91 11-2000-1111',
    },
    {
      id: 103,
      buyer: 'Fresh Produce Hub',
      cropNeeded: 'Wheat',
      quantity: '300 tons',
      priceOffered: '₹390/kg',
      urgency: 'Medium',
      deadline: '1 week',
      location: 'West Delhi',
      contact: '+91 11-2000-2222',
    },
  ];

  const filteredListings = cropListings.filter((listing) =>
    listing.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header with Action Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {userRole === 'farmer' ? 'Buy from Sellers' : userRole === 'seller' ? 'Sell Your Crops' : 'Manage Marketplace'}
        </h2>
        {userRole === 'farmer' && (
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <ShoppingCart className="w-4 h-4 mr-2" />
            My Cart
          </Button>
        )}
        {userRole === 'seller' && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            List New Crop
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={userRole === 'farmer' ? 'Search crops to buy...' : 'Search demand...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Category Filter (for farmers) */}
        {userRole === 'farmer' && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'cereals', 'vegetables', 'spices', 'cash-crops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Crops' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Tabs for Farmer view */}
      {userRole === 'farmer' && (
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white">
            Available Crops
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
            My Orders
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
            Wishlist
          </button>
        </div>
      )}

      {/* Crop Listings (for Farmers) */}
      {userRole === 'farmer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className={`p-4 hover:shadow-lg transition cursor-pointer border-l-4 ${
                listing.urgency === 'critical'
                  ? 'border-l-red-500'
                  : listing.urgency === 'high'
                  ? 'border-l-orange-500'
                  : 'border-l-green-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{listing.image}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{listing.crop}</h3>
                    <p className="text-xs text-gray-600">{listing.seller}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {listing.rating} ({listing.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                {listing.urgency === 'critical' && (
                  <div className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-semibold">
                    URGENT
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm mb-4 py-3 border-y border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity Available:</span>
                  <span className="font-semibold text-gray-900">{listing.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-green-600 text-lg">{listing.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-semibold text-gray-900">{listing.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {listing.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harvest Status:</span>
                  <span className="font-semibold text-green-600">{listing.harvest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> {listing.delivery}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleAddToCart(listing)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <Button 
                  onClick={() => handleDetails(listing)}
                  variant="outline" 
                  className="flex-1 font-bold hover:bg-blue-50"
                >
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Seller Dashboard View */}
      {userRole === 'seller' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card className="p-4 text-center bg-blue-50 border-blue-100">
              <p className="text-sm text-blue-600 mb-1">Active Listings</p>
              <p className="text-2xl font-bold text-blue-700">12</p>
            </Card>
            <Card className="p-4 text-center bg-green-50 border-green-100">
              <p className="text-sm text-green-600 mb-1">Orders Received</p>
              <p className="text-2xl font-bold text-green-700">24</p>
            </Card>
            <Card className="p-4 text-center bg-purple-50 border-purple-100">
              <p className="text-sm text-purple-600 mb-1">Revenue (Month)</p>
              <p className="text-2xl font-bold text-purple-700">₹2.5L</p>
            </Card>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-4">Urgent Buyer Demands</h3>
          <div className="space-y-3">
            {demandListings.map((demand) => (
              <Card
                key={demand.id}
                className={`p-4 border-l-4 hover:shadow-md transition ${
                  demand.urgency === 'Critical'
                    ? 'bg-red-50 border-red-500'
                    : demand.urgency === 'High'
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{demand.buyer}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {demand.location}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      demand.urgency === 'Critical'
                        ? 'bg-red-600 text-white'
                        : demand.urgency === 'High'
                        ? 'bg-orange-600 text-white'
                        : 'bg-yellow-600 text-white'
                    }`}
                  >
                    {demand.urgency}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4 py-3 border-y border-gray-200 bg-white/50 p-2 rounded">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Needs:</span>
                    <span className="font-bold text-gray-900">{demand.cropNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold text-gray-900">{demand.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Offered:</span>
                    <span className="font-bold text-green-600">{demand.priceOffered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {demand.deadline}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Contact & Negotiate
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg text-white font-bold shadow-lg animate-pulse ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✕
              </button>

              {/* Title & Image */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">{selectedCrop.image}</div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCrop.crop}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-semibold text-gray-700">{selectedCrop.rating}</span>
                    <span className="text-gray-600">({selectedCrop.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700"><strong>Seller:</strong> {selectedCrop.seller}</p>
                <p className="text-gray-700"><strong>Location:</strong> {selectedCrop.location}</p>
                <p className="text-gray-700"><strong>Quality:</strong> {selectedCrop.quality}</p>
              </div>

              {/* Pricing & Availability */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Price</p>
                  <p className="text-2xl font-bold text-green-600">{selectedCrop.price}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Quantity</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCrop.quantity}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Harvest Status</p>
                  <p className="text-lg font-bold text-amber-600">{selectedCrop.harvest}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm font-medium">Delivery</p>
                  <p className="text-lg font-bold text-purple-600">{selectedCrop.delivery}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-green-600">✓</span> <strong>Premium Quality</strong> - Grade A certified produce</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> <strong>Fresh Stock</strong> - Daily harvest assurance</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> <strong>Fast Delivery</strong> - {selectedCrop.delivery} days guaranteed</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> <strong>Quality Assurance</strong> - Third party tested</li>
                  <li className="flex gap-2"><span className="text-green-600">✓</span> <strong>Insurance Covered</strong> - Free transit insurance</li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">Order Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-bold text-lg"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="border-2 border-gray-300 rounded px-4 py-2 w-20 text-center font-bold"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-bold text-lg"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-auto"><strong>Unit:</strong> kg/crate/bundle as per listing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    handleAddToCart(selectedCrop);
                    handleCloseModal();
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 rounded-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart (Qty: {quantity})
                </Button>
                <Button 
                  onClick={handleCloseModal}
                  variant="outline"
                  className="flex-1 text-lg font-bold py-3 rounded-lg"
                >
                  Close
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                By adding to cart, you accept our terms. Payment will be processed securely.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
