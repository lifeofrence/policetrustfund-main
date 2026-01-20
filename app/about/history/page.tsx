import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import HistoryTimeline from "@/components/about/HistoryTimeline";

const History = () => {
  return (
    <div>
      <Breadcrumbs title="Our History" breadcrumbs="Home / Our History" />
      <HistoryTimeline />
    </div>
  );
};

export default History;
