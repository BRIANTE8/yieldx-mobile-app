'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Cloud,
  Bug,
  TrendingUp,
  Zap,
  MessageCircle,
  Trash2,
  Check,
  Bell,
} from 'lucide-react';

interface SmartAlertsProps {
  onAlertRead?: () => void;
}

export default function SmartAlerts({ onAlertRead }: SmartAlertsProps) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'weather',
      severity: 'critical',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall (40-50mm) expected in your region in the next 24 hours. Ensure proper drainage and delay pesticide applications.',
      icon: Cloud,
      time: '2 hours ago',
      read: false,
      action: 'Prepare Drainage',
    },
    {
      id: 2,
      type: 'pest',
      severity: 'high',
      title: 'Pest Outbreak Warning',
      message: 'Fall armyworm detected in farms near your location. Take preventive measures immediately.',
      icon: Bug,
      time: '4 hours ago',
      read: false,
      action: 'Get Treatment Plan',
    },
    {
      id: 3,
      type: 'market',
      severity: 'medium',
      title: 'Market Opportunity',
      message: 'Price of Rice increased by 8% in the last 24 hours. Consider selling if you have mature crops.',
      icon: TrendingUp,
      time: '6 hours ago',
      read: false,
      action: 'View Market Trends',
    },
    {
      id: 4,
      type: 'urgent-buyer',
      severity: 'critical',
      title: '🔴 URGENT: Buyer Needs Rice',
      message: 'Agro Exports Ltd needs 500 tons of Basmati Rice urgently. Offering ₹460/kg. Limited time offer!',
      icon: Zap,
      time: '1 hour ago',
      read: false,
      action: 'Sell Now',
    },
    {
      id: 5,
      type: 'community',
      severity: 'low',
      title: 'Expert Tips from Your Region',
      message: 'Local farming expert shared tips on maximizing crop yield during this season.',
      icon: MessageCircle,
      time: '8 hours ago',
      read: true,
      action: 'Read Tips',
    },
    {
      id: 6,
      type: 'irrigation',
      severity: 'medium',
      title: 'Water Level Status',
      message: 'Water table in your area has dropped 20cm. Plan irrigation accordingly.',
      icon: Zap,
      time: '12 hours ago',
      read: true,
      action: 'View Details',
    },
    {
      id: 7,
      type: 'weather',
      severity: 'low',
      title: 'Temperature Drop',
      message: 'Temperatures will drop by 5-6 degrees in the next 2 days. Not harmful for current crops.',
      icon: Cloud,
      time: 'Yesterday',
      read: true,
      action: 'Dismiss',
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)));
    onAlertRead?.();
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const unreadCount = alerts.filter((a) => !a.read).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 border-l-4 border-l-red-500';
      case 'high':
        return 'bg-orange-50 border-orange-200 border-l-4 border-l-orange-500';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500';
      default:
        return 'bg-green-50 border-green-200 border-l-4 border-l-green-500';
    }
  };

  const getActionButtonColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 hover:bg-red-700';
      case 'high':
        return 'bg-orange-600 hover:bg-orange-700';
      case 'medium':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-green-600 hover:bg-green-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <Card className="p-3 text-center bg-red-50 border-red-100">
          <p className="text-xs text-red-600 mb-1">Critical</p>
          <p className="text-2xl font-bold text-red-700">
            {alerts.filter((a) => a.severity === 'critical').length}
          </p>
        </Card>
        <Card className="p-3 text-center bg-orange-50 border-orange-100">
          <p className="text-xs text-orange-600 mb-1">High</p>
          <p className="text-2xl font-bold text-orange-700">
            {alerts.filter((a) => a.severity === 'high').length}
          </p>
        </Card>
        <Card className="p-3 text-center bg-yellow-50 border-yellow-100">
          <p className="text-xs text-yellow-600 mb-1">Medium</p>
          <p className="text-2xl font-bold text-yellow-700">
            {alerts.filter((a) => a.severity === 'medium').length}
          </p>
        </Card>
        <Card className="p-3 text-center bg-blue-50 border-blue-100">
          <p className="text-xs text-blue-600 mb-1">Unread</p>
          <p className="text-2xl font-bold text-blue-700">{unreadCount}</p>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'unread', 'critical', 'weather', 'pest', 'market'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {filter === 'all'
              ? 'All Alerts'
              : filter === 'unread'
              ? 'Unread'
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <Card className="p-8 text-center border-gray-200">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-semibold mb-1">No alerts</p>
            <p className="text-sm text-gray-500">You&apos;re all caught up!</p>
          </Card>
        ) : (
          alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <Card
                key={alert.id}
                className={`p-4 transition cursor-pointer ${getSeverityColor(alert.severity)} ${
                  !alert.read ? 'shadow-md' : 'opacity-80'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      alert.severity === 'critical'
                        ? 'bg-red-200'
                        : alert.severity === 'high'
                        ? 'bg-orange-200'
                        : alert.severity === 'medium'
                        ? 'bg-yellow-200'
                        : 'bg-green-200'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        alert.severity === 'critical'
                          ? 'text-red-600'
                          : alert.severity === 'high'
                          ? 'text-orange-600'
                          : alert.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          {alert.title}
                          {!alert.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        alert.severity === 'critical'
                          ? 'bg-red-600 text-white'
                          : alert.severity === 'high'
                          ? 'bg-orange-600 text-white'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{alert.message}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        className={`text-white text-sm ${getActionButtonColor(alert.severity)}`}
                      >
                        {alert.action}
                      </Button>
                      {!alert.read && (
                        <Button
                          onClick={() => handleMarkAsRead(alert.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteAlert(alert.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
