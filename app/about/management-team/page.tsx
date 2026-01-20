import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BoardGrid from "@/components/about/BoardGrid";
import ManagementGrid from "@/components/about/ManagementGrid";
import StatsSection from "@/components/homepage/StatsSection";

const BoardOfTrustees = () => {
  return (
    <div>
      <Breadcrumbs
        title="Board of Trustees"
        breadcrumbs="Home / Board of Trustees"
      />
      <ManagementGrid />
      <StatsSection />
    </div>
  );
};

export default BoardOfTrustees;
