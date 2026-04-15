import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getFarmById, updateFarm } from '@/lib/supabase';
import { Farm, ApiResponse } from '@/lib/types';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single farm
export async function GET(request: NextRequest, { params }: RouteParams) {
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

    const farm = await getFarmById(params.id);

    if (!farm) {
      return NextResponse.json(
        {
          success: false,
          error: 'Farm not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    // Check authorization
    if (farm.user_id !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - cannot access this farm',
        } as ApiResponse<null>,
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: farm,
      } as ApiResponse<Farm>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get farm error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// PUT update farm
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const farm = await getFarmById(params.id);

    if (!farm) {
      return NextResponse.json(
        {
          success: false,
          error: 'Farm not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    // Check authorization
    if (farm.user_id !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - cannot update this farm',
        } as ApiResponse<null>,
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedFarm = await updateFarm(params.id, body);

    return NextResponse.json(
      {
        success: true,
        data: updatedFarm,
        message: 'Farm updated successfully',
      } as ApiResponse<Farm>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update farm error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// DELETE farm
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const farm = await getFarmById(params.id);

    if (!farm) {
      return NextResponse.json(
        {
          success: false,
          error: 'Farm not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    // Check authorization
    if (farm.user_id !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - cannot delete this farm',
        } as ApiResponse<null>,
        { status: 403 }
      );
    }

    // Soft delete
    const deletedFarm = await updateFarm(params.id, {
      deleted_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Farm deleted successfully',
      } as ApiResponse<null>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete farm error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
