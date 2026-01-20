import Breadcrumbs from "@/components/Breadcrumbs";
import TermsConditionsSection from "@/components/terms/TermsConditionsSection";
import StatsSection from "@/components/homepage/StatsSection";

const TermsConditions = () => {
  return (
    <div>
      <Breadcrumbs
        title="Terms & Conditions"
        breadcrumbs="Home / Terms & Conditions"
      />
      <TermsConditionsSection />
      <StatsSection />
    </div>
  );
};

export default TermsConditions;
