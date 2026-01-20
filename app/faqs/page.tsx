import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQsSection from "@/components/faqs/FAQsSection";

const FAQs = () => {
  return (
    <div>
      <Breadcrumbs title="FAQs" breadcrumbs="Home / FAQs" />
      <FAQsSection />
    </div>
  );
};

export default FAQs;
