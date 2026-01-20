"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const HomeSteps = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Needs Assessment",
      description:
        "We engage closely with the Nigeria Police Force and relevant stakeholders to identify critical operational, infrastructural, and welfare needs, ensuring that resources are allocated to areas of greatest impact.",
      image: "/news1.jpeg",
    },
    {
      id: 2,
      number: "02",
      title: "Strategic Planning",
      description:
        "Following thorough assessments, we develop structured plans to deploy funds, projects, and initiatives efficiently, maintaining transparency and strict adherence to regulatory and operational standards.",
      image: "/news1.jpeg",
    },
    {
      id: 3,
      number: "03",
      title: "Implementation and Monitoring",
      description:
        "Approved projects and services are executed through certified contractors and suppliers, with robust monitoring and evaluation systems to ensure quality delivery, compliance, and timely completion.",
      image: "/news1.jpeg",
    },
    {
      id: 4,
      number: "04",
      title: "Reporting and Accountability",
      description:
        "We maintain detailed documentation and provide periodic reports to oversight bodies and the public, reinforcing our commitment to transparency, accountability, and continuous improvement.",
      image: "/news1.jpeg",
    },
  ];

  return (
    <section className="mx-auto my-15 sm:my-20 lg:my-36  bg-white shadow-lg overflow-hidden py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Section Header */}
        <div className="flex flex-row gap-4 items-center">
          <div className="w-12 sm:w-16 h-1 bg-black rounded-full"></div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Our Operation Process
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="h-full space-y-4 border-2 border-green-800 rounded-2xl group text-black p-5 sm:p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon/Image */}
              <div className="bg-green-100 w-fit rounded-full p-3">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Step Number */}
              <p
                className="text-gray-500 text-xl sm:text-2xl font-medium"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {step.number}
              </p>

              {/* Content */}
              <div className="flex flex-col gap-4 justify-between">
                <h2
                  className="text-lg sm:text-xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  {step.title}
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  {step.description}
                </p>
                <Link href="/about">
                  <button
                    className="text-green-800 flex flex-row gap-2 items-center font-medium hover:gap-3 transition-all duration-300 group-hover:text-green-600"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    Get Started <FaArrowRight />
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

export default HomeSteps;
