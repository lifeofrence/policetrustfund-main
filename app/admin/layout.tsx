'use client';

import { AuthProvider, useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminHeader from '@/components/admin/Header';
import AdminSidebar from '@/components/admin/Sidebar';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Route to Role mapping
    const routeRoles: { [key: string]: string } = {
        '/admin/news': 'news',
        '/admin/projects': 'projects',
        '/admin/gallery': 'gallery',
        '/admin/testimonials': 'testimonials',
        '/admin/contacts': 'contacts',
        '/admin/users': 'super_admin',
    };

    useEffect(() => {
        // Redirect to admin if already authenticated on login page
        if (!loading && user && pathname.startsWith('/admin/login')) {
            router.replace('/admin');
        }

        // Redirect to login if not authenticated (except on login page)
        if (!loading && !user && !pathname.startsWith('/admin/login')) {
            router.replace('/admin/login');
            return;
        }

        // Role-based protection
        if (!loading && user && !pathname.startsWith('/admin/login') && pathname !== '/admin') {
            // Find if current path is protected
            const protectedPath = Object.keys(routeRoles).find(route => pathname.startsWith(route));

            if (protectedPath) {
                const requiredRole = routeRoles[protectedPath];
                const hasRole = user.roles?.includes(requiredRole) || user.roles?.includes('super_admin');

                if (!hasRole) {
                    router.replace('/admin');
                }
            }
        }
    }, [user, loading, router, pathname]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If on login page, render without layout
    if (pathname.startsWith('/admin/login')) {
        return <>{children}</>;
    }

    // If not authenticated, don't render (will redirect)
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminHeader />

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    );
}
