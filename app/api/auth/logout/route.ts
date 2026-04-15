import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase';
import { ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Get session from request header or cookies
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      // Set the session token to sign out
      const { error: signoutError } = await supabaseClient.auth.signOut({
        scope: 'local',
      });

      if (signoutError) {
        console.error('Signout error:', signoutError);
      }
    }

    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      } as ApiResponse<null>,
      { status: 200 }
    );

    // Clear auth cookies
    response.cookies.delete('supabase-auth-token');
    response.cookies.delete('supabase-refresh-token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during logout',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
