"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
import { apiGet } from "@/lib/api";
import StatsSection from "../homepage/StatsSection";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "completed" | "ongoing" | "upcoming";
  location: string;
  start_date: string;
  end_date?: string;
  image: string;
  impact?: string;
  created_at: string;
  updated_at: string;
}

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiGet<Project[]>('/projects', false);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            <FaCheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <FaClock className="w-3 h-3" />
            Ongoing
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            <FaCalendarAlt className="w-3 h-3" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return "";
    }
  };

  const getProjectDateDisplay = (project: Project) => {
    const start = formatDate(project.start_date);
    const end = project.end_date ? formatDate(project.end_date) : null;

    if (!end || start === end) {
      return start;
    }
    return `${start} - ${end}`;
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
            <p
              className="text-[#006400] text-sm font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Our Projects
            </p>
            <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Transforming Policing in Nigeria
          </h1>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Explore our impactful projects and initiatives designed to enhance
            the capabilities and effectiveness of the Nigeria Police Force
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="w-5 h-5 text-[#006400]" />
            <h2
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Filter by Category
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                  ? "bg-[#006400] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#006400] cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-200">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex-grow">
                    {/* Category */}
                    <span
                      className="inline-block px-3 py-1 bg-green-50 text-[#006400] text-xs font-semibold rounded-full mb-3"
                      style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                    >
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#006400] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-merriweather), serif" }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-gray-600 text-sm sm:text-base mb-6 line-clamp-3"
                      style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                    >
                      {project.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4 text-[#006400] shrink-0" />
                        <span
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          {project.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt className="w-4 h-4 text-[#006400] shrink-0" />
                        <span
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                          suppressHydrationWarning
                        >
                          {getProjectDateDisplay(project)}
                        </span>
                      </div>
                    </div>

                    {/* Impact */}
                    {project.impact && (
                      <div className="mb-6 p-3 bg-green-50 rounded-lg border-l-4 border-[#006400]">
                        <p
                          className="text-sm font-semibold text-[#006400]"
                          style={{
                            fontFamily: "var(--font-work-sans), sans-serif",
                          }}
                        >
                          Impact: {project.impact}
                        </p>
                      </div>
                    )}

                    {/* Read More Link (now span/div as parent is Link) */}
                    <div
                      className="inline-flex items-center gap-2 text-[#006400] font-semibold hover:gap-3 transition-all duration-300 group-hover:text-[#004d00]"
                      style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                    >
                      <span>Learn More</span>
                      <FaArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p
                  className="text-gray-600 text-lg"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  {selectedCategory === "All"
                    ? "No projects available at the moment."
                    : "No projects found in this category."}
                </p>
              </div>
            )}
          </>
        )}

        <div className="my-15 sm:my-20 lg:my-36">
          <StatsSection />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
