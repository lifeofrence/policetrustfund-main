"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaClock, FaUser } from "react-icons/fa";

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
  updated_at: string;
}

const HomeNews = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_BASE_URL}/news?per_page=3`);
      const data = await response.json();

      // Filter only published articles and take first 3
      const publishedArticles = data.data.filter((article: NewsArticle) => article.published_at);
      setNewsArticles(publishedArticles.slice(0, 3));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="mx-auto my-15 sm:my-20 lg:my-36 bg-green-800 shadow-lg overflow-hidden py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 sm:mx-4 lg:mx-8 rounded-l-none sm:rounded-md">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading latest news...</p>
        </div>
      </section>
    );
  }

  if (newsArticles.length === 0) {
    return null; // Don't show section if no news
  }

  return (
    <section className="mx-auto my-15 sm:my-20 lg:my-36  bg-green-800 shadow-lg overflow-hidden py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 sm:mx-4 lg:mx-8 rounded-l-none sm:rounded-md ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <div className="w-12 sm:w-16 h-1 bg-white rounded-full"></div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Latest News
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="h-full space-y-4 border-2 border-white rounded-2xl group text-white p-6 sm:p-8 lg:p-10 hover:bg-white hover:text-black transition-all duration-300 hover:shadow-xl"
            >
              {/* Article Image */}
              <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden bg-gray-200">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="flex flex-col gap-4 justify-between">
                {/* Metadata */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 flex-wrap">
                  <p
                    className="flex flex-row gap-2 items-center font-medium text-sm sm:text-base"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    <FaUser className="w-4 h-4" />
                    {article.author}
                  </p>
                  <p
                    className="flex flex-row gap-2 items-center font-medium text-sm sm:text-base"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    <FaClock className="w-4 h-4" />
                    <span>{formatDate(article.published_at)}</span>
                  </p>
                </div>

                {/* Title */}
                <h2
                  className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight line-clamp-3"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  {article.title}
                </h2>

                {/* Read More Button */}
                <Link href={`/news/${article.id}`}>
                  <button
                    className="w-full sm:w-auto bg-white text-green-800 px-6 py-3 rounded-full font-medium group-hover:bg-green-800 group-hover:text-white transition-all duration-300 hover:shadow-lg"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
