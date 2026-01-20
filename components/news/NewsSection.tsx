"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaClock, FaUser, FaArrowRight, FaSearch } from "react-icons/fa";

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

const NewsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_BASE_URL}/news?per_page=100`);
      const data = await response.json();

      // Filter only published articles
      const publishedArticles = data.data.filter((article: NewsArticle) => article.published_at);
      setNewsArticles(publishedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = newsArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-white min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
            <div>
              <div className="w-12 sm:w-16 h-1 bg-[#006400] rounded-full mb-4"></div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Latest News
              </h1>
              <p
                className="text-gray-600 text-base sm:text-lg"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                Stay updated with the latest developments and initiatives from
                the Nigeria Police Trust Fund
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400] focus:border-transparent"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
            <p className="mt-4 text-gray-600">Loading news articles...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-[#006400]"
              >
                {/* Article Image */}
                <Link href={`/news/${article.id}`}>
                  <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-200">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 bg-[#006400] text-white text-xs font-semibold rounded-full"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Article Content */}
                <div className="p-6 sm:p-8">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      <FaUser className="w-4 h-4" />
                      <span>{article.author || 'NPTF Admin'}</span>
                    </div>
                    <div
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      <FaClock className="w-4 h-4" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/news/${article.id}`}>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#006400] transition-colors duration-300 leading-tight"
                      style={{ fontFamily: "var(--font-merriweather), serif" }}
                    >
                      {article.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p
                      className="text-gray-600 mb-6 line-clamp-3 leading-relaxed"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      {article.excerpt}
                    </p>
                  )}

                  {/* Read More Link */}
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center gap-2 text-[#006400] font-semibold hover:text-[#004d00] transition-colors duration-300 group/link"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    <span>Read More</span>
                    <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              {searchQuery ? 'No news articles found matching your search.' : 'No news articles available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
