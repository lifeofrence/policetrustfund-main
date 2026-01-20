'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiPostFormData } from '@/lib/api';
import { FiArrowLeft, FiUpload, FiYoutube, FiLink } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateGalleryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        event_name: '',
        title: '',
        type: 'image',
        video_source: 'upload', // 'upload' or 'youtube'
        video_url: '',
        date: '',
    });
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMediaFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setMediaPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = new FormData();
            data.append('event_name', formData.event_name);
            data.append('title', formData.title);
            data.append('type', formData.type);
            data.append('date', formData.date);

            if (formData.type === 'video' && formData.video_source === 'youtube') {
                const videoId = getYoutubeId(formData.video_url);
                if (!videoId) {
                    throw new Error('Invalid YouTube URL');
                }
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                data.append('media_url', embedUrl);
                data.append('thumbnail_url', thumbUrl);
            } else {
                if (mediaFile) data.append('media', mediaFile);
                if (thumbnailFile) data.append('thumbnail', thumbnailFile);
            }

            await apiPostFormData('/admin/gallery', data);
            router.push('/admin/gallery');
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/gallery" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold mb-4 transition-colors">
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Gallery
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Upload Media</h1>
                <p className="text-gray-600 mt-2">Add photos or videos to the public gallery</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-800 flex items-center gap-3">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="event_name" className="block text-sm font-bold text-gray-700 mb-2">Event Name *</label>
                                <input type="text" id="event_name" value={formData.event_name} onChange={(e) => setFormData({ ...formData, event_name: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all outline-none" placeholder="e.g., Budget Presentation 2026" />
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                <input type="text" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all outline-none" placeholder="e.g., Opening Ceremony" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">Media Type *</label>
                                    <select id="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                                    <input type="date" id="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {formData.type === 'image' ? (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Image File *</label>
                                    {mediaPreview ? (
                                        <div className="relative w-full h-64 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                                            <Image src={mediaPreview} alt="Preview" fill className="object-contain" />
                                            <button type="button" onClick={() => { setMediaFile(null); setMediaPreview(''); }} className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform transition-transform hover:scale-110">×</button>
                                        </div>
                                    ) : (
                                        <label className="w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all group">
                                            <FiUpload className="w-12 h-12 text-gray-400 mb-4 group-hover:text-purple-500 transition-colors" />
                                            <p className="font-bold text-gray-600 group-hover:text-purple-700">Click to upload image</p>
                                            <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">PNG, JPG up to 5MB</p>
                                            <input type="file" accept="image/*" onChange={handleMediaChange} required className="hidden" />
                                        </label>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-4">Video Source</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, video_source: 'upload' })}
                                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold ${formData.video_source === 'upload' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                            >
                                                <FiUpload /> File Upload
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, video_source: 'youtube' })}
                                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold ${formData.video_source === 'youtube' ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                            >
                                                <FiYoutube /> YouTube
                                            </button>
                                        </div>
                                    </div>

                                    {formData.video_source === 'upload' ? (
                                        <div className="space-y-4">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Video File *</label>
                                            <input type="file" accept="video/*" onChange={handleMediaChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                                            <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded italic">Max size: 20MB. Recommended for small clips.</p>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (Thumbnail)</label>
                                                <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="video_url" className="block text-sm font-bold text-gray-700 mb-2">YouTube URL *</label>
                                                <div className="relative">
                                                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="url"
                                                        id="video_url"
                                                        value={formData.video_url}
                                                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                                        required
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                                                        placeholder="https://www.youtube.com/watch?v=..."
                                                    />
                                                </div>
                                            </div>
                                            {formData.video_url && getYoutubeId(formData.video_url) && (
                                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-900">
                                                    <Image
                                                        src={`https://img.youtube.com/vi/${getYoutubeId(formData.video_url)}/maxresdefault.jpg`}
                                                        alt="YouTube Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FiYoutube className="w-16 h-16 text-white drop-shadow-2xl" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
                        <button type="button" onClick={() => router.back()} disabled={loading} className="px-8 py-3 text-gray-600 font-bold hover:text-gray-900 bg-gray-50 rounded-xl transition-all disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={loading} className={`px-10 py-3 text-white rounded-xl font-bold shadow-lg transform transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 disabled:opacity-50 ${formData.type === 'video' && formData.video_source === 'youtube' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </>
                            ) : (
                                <><FiUpload /> {formData.type === 'image' ? 'Upload Image' : 'Save Video'}</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
