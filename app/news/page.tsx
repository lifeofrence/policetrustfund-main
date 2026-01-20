import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsSection from "@/components/news/NewsSection";
import StatsSection from "@/components/homepage/StatsSection";

function News() {
  return (
    <div>
      <Breadcrumbs title="News" breadcrumbs="Home / News" />
      <NewsSection />
      <StatsSection />
    </div>
  );
}

export default News;
