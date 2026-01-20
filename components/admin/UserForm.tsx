'use client';

import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { FiX, FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';

interface UserFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function UserForm({ onClose, onSuccess }: UserFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const rolesList = [
        { id: 'news', label: 'News Management' },
        { id: 'projects', label: 'Projects Management' },
        { id: 'gallery', label: 'Gallery Management' },
        { id: 'testimonials', label: 'Testimonials Management' },
        { id: 'contacts', label: 'Contacts Management' },
        { id: 'super_admin', label: 'Super Admin (Full Access)' },
    ];

    const toggleRole = (roleId: string) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter(r => r !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        setLoading(true);

        try {
            await apiPost('/admin/users', { ...formData, roles: selectedRoles });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to create user. Please check your inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-[#006400] p-6 text-white flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold">Add New User</h2>
                        <p className="text-white/80 text-xs mt-1">Create a new admin account with specific roles</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
                            <FiX className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiUser className="w-5 h-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiMail className="w-5 h-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="w-5 h-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiLock className="w-5 h-5 text-gray-400 group-focus-within:text-[#006400] transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={formData.password_confirmation}
                                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#006400]/10 focus:border-[#006400] transition-all outline-none text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-4">Assign Permissions / Roles</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {rolesList.map((role) => (
                                    <label
                                        key={role.id}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${selectedRoles.includes(role.id)
                                            ? 'bg-[#006400]/5 border-[#006400] text-[#006400]'
                                            : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role.id)}
                                            onChange={() => toggleRole(role.id)}
                                            className="w-5 h-5 rounded border-gray-300 text-[#006400] focus:ring-[#006400] transition-all cursor-pointer"
                                        />
                                        <span className="text-sm font-bold">{role.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-[#006400] text-white font-bold rounded-xl hover:bg-[#004d00] shadow-lg shadow-[#006400]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiCheckCircle className="w-5 h-5" />
                                        Create User
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
