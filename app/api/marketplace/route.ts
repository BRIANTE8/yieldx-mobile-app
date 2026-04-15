import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getActiveListings, createListing, searchListings } from '@/lib/supabase';
import { MarketplaceListing, CreateListingRequest, ApiResponse } from '@/lib/types';

// GET marketplace listings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let listings;

    if (search) {
      listings = await searchListings(search);
    } else {
      listings = await getActiveListings(limit, offset);
    }

    return NextResponse.json(
      {
        success: true,
        data: listings,
      } as ApiResponse<MarketplaceListing[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// POST create new listing
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

    const body: CreateListingRequest = await request.json();

    // Validation
    if (!body.crop_name || !body.quantity_available || !body.price_per_unit) {
      return NextResponse.json(
        {
          success: false,
          error: 'crop_name, quantity_available, and price_per_unit are required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const newListing = await createListing(session.user.id, {
      ...body,
      status: 'active',
    });

    return NextResponse.json(
      {
        success: true,
        data: newListing,
        message: 'Listing created successfully',
      } as ApiResponse<MarketplaceListing>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create listing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
