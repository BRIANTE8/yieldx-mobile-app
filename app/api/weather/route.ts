import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData, getWeatherForecast } from '@/lib/weather-service';
import { getDistrictName } from '@/lib/geocoding-service';

export interface WeatherApiResponse {
  success: boolean;
  data?: {
    district: string;
    weather: {
      temperature: number;
      condition: string;
      humidity: number;
      windSpeed: number;
      pressure: number;
      visibility: number;
      uvIndex: number;
      feelsLike: number;
      rainfall: number;
    };
    forecast: Array<{
      day: string;
      high: number;
      low: number;
      condition: string;
      icon: string;
      rainfall: number;
    }>;
  };
  error?: string;
}

/**
 * GET /api/weather - Get weather data and district for given coordinates
 * Query params:
 * - latitude: number (required)
 * - longitude: number (required)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = parseFloat(searchParams.get('latitude') || '');
    const longitude = parseFloat(searchParams.get('longitude') || '');

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid latitude or longitude provided',
        } as WeatherApiResponse,
        { status: 400 }
      );
    }

    // Fetch data in parallel
    const [weather, forecast, district] = await Promise.all([
      getWeatherData(latitude, longitude),
      getWeatherForecast(latitude, longitude),
      getDistrictName(latitude, longitude),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          district,
          weather,
          forecast,
        },
      } as WeatherApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch weather data',
      } as WeatherApiResponse,
      { status: 500 }
    );
  }
}
