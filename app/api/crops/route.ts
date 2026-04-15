import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getCropsByFarmId, createCrop, getCropById, updateCrop } from '@/lib/supabase';
import { Crop, CreateCropRequest, ApiResponse } from '@/lib/types';

// GET all crops for a farm
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

    const { searchParams } = new URL(request.url);
    const farmId = searchParams.get('farm_id');

    if (!farmId) {
      return NextResponse.json(
        {
          success: false,
          error: 'farm_id query parameter is required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const crops = await getCropsByFarmId(farmId);

    return NextResponse.json(
      {
        success: true,
        data: crops,
      } as ApiResponse<Crop[]>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get crops error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// POST create new crop
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

    const body: CreateCropRequest & { farm_id: string } = await request.json();

    // Validation
    if (!body.farm_id || !body.crop_name) {
      return NextResponse.json(
        {
          success: false,
          error: 'farm_id and crop_name are required',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const newCrop = await createCrop(body.farm_id, body);

    return NextResponse.json(
      {
        success: true,
        data: newCrop,
        message: 'Crop created successfully',
      } as ApiResponse<Crop>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Create crop error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
