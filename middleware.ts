import { NextRequest, NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';

// Middleware to check authentication for protected routes
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Define public routes that don't require authentication
  const publicRoutes = ['/api/auth/signup', '/api/auth/login', '/api/marketplace'];

  // Define API routes that require authentication
  const protectedRoutes = ['/api/auth', '/api/farms', '/api/crops', '/api/alerts', '/api/locations'];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Allow public routes
  if (isPublicRoute || !isProtectedRoute) {
    return NextResponse.next();
  }

  // For protected routes, check for auth token
  const authToken = request.cookies.get('supabase-auth-token');

  if (!authToken) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Unauthorized - missing authentication token',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.next();
};

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
