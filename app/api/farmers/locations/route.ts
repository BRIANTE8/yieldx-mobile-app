/**
 * API Route: GET /api/farmers/locations
 * Fetches all farmer locations for map display
 */

import { NextRequest, NextResponse } from 'next/server';

// Base farmer data (without timestamps)
const baseFarmerLocations = [
  {
    id: 'farmer-001',
    name: 'John Mugabe Farm',
    latitude: -1.9403,
    longitude: 29.8739,
    farmerType: 'Vegetable Farmer',
    contactNumber: '+250123456789',
    minutesAgo: 5,
  },
  {
    id: 'farmer-002',
    name: 'Jane Umutoniwase Farm',
    latitude: -1.9450,
    longitude: 29.8850,
    farmerType: 'Coffee Farmer',
    contactNumber: '+250987654321',
    minutesAgo: 10,
  },
  {
    id: 'farmer-003',
    name: 'Peter Nkusi Crops',
    latitude: -1.9300,
    longitude: 29.8600,
    farmerType: 'Banana Farmer',
    contactNumber: '+250789456123',
    minutesAgo: 2,
  },
  {
    id: 'farmer-004',
    name: 'Marie Uwase Harvests',
    latitude: -1.9520,
    longitude: 29.8950,
    farmerType: 'Potato Farmer',
    contactNumber: '+250456789012',
    minutesAgo: 15,
  },
  {
    id: 'farmer-005',
    name: 'David Rutangwa Agriculture',
    latitude: -1.9250,
    longitude: 29.8800,
    farmerType: 'Mixed Crops',
    contactNumber: '+250321654987',
    minutesAgo: 8,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country'); // e.g., "Rwanda"
    const city = searchParams.get('city'); // e.g., "Kigali"

    // Create locations with current timestamps
    let locations = baseFarmerLocations.map((farmer) => ({
      id: farmer.id,
      name: farmer.name,
      latitude: farmer.latitude,
      longitude: farmer.longitude,
      farmerType: farmer.farmerType,
      contactNumber: farmer.contactNumber,
      lastUpdated: new Date(
        Date.now() - farmer.minutesAgo * 60000
      ).toLocaleString(),
    }));

    // Apply basic filtering
    if (city) {
      locations = locations.filter((f) =>
        f.name.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Sort by most recently updated
    locations.sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

    console.log(`Returning ${locations.length} farmer locations`);

    return NextResponse.json(locations, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=10',
      },
    });
  } catch (error) {
    console.error('Error fetching farmer locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

/**
 * Optional: POST /api/farmers/locations
 * Bulk save multiple farmer locations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Expected an array of locations' },
        { status: 400 }
      );
    }

    // TODO: Validate and save each location to database
    // const results = await Promise.all(
    //   body.map(loc => db.farmerLocations.create(loc))
    // );

    return NextResponse.json(
      {
        success: true,
        message: `${body.length} locations saved successfully`,
        count: body.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error bulk saving locations:', error);
    return NextResponse.json(
      { error: 'Failed to save locations' },
      { status: 500 }
    );
  }
}
