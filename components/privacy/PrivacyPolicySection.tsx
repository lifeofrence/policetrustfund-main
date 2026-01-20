"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaShieldAlt,
  FaDatabase,
  FaCog,
  FaShareAlt,
  FaLock,
  FaUserShield,
  FaCookie,
  FaExternalLinkAlt,
  FaChild,
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

const PrivacyPolicySection = () => {
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
      title: "Information We Collect",
      icon: <FaDatabase className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4
              className="text-lg font-bold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              a. Personal Information
            </h4>
            <ul className="space-y-2 ml-4">
              {[
                "Full Name",
                "Contact Details (Phone Number, Email Address, Postal Address)",
                "Date of Birth",
                "Government-issued Identification (e.g., BVN, National ID, Passport)",
                "Employment and Financial Information",
                "NPTF Details and Transaction History",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  <span className="text-[#006400] mt-1.5">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              className="text-lg font-bold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              b. Non-Personal Information
            </h4>
            <ul className="space-y-2 ml-4">
              {[
                "IP Address",
                "Browser Type and Device Information",
                "Website Usage Data (Cookies, Log Files, Analytics)",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  <span className="text-[#006400] mt-1.5">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      number: 2,
      title: "How We Use Your Information",
      icon: <FaCog className="w-6 h-6" />,
      content: (
        <div>
          <p
            className="text-gray-700 mb-4"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We use the collected data to:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Provide and improve NPTF services",
              "Verify your identity and prevent fraud",
              "Process transactions and payments",
              "Communicate important updates and promotional offers",
              "Comply with legal and regulatory requirements",
              "Enhance user experience and improve our website functionality",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                <span className="text-[#006400] mt-1.5">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "3",
      number: 3,
      title: "How We Share Your Information",
      icon: <FaShareAlt className="w-6 h-6" />,
      content: (
        <div>
          <p
            className="text-gray-700 mb-4"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We do not sell your personal information. However, we may share it
            with:
          </p>
          <ul className="space-y-3 ml-4">
            {[
              {
                title: "Regulatory Authorities:",
                desc: "To comply with NPTF and financial laws",
              },
              {
                title: "Third-Party Service Providers:",
                desc: "To facilitate NPTF operations, fraud detection, and customer support",
              },
              {
                title: "Business Partners:",
                desc: "When required for loan processing, credit assessment, or account services",
              },
              {
                title: "Law Enforcement Agencies:",
                desc: "In response to legal obligations, fraud prevention, or security investigations",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                <span className="text-[#006400] mt-1.5 font-bold">•</span>
                <div>
                  <span className="text-gray-900 font-semibold">
                    {item.title}{" "}
                  </span>
                  <span className="text-gray-700">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "4",
      number: 4,
      title: "Data Security Measures",
      icon: <FaLock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            We implement strict security measures to protect your data,
            including:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Encryption of sensitive data",
              "Secure login and authentication systems",
              "Regular security audits and monitoring",
              "Access control to limit unauthorized access",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                <span className="text-[#006400] mt-1.5">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            However, while we strive to secure your data, no transmission over
            the internet is 100% secure. Users are advised to safeguard their
            account credentials.
          </p>
        </div>
      ),
    },
    {
      id: "5",
      number: 5,
      title: "Your Privacy Rights",
      icon: <FaUserShield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            You have the right to:
          </p>
          <ul className="space-y-2 ml-4">
            {[
              "Access, correct, or update your personal data",
              "Request data deletion (subject to regulatory requirements)",
              "Opt-out of marketing communications",
              "Restrict or object to certain types of data processing",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                <span className="text-[#006400] mt-1.5">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            To exercise these rights, please contact us at{" "}
            <a
              href="https://nptf.gov.ng/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006400] hover:underline font-semibold"
            >
              https://nptf.gov.ng/contact.html
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "6",
      number: 6,
      title: "Cookies and Tracking Technologies",
      icon: <FaCookie className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We use cookies to enhance user experience and analyze website traffic.
          You can manage cookie preferences through your browser settings.
          Disabling cookies may affect website functionality.
        </p>
      ),
    },
    {
      id: "7",
      number: 7,
      title: "Third-Party Links",
      icon: <FaExternalLinkAlt className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Our website or app may contain links to third-party websites. We are
          not responsible for their privacy practices. Users are encouraged to
          read their respective privacy policies before sharing personal
          information.
        </p>
      ),
    },
    {
      id: "8",
      number: 8,
      title: "Children's Privacy",
      icon: <FaChild className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          Our services are not intended for individuals under the age of 18. We
          do not knowingly collect data from minors. If we discover that a minor
          has provided us with personal information, we will take steps to
          delete it.
        </p>
      ),
    },
    {
      id: "9",
      number: 9,
      title: "Updates to this Privacy Policy",
      icon: <FaSyncAlt className="w-6 h-6" />,
      content: (
        <p
          className="text-gray-700"
          style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
        >
          We may update this policy from time to time. Any changes will be
          posted on this page, and users will be notified of significant
          updates. Continued use of our services after changes are made
          constitutes acceptance of the revised policy.
        </p>
      ),
    },
    {
      id: "10",
      number: 10,
      title: "Contact Us",
      icon: <FaEnvelope className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p
            className="text-gray-700"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            For questions, concerns, or requests regarding this Privacy Policy,
            please contact us at:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <div>
              <h4
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Nigeria Police Trust Fund
              </h4>
              <p
                className="text-gray-700"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                No. 32 Agadez Crescent, Wuse II, FCT-Abuja, Nigeria
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="w-4 h-4 text-[#006400]" />
              <a
                href="mailto:info@nptf.gov.ng"
                className="hover:text-[#006400] hover:underline"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                info@nptf.gov.ng
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="w-4 h-4 text-[#006400]" />
              <span style={{ fontFamily: "var(--font-work-sans), sans-serif" }}>
                +234 (8147692468) | +234 (9061268054)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaGlobe className="w-4 h-4 text-[#006400]" />
              <a
                href="https://nptf.gov.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#006400] hover:underline"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
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
            <FaShieldAlt className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Privacy Policy
          </h1>
          <div className="w-12 sm:w-16 h-1 bg-[#006400] rounded-full mx-auto mb-4"></div>
          <p
            className="text-sm sm:text-base text-gray-600 mb-2"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
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
            Nigeria Police Trust Fund Is Committed To Protecting Your Privacy.
            This Privacy Policy Explains How We Collect, Use, Disclose, And
            Safeguard Your Information When You Visit Our Website, Mobile
            Applications, And Use Our Services. By Accessing Or Using Our
            Services, You Consent To The Data Practices Described In This
            Policy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3
                  className="text-lg font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "var(--font-merriweather), serif" }}
                >
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
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
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
                      <h3
                        className="text-lg font-bold text-gray-900"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
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
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
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

export default PrivacyPolicySection;
