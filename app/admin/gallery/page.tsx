'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiGet, apiDelete } from '@/lib/api';
import { FiPlus, FiTrash2, FiSearch, FiPlay, FiEdit2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { ToastContainer } from '@/components/admin/Toast';

interface GalleryItem {
    id: number;
    event_name: string;
    title: string;
    type: string;
    media: string;
    thumbnail: string;
    date: string;
}

interface PaginatedResponse {
    data: GalleryItem[];
    current_page: number;
    last_page: number;
    total: number;
}

export default function GalleryListPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventFilter, setEventFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [events, setEvents] = useState<string[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; item: GalleryItem | null }>({ isOpen: false, item: null });
    const [deleting, setDeleting] = useState(false);
    const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' }>>([]);

    const fetchEvents = useCallback(async () => {
        try {
            const response = await apiGet<string[]>('/gallery/events/list', false);
            setEvents(response);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }, []);

    const fetchGallery = useCallback(async () => {
        try {
            setLoading(true);
            let endpoint = `/gallery?page=${currentPage}&per_page=12&`;
            if (eventFilter) endpoint += `event=${encodeURIComponent(eventFilter)}&`;
            if (typeFilter) endpoint += `type=${encodeURIComponent(typeFilter)}&`;
            if (searchTerm) endpoint += `search=${encodeURIComponent(searchTerm)}&`;

            const response = await apiGet<PaginatedResponse>(endpoint, false);
            setGallery(response.data);
            setTotalPages(response.last_page);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            addToast('Failed to load gallery', 'error');
        } finally {
            setLoading(false);
        }
    }, [currentPage, eventFilter, typeFilter, searchTerm]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    const handleDelete = async () => {
        if (!deleteDialog.item) return;

        try {
            setDeleting(true);
            await apiDelete(`/admin/gallery/${deleteDialog.item.id}`);
            addToast('Gallery item deleted successfully', 'success');
            setDeleteDialog({ isOpen: false, item: null });
            fetchGallery();
        } catch (error) {
            console.error('Error deleting gallery item:', error);
            addToast('Failed to delete gallery item', 'error');
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleEventFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gallery Management</h1>
                    <p className="text-gray-600 mt-1">Manage photos and videos for the public gallery</p>
                </div>
                <Link href="/admin/gallery/create" className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 active:scale-95 font-bold">
                    <FiPlus className="w-5 h-5" />
                    Upload Media
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or event..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                        />
                    </div>
                    <select
                        value={eventFilter}
                        onChange={handleEventFilterChange}
                        className="px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    >
                        <option value="">All Events</option>
                        {events.map((event) => (
                            <option key={event} value={event}>{event}</option>
                        ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={handleTypeFilterChange}
                        className="px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    >
                        <option value="">All Media Types</option>
                        <option value="image">Photos</option>
                        <option value="video">Videos</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <LoadingSpinner size="lg" />
                </div>
            ) : gallery.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiSearch className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No media found</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">We couldn't find any gallery items matching your current filters.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setEventFilter(''); setTypeFilter(''); }}
                        className="mt-6 text-purple-600 font-bold hover:text-purple-700 underline underline-offset-4"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {gallery.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                                    {item.type === 'video' ? (
                                        <>
                                            {item.thumbnail ? (
                                                <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                    <FiPlay className="w-10 h-10 text-white opacity-50" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform group-hover:scale-110 transition-transform">
                                                    <FiPlay className="w-6 h-6 fill-current" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Image src={item.media} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    )}

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button
                                            onClick={() => setDeleteDialog({ isOpen: true, item })}
                                            className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                        <Link
                                            href={`/admin/gallery/${item.id}/edit`}
                                            className="w-10 h-10 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-50 transition-colors"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border ${item.type === 'video' ? 'bg-red-500/80 text-white border-red-400' : 'bg-purple-500/80 text-white border-purple-400'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 flex-grow">
                                    <div className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">{item.event_name}</div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-xs text-gray-400 font-medium">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                <FiChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                <FiChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </>
            )}

            <DeleteConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, item: null })}
                onConfirm={handleDelete}
                title="Delete Gallery Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
                itemName={deleteDialog.item?.title}
                loading={deleting}
            />
        </div>
    );
}
