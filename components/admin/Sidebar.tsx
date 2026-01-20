'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
    FiHome,
    FiFileText,
    FiBriefcase,
    FiImage,
    FiMessageSquare,
    FiMail,
    FiUsers
} from 'react-icons/fi';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: FiHome },
    { href: '/admin/news', label: 'News', icon: FiFileText, requiredRole: 'news' },
    { href: '/admin/projects', label: 'Projects', icon: FiBriefcase, requiredRole: 'projects' },
    { href: '/admin/gallery', label: 'Gallery', icon: FiImage, requiredRole: 'gallery' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare, requiredRole: 'testimonials' },
    { href: '/admin/contacts', label: 'Contacts', icon: FiMail, requiredRole: 'contacts' },
    { href: '/admin/users', label: 'Users', icon: FiUsers, requiredRole: 'super_admin' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const hasAccess = (requiredRole?: string) => {
        if (!requiredRole) return true;
        if (!user?.roles) return false;
        if (user.roles.includes('super_admin')) return true;
        return user.roles.includes(requiredRole);
    };

    const filteredMenuItems = menuItems.filter(item => hasAccess(item.requiredRole));

    return (
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-900 text-white">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold font-merriweather">NPTF Admin</h2>
                <p className="text-sm text-gray-400 mt-1">Police Trust Fund</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 text-center">
                    © 2026 NPTF. All rights reserved.
                </p>
            </div>
        </aside>
    );
}
