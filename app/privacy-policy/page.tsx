import Breadcrumbs from "@/components/Breadcrumbs";
import PrivacyPolicySection from "@/components/privacy/PrivacyPolicySection";
import StatsSection from "@/components/homepage/StatsSection";

const PrivacyPolicy = () => {
  return (
    <div>
      <Breadcrumbs title="Privacy Policy" breadcrumbs="Home / Privacy Policy" />
      <PrivacyPolicySection />
      <StatsSection />
    </div>
  );
};

export default PrivacyPolicy;
