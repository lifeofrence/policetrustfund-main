import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GallerySection from "@/components/gallery/GallerySection";
import StatsSection from "@/components/homepage/StatsSection";

const Gallery = () => {
  return (
    <div>
      <Breadcrumbs title="Gallery" breadcrumbs="Home / Gallery" />
      <GallerySection />
      <StatsSection />
    </div>
  );
};

export default Gallery;
