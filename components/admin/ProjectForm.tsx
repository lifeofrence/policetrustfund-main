'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';

interface ProjectFormData {
    title: string;
    description: string;
    category: string;
    status: string;
    location: string;
    start_date: string;
    end_date: string;
    impact: string;
}

interface ProjectFormProps {
    initialData?: ProjectFormData & { image?: string };
    onSubmit: (formData: FormData) => Promise<void>;
    submitLabel?: string;
}

export default function ProjectForm({ initialData, onSubmit, submitLabel = 'Create Project' }: ProjectFormProps) {
    const router = useRouter();

    // Helper function to format date from API to YYYY-MM-DD
    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return '';
        try {
            // Extract just the date part (YYYY-MM-DD) from datetime string
            return dateString.split('T')[0];
        } catch {
            return '';
        }
    };

    const [formData, setFormData] = useState<ProjectFormData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        category: initialData?.category || '',
        status: initialData?.status || 'upcoming',
        location: initialData?.location || '',
        start_date: formatDateForInput(initialData?.start_date),
        end_date: formatDateForInput(initialData?.end_date),
        impact: initialData?.impact || '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) data.append(key, value);
            });
            if (imageFile) data.append('image', imageFile);

            await onSubmit(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Project title" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Project description" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                <option value="">Select category</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Technology">Technology</option>
                                <option value="Training">Training</option>
                                <option value="Equipment">Equipment</option>
                                <option value="Welfare">Welfare</option>
                                <option value="Community">Community</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Project location" />
                    </div>
                </div>

                <div className="space-y-6">
                    <ImageUpload value={initialData?.image} onChange={setImageFile} label="Project Image" maxSizeMB={5} />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                            <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                        </div>

                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">Impact</label>
                        <textarea id="impact" name="impact" value={formData.impact} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Project impact and outcomes" />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button type="button" onClick={() => router.back()} disabled={loading} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Saving...
                        </>
                    ) : (
                        submitLabel
                    )}
                </button>
            </div>
        </form>
    );
}
