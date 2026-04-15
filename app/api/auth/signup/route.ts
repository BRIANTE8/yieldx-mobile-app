import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient, createUser } from '@/lib/supabase';
import { SignupRequest, ApiResponse, AuthResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();
    const { email, password, role, first_name, last_name } = body;

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, password, role',
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    // Sign up user with Supabase Auth
    const { data: authData, error: signupError } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          first_name,
          last_name,
        },
      },
    });

    if (signupError) {
      return NextResponse.json(
        {
          success: false,
          error: signupError.message,
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create user account',
        } as ApiResponse<null>,
        { status: 500 }
      );
    }

    // Create user profile in database
    const userData = await createUser(authData.user.id, email, role, {
      first_name,
      last_name,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userData,
          session: authData.session,
        } as AuthResponse,
        message: 'Signup successful. Please check your email to confirm.',
      } as ApiResponse<AuthResponse>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during signup',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
