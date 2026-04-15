import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getFarmsByUserId, createFarm } from '@/lib/supabase';
import { Farm, CreateFarmRequest, ApiResponse } from '@/lib/types';

// GET all user's farms
export async function GET(request: NextRequest) {
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

    const farms = await getFarmsByUserId(session.user.id);

    return NextResponse.json(
      {
        success: true,
        data: farms,
      } as ApiResponse<Farm[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get farms error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// POST create new farm
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

    const body: CreateFarmRequest = await request.json();

    // Validation
    if (!body.farm_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Farm name is required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const newFarm = await createFarm(session.user.id, body);

    return NextResponse.json(
      {
        success: true,
        data: newFarm,
        message: 'Farm created successfully',
      } as ApiResponse<Farm>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create farm error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
