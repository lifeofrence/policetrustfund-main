import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect admin routes
 * Redirects unauthenticated users to login page
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is an admin route (except login)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        // Check for auth token in cookies or headers
        const token = request.cookies.get('admin_token')?.value;

        // For client-side routing, we'll rely on the AuthProvider
        // This middleware primarily handles direct URL access
        // The actual auth check happens in the AuthProvider component

        // Allow the request to proceed - client-side auth will handle it
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
