'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiGet, apiPut } from '@/lib/api';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function EditTestimonialPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        organization: '',
        content: '',
        rating: 5,
        status: 'pending',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTestimonial();
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            const data = await apiGet<any>(`/admin/testimonials/all`);
            const testimonial = data.find((t: any) => t.id === parseInt(id));
            if (testimonial) {
                setFormData({
                    name: testimonial.name,
                    email: testimonial.email,
                    position: testimonial.position,
                    organization: testimonial.organization || '',
                    content: testimonial.content,
                    rating: testimonial.rating,
                    status: testimonial.status,
                });
            }
        } catch (error) {
            console.error('Error fetching testimonial:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await apiPut(`/admin/testimonials/${id}`, formData);
            router.push('/admin/testimonials');
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-4">
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Testimonials
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
                <p className="text-gray-600 mt-1">Update testimonial details and status</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                            <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                            <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <input type="text" id="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                            <input type="text" id="organization" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Testimonial *</label>
                        <textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                            <select id="rating" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                            <select id="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                        <button type="button" onClick={() => router.back()} disabled={submitting} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={submitting} className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Saving...
                                </>
                            ) : (
                                'Update Testimonial'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
