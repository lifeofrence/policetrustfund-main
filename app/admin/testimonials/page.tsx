'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPut, apiDelete } from '@/lib/api';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import Link from 'next/link';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { ToastContainer } from '@/components/admin/Toast';

interface Testimonial {
    id: number;
    name: string;
    email: string;
    position: string;
    organization: string;
    content: string;
    rating: number;
    status: string;
    created_at: string;
}

export default function TestimonialsListPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: Testimonial | null }>({ isOpen: false, item: null });
    const [deleting, setDeleting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    useEffect(() => {
        fetchTestimonials();
    }, [statusFilter]);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            let endpoint = '/admin/testimonials/all?';
            if (statusFilter) endpoint += `status=${statusFilter}`;

            const response = await apiGet<Testimonial[]>(endpoint);
            setTestimonials(response);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            addToast('Failed to load testimonials', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await apiPut(`/admin/testimonials/${id}`, { status });
            addToast(`Testimonial ${status}`, 'success');
            fetchTestimonials();
        } catch (error) {
            console.error('Error updating status:', error);
            addToast('Failed to update status', 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.item) return;

        try {
            setDeleting(true);
            await apiDelete(`/admin/testimonials/${deleteDialog.item.id}`);
            addToast('Testimonial deleted successfully', 'success');
            setDeleteDialog({ isOpen: false, item: null });
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            addToast('Failed to delete testimonial', 'error');
        } finally {
            setDeleting(false);
        }
    };

    const addToast = (message: string, type: 'success' | 'error' | 'warning') => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
                    <p className="text-gray-600 mt-1">Review and manage testimonials</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            ) : testimonials.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
                    <p className="text-gray-600">No testimonials found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[testimonial.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {testimonial.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-3">{testimonial.content}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span><strong>{testimonial.position}</strong>{testimonial.organization && ` - ${testimonial.organization}`}</span>
                                        <span>{testimonial.email}</span>
                                        <span>Rating: {'⭐'.repeat(testimonial.rating)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                                {testimonial.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleStatusChange(testimonial.id, 'approved')} className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                            <FiCheck className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button onClick={() => handleStatusChange(testimonial.id, 'rejected')} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                            <FiX className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </>
                                )}
                                <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FiEdit2 className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button onClick={() => setDeleteDialog({ isOpen: true, item: testimonial })} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                                    <FiTrash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DeleteConfirmDialog isOpen={deleteDialog.isOpen} onClose={() => setDeleteDialog({ isOpen: false, item: null })} onConfirm={handleDelete} title="Delete Testimonial" message="Are you sure you want to delete this testimonial? This action cannot be undone." itemName={deleteDialog.item?.name} loading={deleting} />
        </div>
    );
}
