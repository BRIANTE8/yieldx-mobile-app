'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Phone,
  MessageCircle,
  Send,
  Eye,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Star,
  MapPin,
  Truck,
  ShoppingCart,
  Plus,
  Bell,
  Users,
  TrendingUp,
} from 'lucide-react';

interface MarketEnhancedProps {
  userRole: 'farmer' | 'seller' | 'farm-head';
}

type ModalType = 'add-harvest' | 'edit-harvest' | 'sell-market-heads' | 'inquiries' | 'contact-sell' | null;

export default function MarketEnhanced({ userRole }: MarketEnhancedProps) {
  const [activeTab, setActiveTab] = useState<'crops' | 'inventory' | 'market-heads' | 'orders'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedMarketHead, setSelectedMarketHead] = useState<any>(null);
  const [saleForm, setSaleForm] = useState({
    quantityToSell: '',
    pricePerUnit: '',
    deliveryDate: ''
  });
  const [editFormData, setEditFormData] = useState({
    crop: '',
    quantity: '',
    unit: '',
    price: ''
  });
  const [addHarvestForm, setAddHarvestForm] = useState({
    crop: '',
    quantity: '',
    unit: 'kg',
    price: ''
  });
  const [farmerInventory, setFarmerInventory] = useState([
    { id: 1, crop: 'Basmati Rice', quantity: 500, unit: 'kg', price: '₹450/kg', lastUpdated: 'Today', image: '🌾' },
    { id: 2, crop: 'Wheat', quantity: 300, unit: 'kg', price: '₹380/kg', lastUpdated: '2 days ago', image: '🌾' },
    { id: 3, crop: 'Onion', quantity: 200, unit: 'bags', price: '₹1800/bag', lastUpdated: '1 day ago', image: '🧅' },
  ]);
  const [showNotifications, setShowNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'booking', message: 'Market Head "Fresh Produce Hub" booked 250kg of Onion', time: '2 hours ago', isNew: true },
    { id: 2, type: 'inquiry', message: '"Premium Foods" inquired about your Basmati Rice stock', time: '4 hours ago', isNew: true },
  ]);

  // Inquiries Data
  const inquiriesData = [
    { id: 1, buyer: 'Red Foods Pvt Ltd', contact: '+91 98765 43210', email: 'sales@redfoods.com', quantity: '250 kg', priceOffered: '₹460/kg', date: '2 hours ago', status: 'Pending' },
    { id: 2, buyer: 'Golden Traders', contact: '+91 99876 54321', email: 'inquiry@goldentraders.com', quantity: '150 kg', priceOffered: '₹455/kg', date: '5 hours ago', status: 'Waiting for response' },
    { id: 3, buyer: 'Fresh Market Hub', contact: '+91 97654 32109', email: 'purchase@freshmarket.com', quantity: '100 kg', priceOffered: '₹468/kg', date: '1 day ago', status: 'Accepted' },
  ];

  // Market Heads Data with enhanced information
  const marketHeads = [
    {
      id: 1,
      name: 'Rajesh Patel',
      marketName: 'Fresh Produce Hub',
      location: 'Delhi Central Market',
      contact: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      crops: ['Rice', 'Wheat', 'Vegetables', 'Fruits'],
      needs: ['Onion', 'Potato', 'Tomato'],
      lacks: ['Organic Vegetables', 'Dairy Products'],
      rating: 4.8,
      reviews: 156,
      buyingVolume: '100 tons/month',
      experience: '15 years',
      image: '👨‍💼',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      marketName: 'Golden Market Trading',
      location: 'Delhi INA Market',
      contact: '+91 99876 54321',
      whatsapp: '+91 99876 54321',
      crops: ['All vegetables', 'Pulses', 'Cereals'],
      needs: ['Green Leaf', 'Cabbage', 'Corn'],
      lacks: ['Exotic Vegetables', 'Spices'],
      rating: 4.9,
      reviews: 234,
      buyingVolume: '150 tons/month',
      experience: '12 years',
      image: '👩‍💼',
    },
    {
      id: 3,
      name: 'Amit Kumar',
      marketName: 'Wholesale Grains Corp',
      location: 'Delhi Azadpur Market',
      contact: '+91 97654 32109',
      whatsapp: '+91 97654 32109',
      crops: ['Rice', 'Wheat', 'Corn', 'Pulses'],
      needs: ['Quality Rice', 'Basmati Variety', 'Lentils'],
      lacks: ['Spicy Varieties', 'Organic Grains'],
      rating: 4.7,
      reviews: 198,
      buyingVolume: '200 tons/month',
      experience: '18 years',
      image: '👨‍💼',
    },
  ];

  // Comprehensive crop listings with real images
  const cropListings = [
    { id: 1, crop: 'Premium Basmati Rice', seller: 'Green Valley Farms', rating: 4.8, reviews: 245, price: '₹450/kg', quantity: '500 tons', location: 'Delhi NCR', harvest: 'Ready', delivery: '3-5 days', quality: 'Grade A', image: '🌾', category: 'cereals' },
    { id: 2, crop: 'Organic Corn', seller: 'Organic Harvest Co', rating: 4.6, reviews: 182, price: '₹320/kg', quantity: '300 tons', location: 'Punjab', harvest: 'Ready', delivery: '2-4 days', quality: 'Certified Organic', image: '🌽', category: 'cereals' },
    { id: 3, crop: 'Onion (Premium)', seller: 'Golden Onion Co', rating: 4.6, reviews: 245, price: '₹1800/bag', quantity: '400 bags', location: 'Maharashtra', harvest: 'Ready', delivery: '2-3 days', quality: 'Premium', image: '🧅', category: 'vegetables' },
    { id: 4, crop: 'Potato (Fresh)', seller: 'Earth Fresh', rating: 4.8, reviews: 289, price: '₹2200/bag', quantity: '600 bags', location: 'Punjab', harvest: 'Fresh Stock', delivery: '1-2 days', quality: 'Grade A', image: '🥔', category: 'vegetables' },
    { id: 5, crop: 'Tomato (Fresh)', seller: 'Fresh Farms', rating: 4.7, reviews: 312, price: '₹2000/crate', quantity: '500 crates', location: 'Karnataka', harvest: 'Fresh Daily', delivery: '1-2 days', quality: 'Grade A', image: '🍅', category: 'vegetables' },
    { id: 6, crop: 'Bell Pepper', seller: 'Color Farm', rating: 4.6, reviews: 198, price: '₹3500/crate', quantity: '250 crates', location: 'Telangana', harvest: 'Fresh Daily', delivery: '2-3 days', quality: 'Grade A', image: '🫑', category: 'vegetables' },
    { id: 7, crop: 'Wheat (Winter)', seller: 'Golden Grain Farms', rating: 4.7, reviews: 198, price: '₹380/kg', quantity: '400 tons', location: 'Haryana', harvest: '1-2 weeks', delivery: '5-7 days', quality: 'Premium', image: '🌾', category: 'cereals' },
    { id: 8, crop: 'Sugarcane', seller: 'Sweet Harvest Ltd', rating: 4.5, reviews: 156, price: '₹650/ton', quantity: '250 tons', location: 'Uttar Pradesh', harvest: 'Ready', delivery: 'Same day', quality: 'Fresh', image: '🍃', category: 'cash-crops' },
  ];

  const handleAddToCart = (crop: any) => {
    const existingItem = cartItems.find(item => item.id === crop.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === crop.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCartItems([...cartItems, {...crop, quantity: 1}]);
    }
  };

  const handleAddInventory = () => {
    setAddHarvestForm({ crop: '', quantity: '', unit: 'kg', price: '' });
    setActiveModal('add-harvest');
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setEditFormData({
      crop: item.crop,
      quantity: item.quantity.toString(),
      unit: item.unit,
      price: item.price
    });
    setActiveModal('edit-harvest');
  };

  const handleSaveEdit = () => {
    setFarmerInventory(farmerInventory.map(item =>
      item.id === selectedItem.id
        ? {
            ...item,
            crop: editFormData.crop,
            quantity: parseInt(editFormData.quantity),
            unit: editFormData.unit,
            price: editFormData.price,
            lastUpdated: 'Today'
          }
        : item
    ));
    setActiveModal(null);
  };

  const handleAddNewHarvest = () => {
    const newHarvest = {
      id: farmerInventory.length + 1,
      crop: addHarvestForm.crop,
      quantity: parseInt(addHarvestForm.quantity),
      unit: addHarvestForm.unit,
      price: `₹${addHarvestForm.price}/${addHarvestForm.unit}`,
      lastUpdated: 'Today',
      image: '🌾'
    };
    setFarmerInventory([...farmerInventory, newHarvest]);
    setActiveModal(null);
    setAddHarvestForm({ crop: '', quantity: '', unit: 'kg', price: '' });
  };

  const handleSellToMarketHeads = (item: any) => {
    setSelectedItem(item);
    setActiveModal('sell-market-heads');
  };

  const handleViewInquiries = (item: any) => {
    setSelectedItem(item);
    setActiveModal('inquiries');
  };

  const handleContactMarketHead = (marketHead: any) => {
    setSelectedMarketHead(marketHead);
    setSaleForm({ quantityToSell: '', pricePerUnit: '', deliveryDate: '' });
    setActiveModal('contact-sell');
  };

  const handleConfirmSale = () => {
    alert(`✅ Sale Confirmed!\n\n📦 ${selectedItem?.crop}\n📊 Quantity: ${saleForm.quantityToSell} ${selectedItem?.unit}\n💰 Total: ₹${(parseInt(saleForm.quantityToSell) * parseInt(saleForm.pricePerUnit)).toLocaleString()}\n📍 Buyer: ${selectedMarketHead?.marketName}\n📞 ${selectedMarketHead?.contact}\n\nThe buyer will contact you shortly to confirm delivery details.`);
    setActiveModal(null);
    setSaleForm({ quantityToSell: '', pricePerUnit: '', deliveryDate: '' });
  };

  return (
    <div className="space-y-4">
      {/* Header with Tab Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">🛍️ Market</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {userRole === 'farmer' ? (
          <>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === 'inventory'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Inventory
            </button>
            <button
              onClick={() => setActiveTab('market-heads')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === 'market-heads'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Market Heads
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Orders & Bookings
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Orders
            </button>
          </>
        )}
      </div>

      {/* INVENTORY TAB - Farmer's Harvest */}
      {activeTab === 'inventory' && userRole === 'farmer' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Your Harvest & Stock</h3>
            <Button 
              onClick={handleAddInventory}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Harvest
            </Button>
          </div>

          {farmerInventory.map((item) => (
            <Card key={item.id} className="p-4 border-green-200 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{item.image}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{item.crop}</h4>
                    <p className="text-sm text-gray-600">Updated {item.lastUpdated}</p>
                  </div>
                </div>
                <Button onClick={() => handleEditItem(item)} variant="outline" className="text-sm">Edit</Button>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded mb-3 text-center">
                <div>
                  <p className="text-xs text-gray-600">Quantity</p>
                  <p className="font-bold text-lg text-gray-900">{item.quantity} {item.unit}</p>
                </div>
                <div className="border-l border-r border-gray-200">
                  <p className="text-xs text-gray-600">Price/Unit</p>
                  <p className="font-bold text-lg text-green-600">{item.price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Est. Value</p>
                  <p className="font-bold text-lg text-blue-600">
                    ₹{Math.floor(item.quantity * parseInt(item.price.split('/')[0].replace('₹', '')))/100}K
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSellToMarketHeads(item)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Sell to Market Heads
                </Button>
                <Button onClick={() => handleViewInquiries(item)} variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Inquiries
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* MARKET HEADS TAB */}
      {activeTab === 'market-heads' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-700">📱 Connect with local market heads to sell your harvest directly at competitive prices</p>
          </div>

          {marketHeads.map((head) => (
            <Card key={head.id} className="p-6 hover:shadow-lg transition border-l-4 border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Left - Name and Basic Info */}
                <div>
                  <p className="text-4xl mb-2">{head.image}</p>
                  <h4 className="font-bold text-gray-900 text-lg">{head.name}</h4>
                  <p className="text-sm text-gray-600 font-semibold">{head.marketName}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{head.rating} ({head.reviews})</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">📍 {head.location}</p>
                  <p className="text-xs text-gray-600">📅 {head.experience} exp.</p>
                </div>

                {/* Middle - Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-1">BUYS</p>
                    <div className="flex flex-wrap gap-1">
                      {head.crops.map((crop) => (
                        <span key={crop} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-1">NEEDS</p>
                    <div className="flex flex-wrap gap-1">
                      {head.needs.map((need) => (
                        <span key={need} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - More Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-1">LACKS</p>
                    <div className="flex flex-wrap gap-1">
                      {head.lacks.map((lack) => (
                        <span key={lack} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                          {lack}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600"><strong>Monthly Volume:</strong> {head.buyingVolume}</p>
                  </div>
                </div>

                {/* Contact - Right */}
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => handleContactMarketHead(head)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button 
                    onClick={() => handleContactMarketHead(head)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Negotiate
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ORDERS & BOOKINGS TAB */}
      {activeTab === 'orders' && userRole === 'farmer' && (
        <div className="space-y-4">
          {showNotifications && notifications.length > 0 && (
            <Card className="p-4 bg-blue-50 border border-blue-200 space-y-3">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Booking Notifications
              </h4>
              {notifications.map((notif) => (
                <div key={notif.id} className="bg-white p-3 rounded border-l-4 border-green-500">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{notif.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{notif.time}</p>
                      </div>
                    </div>
                    {notif.isNew && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>}
                  </div>
                </div>
              ))}
            </Card>
          )}

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📦 Your Bookings</h3>
            <div className="space-y-3">
              {[
                { id: 1, marketHead: 'Fresh Produce Hub', crop: 'Onion', quantity: '250 kg', price: '₹1800/kg', status: 'Booked', date: '2024-04-13' },
                { id: 2, marketHead: 'Golden Market Trading', crop: 'Basmati Rice', quantity: '100 tons', price: '₹450/kg', status: 'Pending', date: '2024-04-12' },
              ].map((booking) => (
                <Card key={booking.id} className="p-4 border-l-4 border-green-500 bg-green-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{booking.crop}</h4>
                      <p className="text-sm text-gray-600">{booking.marketHead}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      booking.status === 'Booked' 
                        ? 'bg-green-600 text-white'
                        : 'bg-yellow-600 text-white'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Quantity:</strong> {booking.quantity} | <strong>Price:</strong> {booking.price}</p>
                    <p className="text-xs text-gray-600">Expected Delivery: {booking.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* MODALS */}

      {/* Add Harvest Modal */}
      {activeModal === 'add-harvest' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Add New Harvest</h2>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Name</label>
                <Input
                  placeholder="e.g., Basmati Rice"
                  value={addHarvestForm.crop}
                  onChange={(e) => setAddHarvestForm({...addHarvestForm, crop: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={addHarvestForm.quantity}
                  onChange={(e) => setAddHarvestForm({...addHarvestForm, quantity: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={addHarvestForm.unit}
                  onChange={(e) => setAddHarvestForm({...addHarvestForm, unit: e.target.value})}
                >
                  <option>kg</option>
                  <option>tons</option>
                  <option>bags</option>
                  <option>crates</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Unit (₹)</label>
                <Input
                  placeholder="e.g., 450"
                  value={addHarvestForm.price}
                  onChange={(e) => setAddHarvestForm({...addHarvestForm, price: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => setActiveModal(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddNewHarvest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Harvest
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Harvest Modal */}
      {activeModal === 'edit-harvest' && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Edit Harvest</h2>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Name</label>
                <Input
                  placeholder="e.g., Basmati Rice"
                  value={editFormData.crop}
                  onChange={(e) => setEditFormData({...editFormData, crop: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <Input
                  type="number"
                  placeholder="e.g., 500"
                  value={editFormData.quantity}
                  onChange={(e) => setEditFormData({...editFormData, quantity: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={editFormData.unit}
                  onChange={(e) => setEditFormData({...editFormData, unit: e.target.value})}
                >
                  <option>kg</option>
                  <option>tons</option>
                  <option>bags</option>
                  <option>crates</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Unit (₹)</label>
                <Input
                  placeholder="e.g., 450"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => setActiveModal(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Sell to Market Heads Modal */}
      {activeModal === 'sell-market-heads' && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sell {selectedItem.crop}</h2>
                <p className="text-gray-600 text-sm mt-1">Available: {selectedItem.quantity} {selectedItem.unit}</p>
              </div>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Available Market Heads</h3>
              {marketHeads.map((head) => (
                <Card key={head.id} className="p-4 border-green-200 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{head.marketName}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {head.location}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {head.rating}/5 ({head.reviews} reviews)
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3 bg-gray-50 p-3 rounded text-sm">
                    <p className="text-gray-700"><strong>Buying Volume:</strong> {head.buyingVolume}</p>
                    <p className="text-gray-700"><strong>Contact:</strong> {head.contact}</p>
                    <p className="text-gray-700"><strong>Needs:</strong> {head.needs.join(', ')}</p>
                  </div>

                  <Button 
                    onClick={() => handleContactMarketHead(head)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact & Sell
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Inquiries Modal */}
      {activeModal === 'inquiries' && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inquiries for {selectedItem.crop}</h2>
                <p className="text-gray-600 text-sm mt-1">{inquiriesData.length} interested buyers</p>
              </div>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-3">
              {inquiriesData.map((inquiry) => (
                <Card key={inquiry.id} className={`p-4 border-l-4 ${
                  inquiry.status === 'Accepted' ? 'border-green-500 bg-green-50' :
                  inquiry.status === 'Pending' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{inquiry.buyer}</h4>
                      <p className="text-sm text-gray-600">Inquiry {inquiry.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${
                      inquiry.status === 'Accepted' ? 'bg-green-600 text-white' :
                      inquiry.status === 'Pending' ? 'bg-yellow-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3 text-sm bg-white/50 p-3 rounded">
                    <p className="text-gray-700"><strong>Contact:</strong> {inquiry.contact}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {inquiry.email}</p>
                    <p className="text-gray-700"><strong>Quantity Needed:</strong> {inquiry.quantity}</p>
                    <p className="text-green-700 font-bold"><strong>Price Offered:</strong> {inquiry.priceOffered}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Contact & Sell Modal */}
      {activeModal === 'contact-sell' && selectedItem && selectedMarketHead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Confirm Sale</h2>
              <button onClick={() => setActiveModal(null)}>
                <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            {/* Market Head Info */}
            <Card className="p-4 bg-green-50 border border-green-200 mb-4">
              <h3 className="font-bold text-gray-900 mb-2">{selectedMarketHead.marketName}</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>📍Location:</strong> {selectedMarketHead.location}</p>
                <p><strong>📞Contact:</strong> {selectedMarketHead.contact}</p>
                <p><strong>⭐Rating:</strong> {selectedMarketHead.rating}/5</p>
              </div>
            </Card>

            {/* Sale Details Form */}
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop: <span className="text-green-600">{selectedItem.crop}</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available: {selectedItem.quantity} {selectedItem.unit}
                </label>
                <Input
                  type="number"
                  placeholder={`Max: ${selectedItem.quantity}`}
                  max={selectedItem.quantity}
                  value={saleForm.quantityToSell}
                  onChange={(e) => setSaleForm({...saleForm, quantityToSell: e.target.value})}
                  className="mb-1"
                />
                <p className="text-xs text-gray-600">Enter quantity you want to sell</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per Unit (₹)
                </label>
                <Input
                  type="number"
                  placeholder={`Current: ${selectedItem.price}`}
                  value={saleForm.pricePerUnit}
                  onChange={(e) => setSaleForm({...saleForm, pricePerUnit: e.target.value})}
                  className="mb-1"
                />
                <p className="text-xs text-gray-600">Suggested: {selectedItem.price}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Date
                </label>
                <Input
                  type="date"
                  value={saleForm.deliveryDate}
                  onChange={(e) => setSaleForm({...saleForm, deliveryDate: e.target.value})}
                />
              </div>

              {/* Total Calculation */}
              {saleForm.quantityToSell && saleForm.pricePerUnit && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Total Value:</strong>
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(parseInt(saleForm.quantityToSell) * parseInt(saleForm.pricePerUnit)).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {saleForm.quantityToSell} {selectedItem.unit} × ₹{saleForm.pricePerUnit} per {selectedItem.unit}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setActiveModal(null)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmSale}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!saleForm.quantityToSell || !saleForm.pricePerUnit || !saleForm.deliveryDate}
              >
                Confirm Sale
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
