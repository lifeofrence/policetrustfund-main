import { LuCircleArrowRight } from "react-icons/lu";
import { TbPhoneCall } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { BsQuestionCircle } from "react-icons/bs";
import { Check, CheckCircle, Link } from "lucide-react";
import Image from "next/image";
import React from "react";
import WhyPartnerNPTF from "@/components/about/WhyPartnerNPTF";
import MissionVision from "@/components/about/MissionVision";
import Testimonials from "@/components/about/Testimonials";
import Breadcrumbs from "@/components/Breadcrumbs";

const WhoWeAre = () => {
  return (
    <div>
      <Breadcrumbs title="Who We Are" breadcrumbs="Home / Who We Are" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center justify-center">
          {/* Left Column - About Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-green-800 w-16 sm:w-20 h-1 rounded-full"></div>
            <p
              className="font-medium text-sm sm:text-base"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Welcome to NPTF
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Who We Are
            </h2>
            <div className="border-2 border-green-800 rounded-lg overflow-hidden p-5">
              {" "}
              <Image
                src="/md.jpg"
                alt="Who We Are"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Action Cards */}
          <div className="space-y-4 sm:space-y-6">
            <div></div>
            <p
              className="font-medium text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              The Nigeria Police Trust Fund (NPTF) was established to provide a
              sustainable framework for equipping, training, and enhancing the
              capacity of the Nigeria Police Force. We are committed to
              supporting the modernization of policing infrastructure, promoting
              excellence, professionalism, and efficiency to ensure a safer and
              more secure Nigeria. Through transparent and impactful
              initiatives, we strive to strengthen the capabilities of the
              police for better service delivery to all citizens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* About NPTF Card */}
              <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    Honesty, Transparency
                  </h2>
                </div>
              </div>
              <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    Self-Confidence
                  </h2>
                </div>
              </div>
              <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    Professionalism
                  </h2>
                </div>
              </div>
              <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    Discipline & Decency
                  </h2>
                </div>
              </div>
            </div>
            <button className="bg-[#0B1120] text-white px-4 py-2 rounded-full">
              Read More
            </button>
          </div>
        </div>
      </section>

      <MissionVision />
      <WhyPartnerNPTF />
      <Testimonials />
    </div>
  );
};

export default WhoWeAre;
