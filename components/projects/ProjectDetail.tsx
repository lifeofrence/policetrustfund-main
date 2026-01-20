"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowLeft, FaCheck } from "react-icons/fa";
import { apiGet } from "@/lib/api";
import { useParams } from "next/navigation";

interface Project {
    id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    status: string;
    image: string;
    start_date: string;
    end_date?: string;
    budget?: string;
    impact?: string;
    created_at: string;
}

const ProjectDetail = () => {
    const params = useParams();
    const id = params.id;
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const data = await apiGet<any>(`/projects/${id}`, false);
            setProject(data.data || data);
        } catch (err) {
            console.error('Error fetching project:', err);
            setError("Failed to load project details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
        return `${start} — ${end}`;
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#006400]"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-6 border border-red-100 italic">
                        {error || "Project not found"}
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#006400] text-white rounded-lg hover:bg-[#004d00] transition-all duration-300 font-semibold shadow-lg"
                    >
                        <FaArrowLeft /> Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh]">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-[#006400] text-white text-xs sm:text-sm font-bold rounded-full mb-4 shadow-lg">
                            {project.category}
                        </span>
                        <h1
                            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-merriweather), serif' }}
                        >
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white font-medium">
                            <div className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg">
                                <FaMapMarkerAlt className="text-[#00c800]" />
                                <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg">
                                <span className={`w-3 h-3 rounded-full ${project.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                                <span>{project.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#006400] font-bold mb-8 transition-colors group"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span>Back to All Projects</span>
                            </Link>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-merriweather), serif' }}>Project Overview</h2>
                            <p className="text-gray-700 text-lg leading-relaxed lg:text-xl font-normal" style={{ fontFamily: 'var(--font-work-sans), sans-serif' }}>
                                {project.description}
                            </p>
                        </div>

                        {project.impact && (
                            <div className="bg-green-50 rounded-3xl p-8 sm:p-10 border border-green-100 italic">
                                <h3 className="text-xl font-bold text-[#006400] mb-4 flex items-center gap-2">
                                    <FaUsers /> Community Impact
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed">
                                    {project.impact}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Project Details Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden sticky top-8">
                            <div className="bg-[#006400] p-6 text-white text-center">
                                <h3 className="text-xl font-bold uppercase tracking-widest">Project Details</h3>
                            </div>
                            <div className="p-8 space-y-8 font-work-sans">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaCalendarAlt className="text-[#006400] w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Timeline</h4>
                                        <p className="text-gray-900 font-bold text-lg" suppressHydrationWarning>
                                            {getProjectDateDisplay(project)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <FaMapMarkerAlt className="text-[#006400] w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                                        <p className="text-gray-900 font-bold text-lg">{project.location}</p>
                                    </div>
                                </div>

                                {project.budget && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <FaCheck className="text-[#006400] w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Budget Allocation</h4>
                                            <p className="text-gray-900 font-bold text-lg">{project.budget}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6">
                                    <button className="w-full bg-[#006400] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#004d00] transition-all duration-300 transform hover:-translate-y-1">
                                        Download Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
