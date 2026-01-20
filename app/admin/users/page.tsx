'use client';

import { useState, useEffect } from 'react';
import { apiGet, apiDelete } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { FiUsers, FiUserPlus, FiTrash2, FiSearch, FiShield, FiMoreVertical, FiLock, FiEdit } from 'react-icons/fi';
import UserForm from '@/components/admin/UserForm';
import ResetPasswordModal from '@/components/admin/ResetPasswordModal';
import RoleEditModal from '@/components/admin/RoleEditModal';
import EditUserModal from '@/components/admin/EditUserModal';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import Toast from '@/components/admin/Toast';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

export default function UsersPage() {
    const { user: currentUser, checkAuth } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [resetPasswordData, setResetPasswordData] = useState<{ id: number; name: string } | null>(null);
    const [roleEditData, setRoleEditData] = useState<User | null>(null);
    const [editUserData, setEditUserData] = useState<User | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await apiGet<User[]>('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            showToast('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await apiDelete(`/admin/users/${deleteId}`);
            setUsers(users.filter(u => u.id !== deleteId));
            showToast('User deleted successfully', 'success');
        } catch (error: any) {
            showToast(error.message || 'Failed to delete user', 'error');
        } finally {
            setDeleteId(null);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                        User Management
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage administrators and system access</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#006400] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#006400]/20 hover:bg-[#004d00] hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center"
                >
                    <FiUserPlus className="w-5 h-5" />
                    Add New User
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#006400]">
                        <FiUsers className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Admins</p>
                        <p className="text-3xl font-black text-gray-900">{users.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <FiShield className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Access Role</p>
                        <p className="text-3xl font-black text-gray-900">Administrator</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#006400]/5 focus:border-[#006400] transition-all outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Administrator</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Permissions</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date Joined</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                                        <td className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-6 py-6 text-right"><div className="h-8 bg-gray-100 rounded w-16 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                                        No administrators found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-green-50 text-[#006400] flex items-center justify-center font-bold">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 capitalize">{u.name}</p>
                                                    {currentUser?.id === u.id && (
                                                        <span className="text-[10px] bg-[#006400] text-white font-black uppercase px-1.5 py-0.5 rounded tracking-tighter">You</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-wrap gap-1">
                                                {u.roles?.includes('super_admin') ? (
                                                    <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 font-bold px-2 py-0.5 rounded-full uppercase">Super Admin</span>
                                                ) : (
                                                    u.roles?.map(role => (
                                                        <span key={role} className="text-[10px] bg-gray-50 text-gray-600 border border-gray-100 font-bold px-2 py-0.5 rounded-full capitalize">
                                                            {role}
                                                        </span>
                                                    ))
                                                )}
                                                {(!u.roles || u.roles.length === 0) && (
                                                    <span className="text-[10px] text-gray-400 italic">No Access</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-gray-600 font-medium">{u.email}</td>
                                        <td className="px-6 py-6 text-gray-500 text-sm">
                                            {new Date(u.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            {currentUser?.id !== u.id && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setEditUserData(u)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Edit Details"
                                                    >
                                                        <FiEdit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setRoleEditData(u)}
                                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                                                        title="Edit Roles"
                                                    >
                                                        <FiShield className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setResetPasswordData({ id: u.id, name: u.name })}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Reset Password"
                                                    >
                                                        <FiLock className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(u.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete User"
                                                    >
                                                        <FiTrash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals & Feedback */}
            {isFormOpen && (
                <UserForm
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={() => {
                        fetchUsers();
                        showToast('New user added successfully', 'success');
                    }}
                />
            )}

            {resetPasswordData && (
                <ResetPasswordModal
                    userId={resetPasswordData.id}
                    userName={resetPasswordData.name}
                    onClose={() => setResetPasswordData(null)}
                    onSuccess={() => showToast('Password reset successfully', 'success')}
                />
            )}

            {roleEditData && (
                <RoleEditModal
                    user={roleEditData}
                    onClose={() => setRoleEditData(null)}
                    onSuccess={() => {
                        fetchUsers();
                        checkAuth();
                        showToast('Roles updated successfully', 'success');
                    }}
                />
            )}

            {editUserData && (
                <EditUserModal
                    user={editUserData}
                    onClose={() => setEditUserData(null)}
                    onSuccess={() => {
                        fetchUsers();
                        showToast('User details updated successfully', 'success');
                    }}
                />
            )}

            <DeleteConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete User Account"
                message="Are you sure you want to delete this administrator? They will lose all access to the dashboard immediately. This action cannot be undone."
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
