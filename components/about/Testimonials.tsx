"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { apiGet } from "@/lib/api";

interface Testimonial {
  id: number;
  content: string;
  name: string;
  position: string;
  organization?: string;
  rating: number;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await apiGet<Testimonial[]>('/testimonials', false);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.ceil(testimonials.length / 2) - 1;
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrolling, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(testimonials.length / 2) - 1;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(testimonials.length / 2) - 1;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const handleDotClick = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  };

  // Get current pair of testimonials
  const getCurrentTestimonials = () => {
    if (testimonials.length === 0) return [null, null];
    const startIndex = currentIndex * 2;
    return [testimonials[startIndex], testimonials[startIndex + 1] || null];
  };

  const [testimonial1, testimonial2] = getCurrentTestimonials();
  const totalSlides = Math.ceil(testimonials.length / 2);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${index < rating
          ? "text-[#0B1120] fill-current"
          : "text-[#0B1120] fill-none"
          }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="max-w-7xl bg-yellow-50 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-blue-900">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl bg-yellow-50 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <p className="text-blue-600 text-sm font-semibold mb-2">
            • TESTIMONIALS •
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
            People's talk about NPTF services
          </h2>
        </div>

        {/* Navigation Arrows */}
        {testimonials.length > 2 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Testimonials Grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8"
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        {/* First Testimonial Card */}
        {testimonial1 && (
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden h-full flex flex-col">
            {/* Quotation Mark */}
            <FaQuoteLeft className="absolute top-6 left-6 sm:top-8 sm:left-8 text-blue-600 text-5xl sm:text-6xl opacity-20" />

            {/* Testimonial Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Testimonial Text */}
              <p className="text-gray-800 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base flex-grow">
                {testimonial1.content}
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                {/* Name and Title */}
                <div className="flex-1">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(testimonial1.rating)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1120] mb-1">
                    {testimonial1.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0B1120]">
                    {testimonial1.position}
                    {testimonial1.organization && ` - ${testimonial1.organization}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Second Testimonial Card */}
        {testimonial2 && (
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden h-full flex flex-col">
            {/* Quotation Mark */}
            <FaQuoteLeft className="absolute top-6 left-6 sm:top-8 sm:left-8 text-blue-600 text-5xl sm:text-6xl opacity-20" />

            {/* Testimonial Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Testimonial Text */}
              <p
                className="text-gray-800 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base flex-grow"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {testimonial2.content}
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                {/* Name and Title */}
                <div className="flex-1">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(testimonial2.rating)}
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-blue-900 mb-1"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    {testimonial2.name}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    {testimonial2.position}
                    {testimonial2.organization && ` - ${testimonial2.organization}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Indicators */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 ${index === currentIndex
                ? "w-3 h-3 bg-blue-600"
                : "w-2 h-2 bg-blue-600 rounded-full opacity-50 hover:opacity-75"
                }`}
              style={
                index === currentIndex
                  ? {
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }
                  : {}
              }
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
