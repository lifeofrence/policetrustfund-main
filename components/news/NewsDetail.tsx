"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaArrowLeft, FaCalendarAlt, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useParams } from "next/navigation";

interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    image: string;
    published_at: string;
    created_at: string;
}

const NewsDetail = () => {
    const params = useParams();
    const id = params.id;
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
            const response = await fetch(`${API_BASE_URL}/news/${id}`);

            if (!response.ok) {
                throw new Error("News article not found");
            }

            const data = await response.json();
            setArticle(data.data || data); // Handle both {data: ...} and direct object
        } catch (err) {
            console.error('Error fetching news:', err);
            setError("Failed to load news article. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading news content...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-6 border border-red-100 italic">
                        {error || "Article not found"}
                    </div>
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#006400] text-white rounded-lg hover:bg-[#004d00] transition-all duration-300 font-semibold shadow-lg"
                    >
                        <FaArrowLeft /> Back to News
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="bg-[#fcfdfc] min-h-screen">
            {/* Featured Image Header */}
            <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh]">
                {article.image ? (
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        {article.category && (
                            <span className="inline-block px-4 py-1.5 bg-[#006400] text-white text-xs sm:text-sm font-bold rounded-full mb-4 md:mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                                {article.category}
                            </span>
                        )}
                        <h1
                            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 max-w-4xl"
                            style={{ fontFamily: 'var(--font-merriweather), serif' }}
                        >
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-white/90 text-sm sm:text-base font-medium">
                            <div className="flex items-center gap-2">
                                <FaUser className="text-[#00c800]" />
                                <span>{article.author || 'NPTF Editorial Team'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-[#00c800]" />
                                <span>{formatDate(article.published_at || article.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#006400] font-bold transition-colors group"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span>Back to All News</span>
                            </Link>

                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Share:</span>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all">
                                        <FaFacebookF className="w-3 h-3" />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all">
                                        <FaTwitter className="w-3 h-3" />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-all">
                                        <FaLinkedinIn className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className="prose prose-lg max-w-none prose-headings:font-merriweather prose-p:font-work-sans prose-p:text-gray-700 prose-p:leading-loose prose-a:text-[#006400] prose-img:rounded-2xl"
                            style={{ fontFamily: 'var(--font-work-sans), sans-serif' }}
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tag/Category Footer if needed */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg pointer-events-none">#NigeriaPolice</span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg pointer-events-none">#NPTF</span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg pointer-events-none">#Security</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default NewsDetail;
