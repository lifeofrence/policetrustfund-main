"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock, FaUser } from "react-icons/fa";

const MissionVision = () => {
  const missionVision = [
    {
      id: 1,
      title: "Mission",
      description:
        "To build a well-trained, equipped and motivated Nigerian Police Force that is Proactive, Prompt and Responsive to security challenges Effectively and Efficiently, in line with global best practice.",
    },
    {
      id: 2,
      title: "Vision",
      description:
        "To provide the critical needs of the Nigeria Police Force and its institutions that would ensure the overall improvement and efficient discharge of their duties and responsibilities.",
    },
    {
      id: 3,
      title: "Objectives",
      description:
        "Our objective is to provide adequate resources for the training and re-training of personnel of the Nigeria Police Force and the provision of the state of the art security equipment and other related facilities for the enhancement of the skill of the personnel of the Nigeria Police in handling of operational equipment and machineries.",
    },
  ];

  return (
    <section className="bg-green-800 shadow-lg overflow-hidden py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 sm:mx-4 lg:mx-8 rounded-l-none sm:rounded-l-full my-8 sm:my-10 lg:my-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {missionVision.map((article) => (
            <div
              key={article.id}
              className="h-full space-y-4 border-2 border-white rounded-2xl group text-white p-6 sm:p-8 lg:p-10 hover:bg-white hover:text-black transition-all duration-300 hover:shadow-xl"
            >
              {/* Article Image */}
              <div className="relative w-full   rounded-lg overflow-hidden">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                  {article.title}
                </h2>
              </div>

              <div className="flex flex-col gap-4 justify-between">
                <p className=" text-sm sm:text-base leading-relaxed">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
