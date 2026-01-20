"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight,
  FaGraduationCap,
  FaTools,
  FaBuilding,
  FaHeartbeat,
  FaFlask,
  FaTruck,
} from "react-icons/fa";

interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  href: string;
  isFeatured?: boolean;
}

const ServicesGrid = () => {
  const services: Service[] = [
    {
      id: 1,
      number: "01",
      title: "Training and Development",
      description:
        "In today's dynamic policing environment, the key to success lies in strategic training and operational excellence. We provide comprehensive training programs to enhance the capabilities of our police force.",
      icon: FaGraduationCap,
      image: "/withelumelu.png",
      href: "/what-we-do/training",
      isFeatured: true,
    },
    {
      id: 2,
      number: "02",
      title: "Procurement of Equipment",
      description:
        "In today's dynamic policing environment, the key to success lies in strategic planning and operational excellence. We ensure our officers have access to modern equipment and tools.",
      icon: FaTools,
      href: "/what-we-do/procurement",
    },
    {
      id: 3,
      number: "03",
      title: "Infrastructural Development",
      description:
        "In today's dynamic policing environment, the key to success lies in strategic planning and operational excellence. We build and upgrade police stations and facilities across Nigeria.",
      icon: FaBuilding,
      href: "/what-we-do/infrastructure",
    },
    {
      id: 4,
      number: "04",
      title: "Welfare and Healthcare",
      description:
        "Ensuring the well-being of our police officers and their families through comprehensive healthcare services and welfare programs that support their physical and mental health.",
      icon: FaHeartbeat,
      href: "/what-we-do/welfare",
    },
    {
      id: 5,
      number: "05",
      title: "Research and Development",
      description:
        "Advancing policing through innovative research, data analysis, and development of new strategies to improve law enforcement effectiveness and community relations.",
      icon: FaFlask,
      href: "/what-we-do/research",
    },
    {
      id: 6,
      number: "06",
      title: "Logistic and Operational Support",
      description:
        "Providing essential logistical support and operational resources to ensure the Nigeria Police Force can effectively carry out their duties and maintain public safety.",
      icon: FaTruck,
      href: "/what-we-do/logistic",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                service.isFeatured
                  ? "bg-[#0B1120] text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-[#0B1120] hover:text-white"
              }`}
            >
              {/* Background Image for Featured Card */}
              {service.isFeatured && service.image && (
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-[#0B1120]/80"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative p-6 sm:p-8 flex flex-col h-full">
                {/* Icon and Number */}
                <div className="mb-6">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 ${
                      service.isFeatured ? "bg-white" : "bg-white"
                    }`}
                  >
                    <IconComponent
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${
                        service.isFeatured ? "text-[#006400]" : "text-[#006400]"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-3xl sm:text-4xl font-bold transition-colors duration-300 ${
                      service.isFeatured
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${
                    service.isFeatured
                      ? "text-white"
                      : "text-[#0B1120] group-hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={`flex-1 leading-relaxed mb-6 text-sm sm:text-base transition-colors duration-300 ${
                    service.isFeatured
                      ? "text-gray-200"
                      : "text-gray-700 group-hover:text-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  {service.description}
                </p>

                {/* View Details Link */}
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3 ${
                    service.isFeatured
                      ? "text-white hover:text-yellow-300"
                      : "text-[#006400] group-hover:text-yellow-300"
                  }`}
                >
                  <span
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    View details
                  </span>
                  <FaArrowRight className="w-4 h-4" />
                </Link>

                {/* Decorative Dot for Featured Card */}
                {service.isFeatured && (
                  <div className="absolute top-8 right-8 w-3 h-3 bg-[#006400] rounded-full ring-4 ring-[#006400]/30"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesGrid;
