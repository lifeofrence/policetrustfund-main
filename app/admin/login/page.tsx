'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password, rememberMe);
            router.push('/admin');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9f0] via-white to-[#f0f9f0] px-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 p-4">
                        <Image
                            src="/logo-dark.png"
                            alt="NPTF Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-merriweather), serif' }}>Admin Login</h1>
                    <p className="text-gray-600 mt-2 font-medium">Nigeria Police Trust Fund Management</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 overflow-hidden relative">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006400]"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-shake">
                                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-gray-900"
                                    placeholder="admin@nptf.gov.ng"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-gray-900"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-[#006400] focus:ring-[#006400] cursor-pointer"
                                />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                            </label>
                            <button type="button" className="text-sm font-bold text-[#006400] hover:text-[#004d00] transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#006400] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#006400]/20 hover:bg-[#004d00] hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#006400]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2026 Nigeria Police Trust Fund. All rights reserved.
                </p>
            </div>
        </div>
    );
}
