import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import StatsSection from "@/components/homepage/StatsSection";

const Testimonials = () => {
  return (
    <div>
      <Breadcrumbs title="Testimonials" breadcrumbs="Home / Testimonials" />
      <TestimonialsSection />
      <TestimonialForm />
      <StatsSection />
    </div>
  );
};

export default Testimonials;
