import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, updateUserLocation, getNearbyLocations } from '@/lib/supabase';
import { Location, ApiResponse } from '@/lib/types';

// POST update user location
export async function POST(request: NextRequest) {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - no active session',
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    const body = await request.json();
    const { latitude, longitude } = body;

    // Validation
    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'latitude and longitude are required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const location = await updateUserLocation(session.user.id, latitude, longitude);

    return NextResponse.json(
      {
        success: true,
        data: location,
        message: 'Location updated successfully',
      } as ApiResponse<Location>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update location error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// GET nearby locations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'nearby') {
      const latitude = parseFloat(searchParams.get('latitude') || '0');
      const longitude = parseFloat(searchParams.get('longitude') || '0');
      const radius = parseInt(searchParams.get('radius') || '10');

      if (!latitude || !longitude) {
        return NextResponse.json(
          {
            success: false,
            error: 'latitude and longitude are required',
          } as ApiResponse<null>,
          { status: 400 }
        );
      }

      const nearbyLocations = await getNearbyLocations(latitude, longitude, radius);

      return NextResponse.json(
        {
          success: true,
          data: nearbyLocations,
        } as ApiResponse<Location[]>,
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      } as ApiResponse<null>,
      { status: 400 }
    );
  } catch (error) {
    console.error('Get nearby locations error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
