/**
 * Offline Fallback Component - Shows user-friendly message when offline
 * Prevents app from crashing due to missing data
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useNetwork } from '@/hooks/useNetwork';
import { Card } from '@/components/ui/card';
import { AlertTriangle, WifiOff, Loader2 } from 'lucide-react';
import { NetworkType } from '@/lib/network-service';

interface OfflineFallbackProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showNetworkStatus?: boolean;
}

export default function OfflineFallback({
  children,
  title = 'Offline Mode',
  description = 'This feature requires an internet connection.',
  showNetworkStatus = true,
}: OfflineFallbackProps) {
  const network = useNetwork();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Give network check a moment to initialize
    const timer = setTimeout(() => setHasChecked(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Still checking network
  if (!hasChecked || network.type === NetworkType.UNKNOWN) {
    return (
      <Card className="border-yellow-300 bg-yellow-50 p-8 rounded-lg border-2">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
          <h3 className="font-bold text-yellow-900">Checking Connection...</h3>
          <p className="text-sm text-yellow-800">
            We're verifying your internet connection.
          </p>
        </div>
      </Card>
    );
  }

  // Offline
  if (network.type === NetworkType.NONE) {
    return (
      <Card className="border-red-300 bg-red-50 p-8 rounded-lg border-2">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <WifiOff className="w-8 h-8 text-red-600" />
          <h3 className="font-bold text-red-900">{title}</h3>
          <p className="text-sm text-red-800">{description}</p>
          <div className="mt-4 text-xs text-red-700 bg-red-100 p-3 rounded">
            💡 Tip: Connect to Wi-Fi or enable cellular data to access this feature.
          </div>
        </div>
      </Card>
    );
  }

  // Online - Show content
  return <>{children}</>;
}

/**
 * Component wrapper for features that need internet
 * Only shows content if connected
 */
interface RequiresInternetProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequiresInternet({ children, fallback }: RequiresInternetProps) {
  const network = useNetwork();

  if (network.type === NetworkType.NONE) {
    return (
      fallback || (
        <div className="text-center py-8 text-gray-600">
          Please check your internet connection
        </div>
      )
    );
  }

  return <>{children}</>;
}
