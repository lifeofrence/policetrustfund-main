import React from "react";
import ProjectDetail from "@/components/projects/ProjectDetail";
import StatsSection from "@/components/homepage/StatsSection";

// Next.js dynamic page for project detail
export default function ProjectDetailPage() {
    return (
        <main>
            <ProjectDetail />
            <StatsSection />
        </main>
    );
}
