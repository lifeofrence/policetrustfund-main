'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPutFormData, PaginatedResponse } from '@/lib/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { ToastContainer } from '@/components/admin/Toast';

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    image: string;
    published_at: string;
    created_at: string;
}

export default function NewsListPage() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: NewsArticle | null }>({
        isOpen: false,
        item: null,
    });
    const [deleting, setDeleting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    useEffect(() => {
        fetchNews();
    }, [searchTerm, categoryFilter]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            let endpoint = '/news?per_page=100';
            if (searchTerm) endpoint += `&search=${encodeURIComponent(searchTerm)}`;
            if (categoryFilter) endpoint += `&category=${encodeURIComponent(categoryFilter)}`;

            const response = await apiGet<PaginatedResponse<NewsArticle>>(endpoint, false);
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
            addToast('Failed to load news articles', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.item) return;

        try {
            setDeleting(true);
            await apiDelete(`/admin/news/${deleteDialog.item.id}`);
            addToast('News article deleted successfully', 'success');
            setDeleteDialog({ isOpen: false, item: null });
            fetchNews();
        } catch (error) {
            console.error('Error deleting news:', error);
            addToast('Failed to delete news article', 'error');
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

    const handleTogglePublish = async (article: NewsArticle) => {
        try {
            const formData = new FormData();

            // If currently published, unpublish (set to null)
            // If not published, publish with today's date
            if (article.published_at) {
                formData.append('published_at', '');
            } else {
                const today = new Date().toISOString().split('T')[0];
                formData.append('published_at', today);
            }

            await apiPutFormData(`/admin/news/${article.id}`, formData);
            addToast(
                article.published_at ? 'Article unpublished successfully' : 'Article published successfully',
                'success'
            );
            fetchNews();
        } catch (error) {
            console.error('Error toggling publish status:', error);
            addToast('Failed to update publish status', 'error');
        }
    };

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
                    <p className="text-gray-600 mt-1">Manage news articles and announcements</p>
                </div>
                <Link
                    href="/admin/news/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Create News
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        <option value="Announcement">Announcement</option>
                        <option value="Event">Event</option>
                        <option value="Update">Update</option>
                        <option value="Press Release">Press Release</option>
                    </select>
                </div>
            </div>

            {/* News List */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            ) : news.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
                    <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No news articles found</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Article
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {news.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {article.image && (
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">{article.title}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                            {article.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {article.author || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {article.published_at ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                <FiEye className="w-3 h-3" />
                                                Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                <FiEyeOff className="w-3 h-3" />
                                                Draft
                                            </span>
                                        )}
                                        {article.published_at && (
                                            <p className="text-xs text-gray-500 mt-1">{new Date(article.published_at).toLocaleDateString()}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleTogglePublish(article)}
                                                className={`p-2 rounded-lg transition-colors ${article.published_at
                                                    ? 'text-orange-600 hover:bg-orange-50'
                                                    : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={article.published_at ? 'Unpublish' : 'Publish'}
                                            >
                                                {article.published_at ? (
                                                    <FiEyeOff className="w-4 h-4" />
                                                ) : (
                                                    <FiEye className="w-4 h-4" />
                                                )}
                                            </button>
                                            <Link
                                                href={`/admin/news/${article.id}/edit`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteDialog({ isOpen: true, item: article })}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, item: null })}
                onConfirm={handleDelete}
                title="Delete News Article"
                message="Are you sure you want to delete this news article? This action cannot be undone."
                itemName={deleteDialog.item?.title}
                loading={deleting}
            />
        </div>
    );
}
