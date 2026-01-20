"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaDownload, FaAsterisk } from "react-icons/fa";

const WhyPartnerNPTF = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    {
      value: "93%",
      label: "Project Completion",
    },
    {
      value: "10K+",
      label: "Officers Trained",
    },
    {
      value: "₦500M+",
      label: "Funds Disbursed",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Section - Text and Statistics */}
        <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-full">
            <FaAsterisk className="w-4 h-4" />
            <span className="text-sm font-medium">Why Partner NPTF</span>
          </div>

          {/* Main Text */}
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
            Partnering with the Nigeria Police Trust Fund means joining a
            mission to strengthen national security and empower the Nigeria
            Police Force with the resources, training, and technology they need.
            Our commitment to transparency, accountability, and impactful
            service delivery ensures that every partnership drives real change.
            Together, we can build a more secure, professional, and
            community-focused policing system for the benefit of all Nigerians.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-gray-300">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Vertical divider */}
                {index < stats.length - 1 && (
                  <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300"></div>
                )}

                {/* Stat Value */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">
                  {stat.value}
                </span>

                {/* Stat Label */}
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Video Player Overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          {/* Background Image */}
          <div className="relative w-full h-64 sm:h-80 lg:h-96">
            <video
              src="/benefitvideo.mp4"
              controls
              //autoPlay
              muted
              loop
              className="object-cover w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerNPTF;
