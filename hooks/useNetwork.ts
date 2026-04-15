/**
 * useNetwork Hook - Monitor network state in real-time
 * Provides network connectivity status and recommendations
 */

import { useEffect, useState } from 'react';
import {
  checkNetworkState,
  NetworkType,
  NetworkState,
  getNetworkQuality,
} from '@/lib/network-service';

interface UseNetworkReturn extends NetworkState {
  downloadHighRes: boolean;
  dataSavingMode: boolean;
  qualityMessage: string;
}

export function useNetwork(): UseNetworkReturn {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    type: NetworkType.UNKNOWN,
    isInternetReachable: true,
  });

  const [dataMode, setDataMode] = useState({
    downloadHighRes: false,
    dataSavingMode: false,
  });

  // Update network state periodically and on connection change
  useEffect(() => {
    // Initial check
    const updateNetworkState = async () => {
      const state = await checkNetworkState();
      setNetworkState(state);

      const quality = await getNetworkQuality();
      setDataMode({
        downloadHighRes: quality.downloadHighRes,
        dataSavingMode: quality.dataSavingMode,
      });
    };

    updateNetworkState();

    // Listen for browser online/offline events
    const handleOnline = () => updateNetworkState();
    const handleOffline = () => updateNetworkState();
    const handleConnectionChange = () => updateNetworkState();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Listen for connection type changes
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Check network state every 10 seconds as fallback
    const interval = setInterval(updateNetworkState, 10000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
      clearInterval(interval);
    };
  }, []);

  // Generate quality message
  const getQualityMessage = () => {
    if (!networkState.isConnected) {
      return 'No Internet Connection';
    }
    if (networkState.type === NetworkType.WIFI) {
      return 'Wi-Fi Connected - Full Quality Available';
    }
    if (networkState.type === NetworkType.CELLULAR) {
      return 'Cellular Data - Data Saving Mode Active';
    }
    if (networkState.type === NetworkType.UNKNOWN) {
      return 'Connected - Full Quality Available';
    }
    return 'Checking your connection...';
  };

  return {
    ...networkState,
    downloadHighRes: dataMode.downloadHighRes,
    dataSavingMode: dataMode.dataSavingMode,
    qualityMessage: getQualityMessage(),
  };
}

