import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectsSection from "@/components/projects/ProjectsSection";

const Projects = () => {
  return (
    <div>
      <Breadcrumbs title="Projects" breadcrumbs="Home / Projects" />
      <ProjectsSection />
    </div>
  );
};

export default Projects;
