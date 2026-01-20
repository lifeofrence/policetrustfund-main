import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServicesGrid from "@/components/what-we-do/ServicesGrid";
import StatsSection from "@/components/homepage/StatsSection";

const Services = () => {
  return (
    <div>
      <Breadcrumbs title="Services" breadcrumbs="Home / Services" />
      <ServicesGrid />
      <StatsSection />
    </div>
  );
};

export default Services;
