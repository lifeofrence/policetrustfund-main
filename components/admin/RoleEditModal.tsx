'use client';

import { useState } from 'react';
import { apiPut } from '@/lib/api';
import { FiX, FiShield, FiCheckCircle } from 'react-icons/fi';

interface RoleEditModalProps {
    user: {
        id: number;
        name: string;
        roles: string[];
    };
    onClose: () => void;
    onSuccess: () => void;
}

export default function RoleEditModal({ user, onClose, onSuccess }: RoleEditModalProps) {
    const [selectedRoles, setSelectedRoles] = useState<string[]>(user.roles || []);
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
            await apiPut(`/admin/users/${user.id}/roles`, { roles: selectedRoles });
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to update roles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col">
                {/* Header */}
                <div className="bg-[#006400] p-6 text-white flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold">Edit User Roles</h2>
                        <p className="text-white/80 text-xs mt-1">Admin: <span className="font-bold underline">{user.name}</span></p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
                            <FiX className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <FiShield className="w-4 h-4 text-[#006400]" />
                                Assign Permissions / Roles
                            </label>
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
                                        Save Changes
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
