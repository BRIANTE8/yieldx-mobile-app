/**
 * API Route: POST /api/farmers/location
 * Saves a farmer's current GPS location to the database
 */

import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with your actual database implementation
// This is a mock implementation using an in-memory store
const farmerLocations: { [key: string]: any } = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farmerId, farmerName, latitude, longitude, accuracy, timestamp } = body;

    // Validation
    if (!farmerId || !farmerName || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate coordinates are within reasonable bounds (Rwanda area)
    if (latitude < -2.5 || latitude > -0.8 || longitude < 28.8 || longitude > 30.9) {
      console.warn(
        `Location outside expected Rwanda area: ${latitude}, ${longitude}`
      );
    }

    // Save to database (replace with actual database call)
    farmerLocations[farmerId] = {
      farmerId,
      farmerName,
      latitude,
      longitude,
      accuracy: accuracy || null,
      timestamp: timestamp || Date.now(),
      savedAt: new Date().toISOString(),
    };

    // TODO: Implement actual database save:
    // await db.farmerLocations.create({
    //   farmerId,
    //   farmerName,
    //   latitude,
    //   longitude,
    //   accuracy,
    //   timestamp: new Date(timestamp),
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Location saved successfully',
        data: {
          farmerId,
          latitude,
          longitude,
          savedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving location:', error);
    return NextResponse.json(
      { error: 'Failed to save location' },
      { status: 500 }
    );
  }
}

/**
 * API Route: GET /api/farmers/location
 * Gets a specific farmer's last known location
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farmerId = searchParams.get('farmerId');

    if (!farmerId) {
      return NextResponse.json(
        { error: 'farmerId is required' },
        { status: 400 }
      );
    }

    const location = farmerLocations[farmerId];

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found for this farmer' },
        { status: 404 }
      );
    }

    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}
