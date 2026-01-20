"use client";

import Link from "next/link";

import { BsQuestionCircle } from "react-icons/bs";
import { LuCircleArrowRight } from "react-icons/lu";
import { TbPhoneCall } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";

const HomeAbout = () => {
  return (
    <section className="mx-auto my-15 sm:my-20 lg:my-36  bg-white shadow-lg overflow-hidden py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20">
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
            Reliable Trust Fund
          </h2>
          <p
            className="font-medium text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We are trusted by citizens and stakeholders across Nigeria. The
            Nigeria Police Trust Fund is a government-established and
            development-driven Fund, which commenced operations on 1st July,
            2024. Our modern approach combines robust support services, digital
            solutions, and strong community engagement, while upholding
            principles of transparency, accountability, and efficient resource
            management.
          </p>
        </div>

        {/* Right Column - Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* About NPTF Card */}
          <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
            <BsQuestionCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                About NPTF
              </h2>
              <p
                className="text-sm sm:text-base text-gray-500 group-hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                Mission/Vision
              </p>
            </div>
            <Link href="/about">
              <div className="bg-green-100 group-hover:bg-white rounded-full p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:text-green-800 transition-all duration-300">
                <LuCircleArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-green-800" />
              </div>
            </Link>
          </div>

          {/* Contact NPTF Card */}
          <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
            <TbPhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Contact NPTF
              </h2>
              <p
                className="text-sm sm:text-base text-gray-500 group-hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                Reach out / Request support
              </p>
            </div>
            <Link href="/contact">
              <div className="bg-green-100 group-hover:bg-white rounded-full p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:text-green-800 transition-all duration-300">
                <LuCircleArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-green-800" />
              </div>
            </Link>
          </div>

          {/* FAQ Card */}
          <div className="rounded-lg group flex flex-col justify-between space-y-3 sm:space-y-4 border-2 border-green-800 text-black p-4 sm:p-6 hover:bg-green-800 hover:text-white transition-all duration-300 hover:shadow-lg">
            <TiMessages className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-white transition-all duration-300" />
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                FAQ
              </h2>
              <p
                className="text-sm sm:text-base text-gray-500 group-hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                Frequently Asked questions
              </p>
            </div>
            <Link href="/faq">
              <div className="bg-green-100 group-hover:bg-white rounded-full p-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:text-green-800 transition-all duration-300">
                <LuCircleArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-800 group-hover:text-green-800" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
