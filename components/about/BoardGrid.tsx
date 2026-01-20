"use client";

import React from "react";
import Image from "next/image";

interface BoardMember {
  id: number;
  name: string;
  title: string;
  image: string;
}

const BoardGrid = () => {
  const boardMembers: BoardMember[] = [
    {
      id: 3,
      name: "Senator Ibrahim Gaidam",
      title: "Minister of Police Affairs",
      image: "/minister.jpg",
    },
    {
      id: 1,
      name: "IGP Olukayode Ebetokun",
      title: " Inspector General of Police",
      image: "/Inspector-General.jpg",
    },
    {
      id: 2,
      name: "Femi Mohammed ",
      title: "Executive Secretary",
      image: "/md.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {boardMembers.map((member) => (
          <div
            key={member.id}
            className="group relative overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:-translate-y-2 cursor-pointer"
          >
            {/* Portrait Image */}
            <div className="relative w-full aspect-3/4 bg-blue-50 overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay that appears on hover */}
              <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-all duration-500"></div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0B1120]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Name and Title Panel - Always visible at bottom */}
            <div className="bg-[#0B1120] text-white p-4 sm:p-5 group-hover:bg-[#006400] transition-colors duration-500">
              <h3
                className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-yellow-300 transition-colors duration-500"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                {member.name}
              </h3>
              <p
                className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors duration-500"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {member.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardGrid;
