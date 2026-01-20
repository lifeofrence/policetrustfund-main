import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/homepage/HeroSection";
import HomeAbout from "@/components/homepage/HomeAbout";
import HomeNews from "@/components/homepage/HomeNews";
import HomeSteps from "@/components/homepage/HomeSteps";
import StatsSection from "@/components/homepage/StatsSection";

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen scroll-smooth ">
      <HeroSection />
      <HomeAbout />
      <HomeNews />
      <HomeSteps />
      <StatsSection />
    </div>
  );
}
