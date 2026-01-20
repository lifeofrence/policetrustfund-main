'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiGet, apiPutFormData } from '@/lib/api';
import NewsForm from '@/components/admin/NewsForm';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface NewsData {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    image: string;
    published_at: string;
}

export default function EditNewsPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [newsData, setNewsData] = useState<NewsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, [id]);

    const fetchNews = async () => {
        try {
            const data = await apiGet<NewsData>(`/news/${id}`, false);
            setNewsData(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            await apiPutFormData(`/admin/news/${id}`, formData);
            router.push('/admin/news');
        } catch (error) {
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!newsData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">News article not found</p>
                <Link href="/admin/news" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
                    Back to News
                </Link>
            </div>
        );
    }

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
                <h1 className="text-3xl font-bold text-gray-900">Edit News Article</h1>
                <p className="text-gray-600 mt-1">Update news article details</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <NewsForm
                    initialData={newsData}
                    onSubmit={handleSubmit}
                    submitLabel="Update News"
                />
            </div>
        </div>
    );
}
