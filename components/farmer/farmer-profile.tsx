'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Settings,
  LogOut,
  Lock,
  Bell,
  Eye,
  Shield,
  Download,
  Trash2,
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';

interface FarmerProfileProps {
  onSignOut: () => void;
}

export default function FarmerProfile({ onSignOut }: FarmerProfileProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'security' | 'settings'>('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [locationShareEnabled, setLocationShareEnabled] = useState(true);
  const [dataShareEnabled, setDataShareEnabled] = useState(false);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'privacy', label: 'Privacy', icon: Eye },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          {/* Profile Header */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                RK
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Raj Kumar</h2>
                <p className="text-gray-600 mb-3">Certified Farmer • 15 years experience</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    ⭐ Rating: 4.8/5
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Edit Profile
            </Button>
          </Card>

          {/* Farm Details */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Farm Details</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Farm Name</p>
                <p className="text-lg font-semibold text-gray-900">Green Valley Crops</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Farm Size</p>
                  <p className="text-lg font-semibold text-gray-900">50 acres</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Primary Crops</p>
                  <p className="text-lg font-semibold text-gray-900">Rice, Wheat</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-lg font-semibold text-gray-900">Delhi NCR • 28.7041°N, 77.1025°E</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">raj.kumar@yieldx.com</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements & Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Your Achievements
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">156</p>
                <p className="text-xs text-gray-600 mt-1">Successful Sales</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">₹8.5L</p>
                <p className="text-xs text-gray-600 mt-1">Total Revenue</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">95%</p>
                <p className="text-xs text-gray-600 mt-1">Satisfaction</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-4">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Your Privacy Matters</h3>
            <p className="text-sm text-blue-800">
              Control how your data is used and who can see your information.
            </p>
          </Card>

          {/* Location Visibility */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">Location Visibility</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Allow other farmers and buyers to see your farm location on the map
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={locationShareEnabled}
                  onChange={(e) => setLocationShareEnabled(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>
            {locationShareEnabled && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Show location as:
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="location" defaultChecked className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Exact coordinates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="location" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Village/Town level</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="location" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">District level</span>
                  </label>
                </div>
              </div>
            )}
          </Card>

          {/* Contact Information Privacy */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Contact Information</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Control who can see your phone number and email
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="contact" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Everyone</p>
                  <p className="text-xs text-gray-600">All users can see your contact info</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="contact" className="w-4 h-4" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Verified Users Only</p>
                  <p className="text-xs text-gray-600">Only verified buyers</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="radio" name="contact" className="w-4 h-4" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Private</p>
                  <p className="text-xs text-gray-600">Contact only through app messaging</p>
                </div>
              </label>
            </div>
          </Card>

          {/* Data Usage */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">Data Usage & Analytics</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Help us improve by sharing anonymized farm data
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={dataShareEnabled}
                  onChange={(e) => setDataShareEnabled(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>
            <p className="text-xs text-gray-600">
              ✓ Your identity is never shared. Only crop types, weather patterns, and market trends are anonymized.
            </p>
          </Card>

          {/* Data Download */}
          <Card className="p-6 bg-gray-50 border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Your Data
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              Get a copy of all your personal data in a portable format
            </p>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Data
            </Button>
          </Card>

          {/* Delete Account */}
          <Card className="p-6 bg-red-50 border-red-200">
            <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete Account
            </h4>
            <p className="text-sm text-red-800 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Delete Account Permanently
            </Button>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          {/* Password */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Update Password
              </Button>
            </div>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="p-6 border-blue-200 bg-blue-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Two-Factor Authentication (2FA)
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>

            {twoFactorEnabled && (
              <div className="bg-white p-4 rounded-lg border border-blue-200 space-y-3">
                <p className="text-sm text-gray-700">
                  ✓ 2FA is enabled. You&apos;ll need to enter a code from your authenticator app when signing in.
                </p>
                <Button variant="outline" className="w-full">
                  Manage 2FA
                </Button>
              </div>
            )}
          </Card>

          {/* Active Sessions */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Active Sessions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Current Device</p>
                  <p className="text-xs text-gray-600">Chrome on Windows • Last active now</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Mobile Device</p>
                  <p className="text-xs text-gray-600">Safari on iPhone • Last active 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  Sign Out
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Sign Out All Devices
            </Button>
          </Card>

          {/* Login Activity */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Recent Login Activity</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">✓ Signed in • Today at 9:30 AM • Chrome, Windows, Delhi</p>
              <p className="text-gray-700">✓ Signed in • Yesterday at 2:15 PM • Safari, iPhone, Delhi</p>
              <p className="text-gray-700">✓ Signed in • 2 days ago at 11:45 AM • Chrome, Windows, Delhi</p>
            </div>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Notifications */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Weather Alerts', desc: 'Get alerts about rainfall, temperature, etc.' },
                { label: 'Pest & Disease Alerts', desc: 'Notifications about pest outbreaks' },
                { label: 'Market Price Updates', desc: 'Daily crop price movements' },
                { label: 'Buyer Demands', desc: 'New urgent crop demands from sellers' },
                { label: 'AI Assistant Tips', desc: 'Personalized farming recommendations' },
                { label: 'Community News', desc: 'Updates from farming community' },
              ].map((notif) => (
                <label
                  key={notif.label}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{notif.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{notif.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </label>
              ))}
            </div>
          </Card>

          {/* Language & Region */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Language & Region</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Punjabi</option>
                  <option>Marathi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Indian Rupee (₹)</option>
                  <option>US Dollar ($)</option>
                  <option>Euro (€)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Offline Mode */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Offline Mode</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Sync important data for offline access
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1">
                Sync Now
              </Button>
              <Button variant="outline" className="flex-1">
                Clear Offline Data
              </Button>
            </div>
          </Card>

          {/* Support & Feedback */}
          <Card className="p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Help & Support
            </h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📞 Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📚 Help Center & FAQs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                💬 Send Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📋 Terms & Privacy Policy
              </Button>
            </div>
          </Card>

          {/* Logout */}
          <Button
            onClick={onSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
