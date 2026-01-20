'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { FiFileText, FiBriefcase, FiImage, FiMessageSquare, FiMail } from 'react-icons/fi';
import LoadingSpinner from '@/components/admin/LoadingSpinner';

interface Stats {
    news: number;
    projects: number;
    gallery: number;
    testimonials: number;
    contacts: number;
}

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch counts from the dedicated stats endpoint
            const statsData = await apiGet<Stats>('/stats', false);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Set default values on error
            setStats({
                news: 0,
                projects: 0,
                gallery: 0,
                testimonials: 0,
                contacts: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    const hasRole = (role: string) => {
        if (!user?.roles) return false;
        return user.roles.includes(role) || user.roles.includes('super_admin');
    };

    const statCards = [
        { label: 'News Articles', value: stats?.news || 0, icon: FiFileText, color: 'bg-blue-500', href: '/admin/news', role: 'news' },
        { label: 'Projects', value: stats?.projects || 0, icon: FiBriefcase, color: 'bg-green-500', href: '/admin/projects', role: 'projects' },
        { label: 'Gallery Items', value: stats?.gallery || 0, icon: FiImage, color: 'bg-purple-500', href: '/admin/gallery', role: 'gallery' },
        { label: 'Testimonials', value: stats?.testimonials || 0, icon: FiMessageSquare, color: 'bg-yellow-500', href: '/admin/testimonials', role: 'testimonials' },
        { label: 'Contact Messages', value: stats?.contacts || 0, icon: FiMail, color: 'bg-red-500', href: '/admin/contacts', role: 'contacts' },
    ].filter(card => hasRole(card.role));

    const quickActions = [
        { label: 'Create News Article', icon: FiFileText, color: 'text-blue-600', hover: 'hover:border-blue-500 hover:bg-blue-50', href: '/admin/news/create', role: 'news' },
        { label: 'Add New Project', icon: FiBriefcase, color: 'text-green-600', hover: 'hover:border-green-500 hover:bg-green-50', href: '/admin/projects/create', role: 'projects' },
        { label: 'Upload to Gallery', icon: FiImage, color: 'text-purple-600', hover: 'hover:border-purple-500 hover:bg-purple-50', href: '/admin/gallery/create', role: 'gallery' },
    ].filter(action => hasRole(action.role));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-gray-600">Welcome to the Police Trust Fund Admin Panel</p>
                    <div className="flex flex-wrap gap-1.5 border-l border-gray-200 pl-3">
                        {user?.roles?.includes('super_admin') ? (
                            <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 font-bold px-2 py-0.5 rounded-full uppercase">Super Admin</span>
                        ) : (
                            user?.roles?.map(role => (
                                <span key={role} className="text-[10px] bg-green-50 text-[#006400] border border-[#006400]/10 font-bold px-2 py-0.5 rounded-full capitalize">
                                    {role}
                                </span>
                            ))
                        )}
                        {(!user?.roles || user.roles.length === 0) && (
                            <span className="text-[10px] text-gray-400 italic">No Permissions</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions - Temporarily Disabled */}
            {/* {quickActions.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    className={`flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg ${action.hover} transition-all`}
                                >
                                    <Icon className={`w-5 h-5 ${action.color}`} />
                                    <span className="font-medium text-gray-700">{action.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )} */}
        </div>
    );
}
