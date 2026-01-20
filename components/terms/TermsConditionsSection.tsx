"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaFileContract,
  FaCheckCircle,
  FaUserLock,
  FaCogs,
  FaUserCheck,
  FaDollarSign,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBan,
  FaBalanceScale,
  FaSyncAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface Section {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const TermsConditionsSection = () => {
  const [activeSection, setActiveSection] = useState<string>("1");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["1"])
  );
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sections: Section[] = [
    {
      id: "1",
      number: 1,
      title: "Acceptance of Terms",
      icon: <FaCheckCircle className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          By using our NPTF services, website, or mobile applications, you agree
          to comply with these Terms & Conditions. If you do not agree, please
          discontinue use immediately.
        </p>
      ),
    },
    {
      id: "2",
      number: 2,
      title: "Account Registration & Security",
      icon: <FaUserLock className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          To access certain services, you may need to register an account. You
          agree to provide accurate information and keep your credentials
          secure. Unauthorized account use must be reported immediately.
        </p>
      ),
    },
    {
      id: "3",
      number: 3,
      title: "NPTF Services",
      icon: <FaCogs className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Our services include Training and Development, Procurement of
          Equipment, Infrastructure Development, Welfare and Healthcare
          Services, Research and Development, Community Policing Support,
          Logistics and Operational Support. Terms specific to each service will
          be communicated separately. We reserve the right to modify or
          discontinue services.
        </p>
      ),
    },
    {
      id: "4",
      number: 4,
      title: "User Responsibilities",
      icon: <FaUserCheck className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          You agree not to engage in fraudulent activities, violate laws, or
          misuse our platform. Non-compliance may result in account suspension
          or legal action.
        </p>
      ),
    },
    {
      id: "5",
      number: 5,
      title: "Fees & Charges",
      icon: <FaDollarSign className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Certain services may incur fees. By using our services, you agree to
          the applicable charges as communicated.
        </p>
      ),
    },
    {
      id: "6",
      number: 6,
      title: "Privacy & Data Protection",
      icon: <FaShieldAlt className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We collect and process personal data per our{" "}
          <a
            href="/privacy-policy"
            className="text-[#006400] hover:underline font-semibold"
          >
            Privacy Policy
          </a>
          . Your continued use of our services indicates consent to data
          collection.
        </p>
      ),
    },
    {
      id: "7",
      number: 7,
      title: "Limitation of Liability",
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We are not responsible for financial losses due to unauthorized
          access, technical failures, or third-party actions beyond our control.
        </p>
      ),
    },
    {
      id: "8",
      number: 8,
      title: "Termination of Services",
      icon: <FaBan className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We reserve the right to suspend or terminate accounts violating our
          terms. Users may also close their accounts upon request.
        </p>
      ),
    },
    {
      id: "9",
      number: 9,
      title: "Governing Law",
      icon: <FaBalanceScale className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          These Terms & Conditions are governed by the laws of the Federal
          Republic of Nigeria. Disputes will be resolved through arbitration or
          legal proceedings.
        </p>
      ),
    },
    {
      id: "10",
      number: 10,
      title: "Changes to Terms",
      icon: <FaSyncAlt className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We may update these terms periodically. Continued use after updates
          constitutes acceptance of the revised terms.
        </p>
      ),
    },
    {
      id: "11",
      number: 11,
      title: "Contact Us",
      icon: <FaEnvelope className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            For inquiries regarding these Terms & Conditions, please contact us
            at:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                Nigeria Police Trust Fund
              </h4>
              <p className="text-gray-700">
                No. 32 Agadez Crescent, Wuse II, FCT-Abuja, Nigeria
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="w-4 h-4 text-[#006400]" />
              <a
                href="mailto:info@nptf.gov.ng"
                className="hover:text-[#006400] hover:underline"
              >
                info@nptf.gov.ng
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="w-4 h-4 text-[#006400]" />
              <span>+234 (8147692468) | +234 (9061268054)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaGlobe className="w-4 h-4 text-[#006400]" />
              <a
                href="https://nptf.gov.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#006400] hover:underline"
              >
                https://nptf.gov.ng/
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#006400] rounded-full mb-6">
            <FaFileContract className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <div className="w-12 sm:w-16 h-1 bg-[#006400] rounded-full mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Effective Date:{" "}
            <span className="font-semibold">1st June, 2024</span>
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-10 mb-12 border-l-4 border-[#006400]">
          <p
            className="text-gray-700 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Welcome To Nigeria Police Trust Fund. By Accessing Or Using Our
            Services, You Agree To Be Bound By The Following Terms And
            Conditions. Please Read Them Carefully.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        activeSection === section.id
                          ? "bg-[#006400] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm font-semibold">
                        {section.number}.
                      </span>
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#006400]"
              >
                {/* Section Header - Mobile Expandable */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="lg:hidden w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#006400] rounded-lg flex items-center justify-center text-white">
                      {section.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">
                        {section.number}. {section.title}
                      </h3>
                    </div>
                  </div>
                  {expandedSections.has(section.id) ? (
                    <FaChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Section Header - Desktop */}
                <div className="hidden lg:flex items-center gap-4 px-6 py-4 bg-linear-to-r from-[#006400] to-[#008000]">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {section.number}. {section.title}
                  </h3>
                </div>

                {/* Section Content */}
                <div
                  className={`px-6 py-6 ${
                    expandedSections.has(section.id) ? "block" : "hidden"
                  } lg:block`}
                >
                  <div className="text-gray-700">{section.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p
            className="text-sm text-gray-600"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Last Updated: June 1, 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsSection;
