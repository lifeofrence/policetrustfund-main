"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaComment,
  FaTimes,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  event_name: string;
  type: "image" | "video";
  media: string;
  thumbnail: string | null;
  date: string;
  created_at: string;
}

const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<{
    item: GalleryItem;
    index: number;
    eventItems: GalleryItem[];
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

      // Fetch gallery items
      const itemsResponse = await fetch(`${API_BASE_URL}/gallery`);
      const items = await itemsResponse.json();
      setGalleryItems(items);

      // Fetch event names
      const eventsResponse = await fetch(`${API_BASE_URL}/gallery/events/list`);
      const eventNames = await eventsResponse.json();
      setEvents(eventNames);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = galleryItems
    .filter((item) => {
      const matchesEvent = selectedEvent === "all" || item.event_name === selectedEvent;
      const matchesType = selectedType === "all" || item.type === selectedType;
      return matchesEvent && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.created_at).getTime();
      const dateB = new Date(b.date || b.created_at).getTime();
      return dateB - dateA; // Newest first
    });

  const openModal = (item: GalleryItem) => {
    // Get all items from the same event for navigation
    const eventItems = galleryItems.filter(i => i.event_name === item.event_name);
    const index = eventItems.findIndex((i) => i.id === item.id);
    setSelectedItem({ item, index, eventItems });
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const navigateMedia = (direction: "prev" | "next") => {
    if (!selectedItem) return;

    const { eventItems, index } = selectedItem;
    let newIndex = direction === "next" ? index + 1 : index - 1;

    // Handle wrapping
    if (newIndex < 0) {
      newIndex = eventItems.length - 1;
    } else if (newIndex >= eventItems.length) {
      newIndex = 0;
    }

    setSelectedItem({
      item: eventItems[newIndex],
      index: newIndex,
      eventItems,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();
    return { day, month, year };
  };

  return (
    <>
      <section className="bg-white min-h-screen py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <div className="w-12 sm:w-16 h-1 bg-[#006400] rounded-full mb-4"></div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Gallery
            </h1>
            <p
              className="text-gray-600 text-base sm:text-lg mb-6"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Explore our collection of images and videos from various events
              and activities
            </p>

            {/* Gallery Filters */}
            <div className="space-y-4">
              {/* <div className="flex flex-wrap gap-2">
                <span className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Filter by Event</span>
                <button
                  onClick={() => setSelectedEvent("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedEvent === "all"
                    ? "bg-[#006400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  All Events
                </button>
                {events.map((event) => (
                  <button
                    key={event}
                    onClick={() => setSelectedEvent(event)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedEvent === event
                      ? "bg-[#006400] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    {event}
                  </button>
                ))}
              </div> */}

              <div className="flex flex-wrap gap-2">
                <span className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Filter by Category</span>
                <button
                  onClick={() => setSelectedType("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedType === "all"
                    ? "bg-[#006400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  All Media
                </button>
                <button
                  onClick={() => setSelectedType("image")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedType === "image"
                    ? "bg-[#006400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  Photos
                </button>
                <button
                  onClick={() => setSelectedType("video")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedType === "video"
                    ? "bg-[#006400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  Videos
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => {
                const formattedDate = formatDate(item.date || item.created_at);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    {/* Media Container */}
                    <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-200">
                      {item.type === "image" ? (
                        item.media ? (
                          <Image
                            src={item.media}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )
                      ) : (
                        <div className="relative w-full h-full">
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <span className="text-white">Video</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-16 h-16 bg-[#006400] rounded-full flex items-center justify-center">
                              <FaPlay className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Date Overlay */}
                      <div className="absolute bottom-0 left-0 bg-[#006400] text-white px-4 py-3">
                        <div
                          className="text-3xl font-bold leading-none"
                          style={{
                            fontFamily: "var(--font-merriweather), serif",
                          }}
                        >
                          {formattedDate.day}
                        </div>
                        <div
                          className="text-xs font-medium mt-1"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          {formattedDate.month}, {formattedDate.year}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Metadata */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div
                          className="flex items-center gap-2"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          <FaUser className="w-4 h-4 text-[#006400]" />
                          <span>NPTF Admin</span>
                        </div>
                        <div
                          className="px-2 py-1 bg-green-50 text-[#006400] text-xs font-semibold rounded"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          {item.event_name}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#006400] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-merriweather), serif" }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p
                          className="text-sm text-gray-600 mt-2 line-clamp-2"
                          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p
                className="text-gray-600 text-lg"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {selectedEvent === "all" && selectedType === "all"
                  ? "No gallery items available at the moment."
                  : "No items found matching your current filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal/Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            {selectedItem.eventItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Media Content */}
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              {selectedItem.item.type === "image" ? (
                <Image
                  src={selectedItem.item.media}
                  alt={selectedItem.item.title}
                  fill
                  className="object-contain"
                />
              ) : selectedItem.item.media.includes("youtube.com") || selectedItem.item.media.includes("youtu.be") ? (
                <iframe
                  src={selectedItem.item.media}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedItem.item.title}
                ></iframe>
              ) : (
                <video
                  src={selectedItem.item.media}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Media Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                {selectedItem.item.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                  }}
                >
                  <FaUser className="w-4 h-4" />
                  <span>NPTF Admin</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                  }}
                >
                  <span>{selectedItem.item.event_name}</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                  }}
                >
                  <span>
                    {selectedItem.index + 1} of{" "}
                    {selectedItem.eventItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
