"use client";

import React from "react";
import Link from "next/link";
import {
  FaShieldAlt,
  FaHandHoldingHeart,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-linear-to-br from-[#006400] via-[#008000] to-[#006400] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <FaShieldAlt className="w-4 h-4" />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  Trusted & Reliable
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Building an <span className="text-yellow-300">innovative</span>{" "}
                Future at all levels
              </h1>
            </div>

            {/* Right Column - Visual Element */}
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 sm:h-16 lg:h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M0,0 C300,100 600,20 900,50 C1050,65 1125,55 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Three Column Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mt-20 sm:-mt-24 lg:-mt-28 z-10 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="h-full space-y-4 bg-green-800 text-white p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="/withelumelu.png"
              alt="Building an Innovative Future"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            Building an Innovative Future at all levels
          </h2>
          <p
            className="text-sm sm:text-base uppercase font-medium leading-relaxed"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            The Police Trust Fund is dedicated to providing financial support,
            resources, and assistance to our brave officers and their families,
            ensuring they can serve with confidence and security.
          </p>
        </div>

        <div className="h-full space-y-4 bg-white text-black p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white transition-all duration-300">
          <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="/withpolice.png"
              alt="Optimal Performance and Service Delivery"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            We provide optimal performance and effective service delivery
          </h2>
          <p
            className="text-sm sm:text-base uppercase font-medium leading-relaxed"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We are committed to delivering high-quality services that meet the
            needs of our clients and stakeholders.
          </p>
        </div>

        <div className="h-full space-y-4 bg-white text-black p-6 sm:p-8 lg:p-10  shadow-lg hover:shadow-xl hover:bg-green-800 hover:text-white transition-all duration-300">
          <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="/conference.png"
              alt="Culture of Moral Rectitude"
              fill
              className="object-cover"
            />
          </div>
          <h2
            className="text-lg sm:text-xl font-bold"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            We Maintain a culture of moral rectitude, respect and adherence
          </h2>
          <p
            className="text-sm sm:text-base uppercase font-medium leading-relaxed"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We are committed to maintaining a culture of moral rectitude,
            respect, and adherence to the law, ensuring that our officers and
            stakeholders can serve with confidence and security.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
