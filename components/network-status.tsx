/**
 * Network Status Component - Displays network connectivity status
 * Shows warning for offline, cellular, or unknown network states
 */

'use client';

import { useNetwork } from '@/hooks/useNetwork';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Wifi, Signal, WifiOff } from 'lucide-react';
import { NetworkType } from '@/lib/network-service';

interface NetworkStatusProps {
  showOnlyErrors?: boolean; // Only show on errors/warnings
}

export default function NetworkStatus({ showOnlyErrors = false }: NetworkStatusProps) {
  const network = useNetwork();

  // Don't show if Wi-Fi and showing only errors
  if (showOnlyErrors && network.type === NetworkType.WIFI && network.isConnected) {
    return null;
  }

  // Offline state - Critical
  if (network.type === NetworkType.NONE) {
    return (
      <Card className="border-red-300 bg-red-50 p-4 mb-4 rounded-lg border-2">
        <div className="flex items-start gap-3">
          <WifiOff className="w-6 h-6 text-red-600 flex-shrink-0 mt-1 animate-pulse" />
          <div>
            <h4 className="font-bold text-red-900 mb-1">📵 No Internet Connection</h4>
            <p className="text-sm text-red-800">
              Please connect to Wi-Fi or enable cellular data to continue. Some features may be limited.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Cellular data - Warning
  if (network.type === NetworkType.CELLULAR && network.isConnected) {
    return (
      <Card className="border-orange-300 bg-orange-50 p-4 mb-4 rounded-lg border-2">
        <div className="flex items-start gap-3">
          <Signal className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-orange-900 mb-1">📶 Data Saving Mode Active</h4>
            <p className="text-sm text-orange-800 mb-2">
              You're on cellular data. To save your airtime:
            </p>
            <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
              <li>Low-resolution maps only</li>
              <li>Minimal background data</li>
              <li>Text-only weather updates</li>
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  // Unknown network state
  if (network.type === NetworkType.UNKNOWN) {
    return (
      <Card className="border-yellow-300 bg-yellow-50 p-4 mb-4 rounded-lg border-2">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-yellow-900 mb-1">⚠️ Checking Connection</h4>
            <p className="text-sm text-yellow-800">
              We're checking your connection status. Please wait...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Wi-Fi connected - Show success if not hiding
  if (!showOnlyErrors && network.type === NetworkType.WIFI && network.isConnected) {
    return (
      <Card className="border-green-300 bg-green-50 p-4 mb-4 rounded-lg border-2">
        <div className="flex items-start gap-3">
          <Wifi className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-green-900 mb-1">✅ Wi-Fi Connected</h4>
            <p className="text-sm text-green-800">
              High-quality content is available. All features enabled.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}
