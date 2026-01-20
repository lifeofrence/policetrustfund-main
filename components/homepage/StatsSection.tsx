"use client";

import React from "react";

const StatsSection = () => {
  const stats = [
    {
      value: "10702",
      label: "Police Officers Trained",
    },
    {
      value: "76",
      label: "New Police Infrastructures",
    },
    {
      value: "52",
      label: "Upgraded Police Stations",
    },
    {
      value: "72",
      label: "Upgraded Police Barracks",
    },
    {
      value: "28",
      label: "Ongoing Projects",
    },
  ];

  return (
    <section className="relative bg-[#0a1a2e] py-16 lg:py-20 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0zM0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Blurred decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              {/* Vertical divider - only show between items, not on last */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-600/30"></div>
              )}

              {/* Number with yellow outline effect */}
              <div className="mb-4">
                <span
                  className="text-5xl md:text-6xl lg:text-7xl font-bold block"
                  style={{
                    WebkitTextStroke: "3px #fbbf24",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    fontFamily: "var(--font-merriweather), serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
              </div>

              {/* Label */}
              <p
                className="text-white text-sm md:text-base font-medium max-w-[150px] leading-tight"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
