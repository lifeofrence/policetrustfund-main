"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface TimelineEvent {
  id: number;
  number: string;
  title: string;
  description: string;
  year: string;
  images: string[];
  position: "left" | "right";
  isActive?: boolean;
}

const HistoryTimeline = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      number: "01",
      title: "Act of Establishment",
      description:
        "The Nigeria Police Trust Fund (NPTF) was established by an Act of the National Assembly — the Nigeria Police Trust Fund (Establishment) Act, 2019.This legislation was enacted to provide a legal framework for the administration, management, and disbursement of funds for the training, welfare, infrastructural development of the Nigeria Police Force, and adopting modern policing practices to ensure the safety and security of Nigeria's citizens.The Act ensures that funding is adequately sourced from both public and private sectors to support the overall reform and modernization of policing in Nigeria.",
      year: "2019",
      images: ["/withelumelu.png", "/withpolice.png"],
      position: "left",
    },
    {
      id: 2,
      number: "02",
      title: "Year of Establishment",
      description:
        "The Nigeria Police Trust Fund was officially established in the year **2019** following the passage and signing into law of the NPTF (Establishment) Act. The creation of the Fund was part of a broader initiative by the Federal Government to reform the Nigeria Police Force and provide sustainable funding to improve its operations, welfare, and service delivery.Its creation marked a pivotal moment in the reform and modernization efforts of the Nigeria Police Force, aimed at enhancing service delivery and aligning the institution with international standards in law enforcement.",
      year: "June 24, 2019",
      images: ["/conference.png", "/withelumelu.png"],
      position: "right",
    },
    {
      id: 3,
      number: "03",
      title: "Date of Commencement of Operation",
      description:
        " The Nigeria Police Trust Fund **commenced operations on the 1st of July, 2020**, following the inauguration of its Board of Trustees. This marked the beginning of the Fund’s full-scale implementation of its mandate, including financial support, capacity building, equipment procurement, and infrastructure development for the Nigeria Police Force across the country.Since then, it has been actively working to fulfill its mandate by improving police welfare, providing essential infrastructure, and enabling the procurement of modern tools and technology for the Nigeria Police Force.",
      year: "July 1st, 2020",
      images: ["/withpolice.png", "/conference.png"],
      position: "left",
    },
    {
      id: 4,
      number: "04",
      title: "Global expansion and diversification",
      description:
        "Our mission is to empower police forces across Nigeria to thrive in an ever-changing security landscape. We are committed to delivering exceptional value through strategic partnerships and innovative solutions.",
      year: "2024",
      images: ["/withelumelu.png", "/withpolice.png"],
      position: "right",
      isActive: true,
    },
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          {/* Left Column - Title */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
              <p className="text-[#006400] text-sm font-semibold uppercase tracking-wider">
                OUR BACKGROUND
              </p>
              <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              How We Started The Journey To Build An Innovative Future At All
              Levels
            </h2>
          </div>

          {/* Right Column - Mission Statement */}
          <div className="space-y-4">
            <p
              className="text-gray-700 leading-relaxed text-sm sm:text-base"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Our mission is to empower police officers and their families to
              thrive in an ever-changing environment. We are committed to
              delivering exceptional value through our strategic initiatives and
              innovative approaches that strengthen the capabilities of the
              police for better service delivery to all citizens.
            </p>
            <p
              className="text-gray-600 leading-relaxed text-sm sm:text-base pl-4 border-l-4 border-[#006400]"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Committed to delivering exceptional value through our strategic
              initiatives and innovative approaches that empower.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#006400] hover:bg-[#004d00] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
            >
              <FaArrowRight className="w-4 h-4" />
              <span>Learn more</span>
            </Link>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

          {/* Timeline Events */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className="relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-6 items-center"
              >
                {/* Year Display - Left Side (for left position events) */}
                {event.position === "left" && (
                  <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-6">
                    <div className="relative text-right">
                      <span
                        className={`text-4xl lg:text-5xl font-bold ${
                          event.isActive ? "text-[#006400]" : "text-gray-400"
                        }`}
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {event.year}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Block - Left Side (for right position events) */}
                {event.position === "right" && (
                  <div className="hidden lg:flex lg:col-span-8 items-center">
                    <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                      {/* Number and Title */}
                      <div className="mb-4">
                        <span
                          className="text-2xl sm:text-3xl font-bold text-gray-400 mb-2 block"
                          style={{
                            fontFamily: "var(--font-merriweather), serif",
                          }}
                        >
                          {event.number}.
                        </span>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-gray-900"
                          style={{
                            fontFamily: "var(--font-merriweather), serif",
                          }}
                        >
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        {event.description}
                      </p>

                      {/* Images Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {event.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative w-full aspect-square rounded-lg overflow-hidden"
                          >
                            <Image
                              src={image}
                              alt={`${event.title} - Image ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline Center with Dot */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative z-10">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.isActive
                        ? "bg-[#006400] ring-4 ring-green-200"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>

                {/* Content Block - Right Side (for left position events) */}
                {event.position === "left" && (
                  <div className="hidden lg:flex lg:col-span-8 items-center">
                    <div className="w-full bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                      {/* Number and Title */}
                      <div className="mb-4">
                        <span
                          className="text-2xl sm:text-3xl font-bold text-gray-400 mb-2 block"
                          style={{
                            fontFamily: "var(--font-merriweather), serif",
                          }}
                        >
                          {event.number}.
                        </span>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-gray-900"
                          style={{
                            fontFamily: "var(--font-merriweather), serif",
                          }}
                        >
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        {event.description}
                      </p>

                      {/* Images Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {event.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative w-full aspect-square rounded-lg overflow-hidden"
                          >
                            <Image
                              src={image}
                              alt={`${event.title} - Image ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Year Display - Right Side (for right position events) */}
                {event.position === "right" && (
                  <div className="hidden lg:flex lg:col-span-3 items-center justify-start pl-6">
                    <div className="relative">
                      <span
                        className={`text-4xl lg:text-5xl font-bold ${
                          event.isActive ? "text-[#006400]" : "text-gray-400"
                        }`}
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {event.year}
                      </span>
                    </div>
                  </div>
                )}

                {/* Mobile Content Block (always shown) */}
                <div className="lg:hidden w-full">
                  <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300">
                    {/* Number and Title */}
                    <div className="mb-4">
                      <span
                        className="text-2xl sm:text-3xl font-bold text-gray-400 mb-2 block"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {event.number}.
                      </span>
                      <h3
                        className="text-xl sm:text-2xl font-bold text-gray-900"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p
                      className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      {event.description}
                    </p>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {event.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative w-full aspect-square rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${event.title} - Image ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Year Display */}
                <div className="lg:hidden flex items-center gap-4 w-full mt-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span
                    className={`text-2xl font-bold ${
                      event.isActive ? "text-[#006400]" : "text-gray-400"
                    }`}
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    {event.year}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.isActive
                        ? "bg-[#006400] ring-4 ring-green-200"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
