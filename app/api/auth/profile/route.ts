import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getUserById, updateUser } from '@/lib/supabase';
import { User, ApiResponse } from '@/lib/types';

// GET current user profile
export async function GET(request: NextRequest) {
  try {
    // Get session
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

    // Get user data
    const userData = await getUserById(session.user.id);

    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'User profile not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: userData,
      } as ApiResponse<User>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// PUT update user profile
export async function PUT(request: NextRequest) {
  try {
    // Get session
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

    // Sanitize updates - prevent changing critical fields
    const { role, id, created_at, deleted_at, ...allowedUpdates } = body;

    // Update user
    const updatedUser = await updateUser(session.user.id, allowedUpdates);

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully',
      } as ApiResponse<User>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

// DELETE user account
export async function DELETE(request: NextRequest) {
  try {
    // Get session
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

    // Soft delete user
    const deletedUser = await updateUser(session.user.id, {
      deleted_at: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account deleted successfully',
      } as ApiResponse<null>,
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
