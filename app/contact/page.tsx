import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/contact/ContactSection";
import StatsSection from "@/components/homepage/StatsSection";

const Contact = () => {
  return (
    <div>
      <Breadcrumbs title="Contact Us" breadcrumbs="Home / Contact Us" />
      <ContactSection />
      <StatsSection />
    </div>
  );
};

export default Contact;

