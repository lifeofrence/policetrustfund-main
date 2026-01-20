'use client';

import { useRouter } from 'next/navigation';
import { apiPostFormData } from '@/lib/api';
import NewsForm from '@/components/admin/NewsForm';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function CreateNewsPage() {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        try {
            await apiPostFormData('/admin/news', formData);
            router.push('/admin/news');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/news"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to News
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Create News Article</h1>
                <p className="text-gray-600 mt-1">Add a new news article or announcement</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <NewsForm onSubmit={handleSubmit} submitLabel="Create News" />
            </div>
        </div>
    );
}
