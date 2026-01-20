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
        // Check for auth token in cookies
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // Redirect to login if token is missing
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
