'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';

interface NewsFormData {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    published_at: string;
}

interface NewsFormProps {
    initialData?: NewsFormData & { image?: string };
    onSubmit: (formData: FormData) => Promise<void>;
    submitLabel?: string;
}

export default function NewsForm({ initialData, onSubmit, submitLabel = 'Create News' }: NewsFormProps) {
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

    const [formData, setFormData] = useState<NewsFormData>({
        title: initialData?.title || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        author: initialData?.author || '',
        category: initialData?.category || '',
        published_at: formatDateForInput(initialData?.published_at),
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('excerpt', formData.excerpt);
            data.append('content', formData.content);
            data.append('author', formData.author);
            data.append('category', formData.category);
            if (formData.published_at) {
                data.append('published_at', formData.published_at);
            }
            if (imageFile) {
                data.append('image', imageFile);
            }

            await onSubmit(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter news title"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Brief summary of the news"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows={10}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Full news content"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Image Upload */}
                    <ImageUpload
                        value={initialData?.image}
                        onChange={setImageFile}
                        label="Featured Image"
                        maxSizeMB={5}
                    />

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Author name"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select category</option>
                            <option value="Announcement">Announcement</option>
                            <option value="Event">Event</option>
                            <option value="Update">Update</option>
                            <option value="Press Release">Press Release</option>
                        </select>
                    </div>

                    {/* Published Date */}
                    <div>
                        <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                            Publish Date
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                id="published_at"
                                name="published_at"
                                value={formData.published_at}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const today = new Date().toISOString().split('T')[0];
                                    setFormData({ ...formData, published_at: today });
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                            >
                                Publish Now
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            {formData.published_at
                                ? '✅ Article will be published'
                                : '⚠️ Leave empty to save as draft (unpublished)'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
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
