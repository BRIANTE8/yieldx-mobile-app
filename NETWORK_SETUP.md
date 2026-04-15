## 📡 Network Detection System - Quick Setup Guide

A complete network-aware solution for your farmer mobile app. Automatically detects Wi-Fi vs Cellular and handles offline gracefully.

---

## 🚀 Installation (5 minutes)

### Step 1: Install expo-network

```bash
# For Expo projects
npx expo install expo-network

# Or npm/yarn
npm install expo-network
```

### Step 2: Verify Files Are Created

Check that these files exist in your project:

```
✅ lib/network-service.ts
✅ lib/network-config.ts
✅ lib/map-image-service.ts
✅ lib/weather-optimization.ts
✅ hooks/useNetwork.ts
✅ components/network-status.tsx
✅ components/offline-fallback.tsx
```

---

## ⚡ Quick Start (Choose One)

### Option A: Simple Network Detection in a Component

```tsx
import { useNetwork } from '@/hooks/useNetwork';

export function MyScreen() {
  const network = useNetwork();

  return (
    <View>
      <Text>{network.qualityMessage}</Text>
      
      {network.type === 'NONE' && (
        <Text>❌ Please check your connection</Text>
      )}

      {network.dataSavingMode && (
        <Text>📶 Data Saving Mode - Limited features</Text>
      )}
    </View>
  );
}
```

### Option B: Add Network Banner to App

```tsx
import NetworkStatus from '@/components/network-status';

export default function App() {
  return (
    <SafeAreaView>
      <NetworkStatus showOnlyErrors={true} />
      {/* Your app content */}
    </SafeAreaView>
  );
}
```

### Option C: Wrap Feature with Error Handling

```tsx
import OfflineFallback from '@/components/offline-fallback';

export function WeatherScreen() {
  return (
    <OfflineFallback title="Weather Unavailable">
      <YourWeatherComponent />
    </OfflineFallback>
  );
}
```

### Option D: Smart Data Fetching

```tsx
import { getSmartWeatherData } from '@/lib/weather-optimization';
import { useNetwork } from '@/hooks/useNetwork';
import { useState, useEffect } from 'react';

export function WeatherWidget({ latitude, longitude }) {
  const [data, setData] = useState(null);
  const network = useNetwork();

  useEffect(() => {
    getSmartWeatherData(latitude, longitude, {
      dataSavingMode: network.dataSavingMode,
    }).then(setData);
  }, [network.dataSavingMode]);

  if (network.type === 'NONE') {
    return <Text>📵 Please check your connection</Text>;
  }

  return (
    <View>
      {network.dataSavingMode && <Text>📶 Using minimal data</Text>}
      <Text>{data?.data.weather.temperature}°C</Text>
      <Text>{data?.data.weather.condition}</Text>
    </View>
  );
}
```

---

## 📊 Network Detection Behavior

### When Connected to Wi-Fi 🟢
```
✅ Download high-resolution maps
✅ Load full 7-day weather forecast
✅ Update weather every 15 minutes
✅ Show all images at 95% quality
✅ No data limit warnings
```

### When on Cellular Data 🟠
```
📶 Show "Data Saving Mode" message
📶 Download low-resolution maps only
📶 Skip weather forecast (save data)
📶 Update weather every 60 minutes
📶 Show compressed images (60% quality)
💡 Suggest switching to Wi-Fi
```

### When Offline (No Connection) 🔴
```
❌ Show "Please check your connection"
❌ Disable data-fetching features
❌ Show cached/fallback content
❌ No crashes or errors
💡 Suggest enabling Wi-Fi/Cellular
```

---

## 🔧 Configuration

Edit settings in `lib/network-config.ts`:

```typescript
NETWORK_CONFIG = {
  // How often to check network (milliseconds)
  UPDATE_CHECK_INTERVAL: 10 * 1000,
  
  // Weather update intervals
  WEATHER_UPDATE_WIFI: 15 * 60 * 1000,      // 15 min on Wi-Fi
  WEATHER_UPDATE_CELLULAR: 60 * 60 * 1000,  // 60 min on cellular
  
  // Image sizes
  MAP_HIGH_RES_SIZE: '800x600',  // High-res
  MAP_LOW_RES_SIZE: '400x300',   // Low-res
  
  // Image quality (0-1)
  QUALITY_WIFI: 0.95,      // 95% on Wi-Fi
  QUALITY_CELLULAR: 0.6,   // 60% on cellular
  
  // Data limits
  MAX_FORECAST_DAYS_WIFI: 7,      // 7-day forecast on Wi-Fi
  MAX_FORECAST_DAYS_CELLULAR: 0,  // No forecast on cellular
};
```

---

## 🎯 Real-World Examples

### Example 1: Network-Aware Weather Widget

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useNetwork } from '@/hooks/useNetwork';
import { getSmartWeatherData } from '@/lib/weather-optimization';
import OfflineFallback from '@/components/offline-fallback';

