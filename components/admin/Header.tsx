'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiMenu, FiX, FiLogOut, FiUser, FiLock, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';
import PasswordChangeForm from '@/components/admin/PasswordChangeForm';
import Toast from '@/components/admin/Toast';

export default function AdminHeader() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <FiX className="w-6 h-6 text-gray-600" />
                    ) : (
                        <FiMenu className="w-6 h-6 text-gray-600" />
                    )}
                </button>

                {/* Title */}
                <div className="flex-1 lg:flex-none">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                </div>

                {/* User info and items */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {user && (
                        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 mr-2">
                            <FiUser className="w-4 h-4 text-[#006400]" />
                            <span className="font-bold">{user.name}</span>
                        </div>
                    )}

                    {user?.roles?.includes('super_admin') && (
                        <button
                            onClick={() => setShowPasswordForm(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            title="Change Password"
                        >
                            <FiLock className="w-4 h-4" />
                            <span className="hidden md:inline">Settings</span>
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <FiLogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            {showPasswordForm && (
                <PasswordChangeForm
                    onClose={() => setShowPasswordForm(false)}
                    onSuccess={() => showToast('Password changed successfully!', 'success')}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </header>
    );
}
