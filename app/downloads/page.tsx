import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import DownloadsSection from "@/components/about/DownloadsSection";
import StatsSection from "@/components/homepage/StatsSection";

const Downloads = () => {
  return (
    <div>
      <Breadcrumbs title="Downloads" breadcrumbs="Home / Downloads" />
      <DownloadsSection />
      <StatsSection />
    </div>
  );
};

export default Downloads;