export function SmartWeather({ latitude, longitude, city }) {
  const [weather, setWeather] = useState(null);
  const network = useNetwork();

  useEffect(() => {
    getSmartWeatherData(latitude, longitude, {
      dataSavingMode: network.dataSavingMode,
    }).then(setWeather);
  }, [network.dataSavingMode]);

  return (
    <OfflineFallback title="Weather Unavailable">
      <div className="p-4 border rounded">
        {/* Network indicator */}
        {network.dataSavingMode && (
          <div className="mb-3 p-2 bg-orange-100 text-orange-700 rounded text-sm">
            📶 Data Saving Mode - Showing essential info only
          </div>
        )}

        {/* Weather info */}
        {weather?.success && (
          <>
            <h3>{city}: {weather.data.weather.temperature}°C</h3>
            <p>{weather.data.weather.condition}</p>
            
            {/* Only show forecast on Wi-Fi */}
            {!network.dataSavingMode && weather.data.forecast?.length > 0 && (
              <div className="mt-3">
                <strong>7-Day Forecast</strong>
                {weather.data.forecast.map(day => (
                  <div key={day.day}>
                    {day.day}: {day.high}°/{day.low}°
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </OfflineFallback>
  );
}
```

### Example 2: Network-Aware Map

```tsx
import { useState, useEffect } from 'react';
import { getOptimizedMapURL } from '@/lib/map-image-service';
import { useNetwork } from '@/hooks/useNetwork';

export function SmartMap({ latitude, longitude }) {
  const [mapUrl, setMapUrl] = useState('');
  const network = useNetwork();

  useEffect(() => {
    getOptimizedMapURL(latitude, longitude, {
      highRes: network.downloadHighRes,
    }).then(setMapUrl);
  }, [network.downloadHighRes]);

  return (
    <div>
      {network.dataSavingMode && (
        <p className="text-orange-600">📶 Loading low-resolution map</p>
      )}
      {network.type === 'WIFI' && (
        <p className="text-green-600">✅ Loading high-resolution map</p>
      )}
      {mapUrl && <img src={mapUrl} alt="Farm" />}
    </div>
  );
}
```

---

## 📱 Testing Different Network States

### Test Wi-Fi Mode
1. Connect to real Wi-Fi network
2. App shows high-quality content ✅

### Test Cellular Mode
1. Disconnect Wi-Fi
2. Use mobile hotspot or cellular data
3. App shows data-saving UI 📶

### Test Offline Mode
1. Airplane mode ON
2. All connectivity OFF
3. App shows offline message, no crash ❌

### Test Slow Network (Simulator)
1. Xcode: Debug → Slow Network
2. App adapts to slow speeds

---

## 🐛 Debugging

### Check Network State
```tsx
import { checkNetworkState } from '@/lib/network-service';

// In console or component:
const state = await checkNetworkState();
console.log('Network State:', state);
```

### Check Network Quality
```tsx
import { getNetworkQuality } from '@/lib/network-service';

const quality = await getNetworkQuality();
console.log('Quality:', quality);
```

### Monitor Network Changes
```tsx
import * as Network from 'expo-network';

Network.addNetworkStateListener(state => {
  console.log('Network changed:', state);
});
```

---

## ✨ Features Provided

| Feature | Description |
|---------|-------------|
| **Network Detection** | Detects Wi-Fi, Cellular, Offline automatically |
| **Smart Data Loading** | Fetches only essential data on cellular |
| **High-Res Maps** | Full resolution on Wi-Fi, compressed on cellular |
| **Weather Optimization** | Full forecast on Wi-Fi, text-only on cellular |
| **Offline Handling** | Shows friendly message, no crashes |
| **Network Banner** | User-friendly network status indicator |
| **Update Intervals** | Fewer updates on cellular to save data |
| **Image Compression** | 95% quality on Wi-Fi, 60% on cellular |
| **Auto Retry** | Retries failed requests 3 times |
| **Caching** | Supports offline-first architecture |

---

## 🚨 Error Handling Scenarios

✅ **No Network**
- Shows "Please check your connection"
- Blocks data-fetching features
- No crashes

✅ **Slow Network**
- Shows loading indicators
- Auto-retries 3 times
- Falls back to cached data

✅ **Switching Networks**
- Automatically detects change
- Updates UI in real-time
- Adjusts data fetching strategy

✅ **API Failures**
- Shows error message
- Suggests checking connection
- Offers retry option

---

## 📖 Full Documentation

For detailed API reference and advanced usage, see:
- `NETWORK_DETECTION_README.md` - Complete reference
- `NETWORK_IMPLEMENTATION_GUIDE.md` - Code examples

---

## 🎓 Next Steps

1. ✅ Install `expo-network`
2. ✅ Add `NetworkStatus` component to your app
3. ✅ Wrap data-fetching components with `OfflineFallback`
4. ✅ Use `useNetwork()` hook for UI conditionals
5. ✅ Test on Wi-Fi and cellular
6. ✅ Customize settings in `network-config.ts`

---

## 💡 Tips

- Always wrap data-fetching screens with `OfflineFallback`
- Use `network.dataSavingMode` to conditionally show features
- Test on real device (simulator may not detect networks properly)
- Consider caching data for offline viewing
- Show clear messages about why features are limited

---

## ✅ You're Done!

Your farmer app now:
- 🌐 Detects network type automatically
- 📶 Saves airtime on cellular data
- ✅ Shows Wi-Fi quality content
- ❌ Handles offline gracefully
- 🚀 Won't crash due to network issues

**Start using in your components and enjoy network-aware features!** 🎉
