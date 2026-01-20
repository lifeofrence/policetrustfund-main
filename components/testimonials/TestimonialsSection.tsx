"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { apiGet } from "@/lib/api";

interface Testimonial {
  id: number;
  name: string;
  email: string;
  position: string;
  organization: string;
  content: string;
  rating: number;
  status: string;
  created_at: string;
}

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await apiGet<any>('/testimonials', false);
      const items = data.data || data;
      setTestimonials(items);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && !isHovered && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrolling, isHovered, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${index < rating
          ? "text-[#006400] fill-current"
          : "text-gray-300 fill-current"
          }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="bg-green-50 min-h-screen py-12 sm:py-16 lg:py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-green-50 min-h-screen py-12 sm:py-16 lg:py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-50 min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-12 sm:w-16 h-1 bg-[#006400] rounded-full mx-auto mb-6"></div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            What People Say About Us
          </h1>
          <p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Hear from police officers and stakeholders about the impact of the
            Nigeria Police Trust Fund
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div
          className="relative mb-12"
          onMouseEnter={() => {
            setIsHovered(true);
            setIsAutoScrolling(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsAutoScrolling(true);
          }}
        >
          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#006400] hover:bg-[#006400] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#006400] hover:bg-[#006400] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Testimonial Cards Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-4 sm:px-8"
                >
                  <div className="max-w-4xl mx-auto">
                    {/* Main Testimonial Card */}
                    <div className="bg-white rounded-2xl shadow-lg border-l-4 border-[#006400] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                        <FaQuoteLeft className="w-16 h-16 sm:w-20 sm:h-20 text-[#006400] opacity-20" />
                      </div>

                      {/* User Icon Badge */}
                      <div className="absolute top-0 left-0 bg-[#006400] px-6 py-3 rounded-br-2xl">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 pt-8">
                        {/* Testimonial Text */}
                        <p
                          className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          {testimonial.content}
                        </p>

                        {/* Author Info */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <h3
                              className="text-lg sm:text-xl font-bold text-[#006400] mb-1"
                              style={{
                                fontFamily: "var(--font-merriweather), serif",
                              }}
                            >
                              {testimonial.name}
                            </h3>
                            <p
                              className="text-sm sm:text-base text-gray-600"
                              style={{
                                fontFamily: "var(--font-work-sans), sans-serif",
                              }}
                            >
                              {testimonial.position}
                              {testimonial.organization && ` - ${testimonial.organization}`}
                            </p>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${index === currentIndex
                  ? "w-3 h-3 bg-[#006400] rounded-full"
                  : "w-2 h-2 bg-[#006400] rounded-full opacity-40 hover:opacity-60"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* All Testimonials Grid (Secondary View) */}
        {testimonials.length > 1 && (
          <div className="mt-16 sm:mt-20">
            <h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              All Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border-l-4 ${index % 3 === 0
                    ? "border-[#006400]"
                    : index % 3 === 1
                      ? "border-blue-500"
                      : "border-yellow-500"
                    } cursor-pointer hover:-translate-y-2`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoScrolling(false);
                  }}
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <FaQuoteLeft className="w-8 h-8 text-[#006400] opacity-30" />
                  </div>

                  {/* Text Preview */}
                  <p
                    className="text-gray-600 text-sm sm:text-base mb-6 line-clamp-3"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                  >
                    {testimonial.content}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className="text-base font-bold text-[#006400] mb-1"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className="text-xs sm:text-sm text-gray-600"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        {testimonial.position}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsPage;
