import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, getUserById } from '@/lib/supabase';
import { LoginRequest, ApiResponse, AuthResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, password',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    // Sign in user
    const { data: authData, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      return NextResponse.json(
        {
          success: false,
          error: loginError.message,
        } as ApiResponse<null>,
        { status: 401 }
      );
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to authenticate user',
        } as ApiResponse<null>,
        { status: 500 }
      );
    }

    // Get user profile
    const userData = await getUserById(authData.user.id);

    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'User profile not found',
        } as ApiResponse<null>,
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: userData,
          session: authData.session,
        } as AuthResponse,
        message: 'Login successful',
      } as ApiResponse<AuthResponse>,
      { status: 200 }
    );

    // Set secure cookies for session management
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    response.cookies.set('supabase-auth-token', authData.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
    });

    response.cookies.set('supabase-refresh-token', authData.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during login',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
