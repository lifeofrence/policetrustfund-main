"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQsSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is the Nigeria Police Trust Fund (NPTF)?",
      answer:
        "The Nigeria Police Trust Fund (NPTF) is a government-established and development-driven Fund that commenced operations on 1st July, 2024. It is dedicated to strengthening national security and empowering the Nigeria Police Force with the resources, training, and technology they need to serve the nation effectively.",
    },
    {
      id: 2,
      question: "What are the main objectives of NPTF?",
      answer:
        "The NPTF focuses on several key areas including training and development of police officers, procurement of modern equipment, infrastructure development, welfare and healthcare support, research and development initiatives, and logistic and operational support to enhance the efficiency and effectiveness of the Nigeria Police Force.",
    },
    {
      id: 3,
      question: "How is the Trust Fund financed?",
      answer:
        "The Nigeria Police Trust Fund is financed through various sources including government allocations, private sector contributions, and other approved funding mechanisms as stipulated by the enabling legislation. The Fund operates with transparency and accountability in managing all resources.",
    },
    {
      id: 4,
      question: "Who can benefit from NPTF programs?",
      answer:
        "The primary beneficiaries of NPTF programs are members of the Nigeria Police Force, including officers across all ranks and commands nationwide. The Fund also indirectly benefits the general public by improving police services, security, and community safety.",
    },
    {
      id: 5,
      question: "How can I partner with or support the NPTF?",
      answer:
        "Organizations, private sector entities, and individuals interested in partnering with or supporting the NPTF can reach out through our official contact channels. We welcome partnerships that align with our mission to strengthen national security and improve policing services across Nigeria.",
    },
    {
      id: 6,
      question: "How does NPTF ensure transparency and accountability?",
      answer:
        "The NPTF is committed to transparency and accountability through regular reporting, public disclosure of activities, proper financial management, and adherence to established governance frameworks. We maintain high standards of integrity in all our operations and resource management.",
    },
    {
      id: 7,
      question: "What training programs does NPTF offer?",
      answer:
        "The NPTF provides comprehensive training and development programs for police officers, covering areas such as modern policing techniques, technology usage, community engagement, human rights, and professional development. These programs are designed to enhance the skills and capabilities of officers at all levels.",
    },
    {
      id: 8,
      question: "How can I stay updated with NPTF activities?",
      answer:
        "You can stay updated with NPTF activities through our official website, news section, social media channels, and regular publications. We also publish annual reports and updates on our various initiatives and programs.",
    },
    {
      id: 9,
      question: "Does NPTF provide direct financial assistance to individuals?",
      answer:
        "The NPTF primarily focuses on institutional support for the Nigeria Police Force through training, equipment procurement, infrastructure development, and operational support. For specific assistance programs, please contact our office for detailed information.",
    },
    {
      id: 10,
      question: "How can I report concerns or provide feedback?",
      answer:
        "You can report concerns or provide feedback through our official contact channels, including email, phone, or by visiting our office. We value feedback and are committed to addressing concerns promptly and appropriately.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
            <p
              className="text-[#006400] text-sm font-semibold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              Frequently Asked Questions
            </p>
            <span className="w-2 h-2 bg-[#006400] rounded-full"></span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Got Questions?
          </h1>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Find answers to common questions about the Nigeria Police Trust Fund
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#006400] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="mt-1 shrink-0">
                    <FaQuestionCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#006400]" />
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#006400] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-merriweather), serif" }}
                  >
                    {faq.question}
                  </h3>
                </div>
                <div className="shrink-0">
                  {openFAQ === faq.id ? (
                    <FaChevronUp className="w-5 h-5 text-[#006400] transition-transform duration-200" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#006400] transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 sm:px-8 sm:pb-6 pl-14 sm:pl-16">
                  <p
                    className="text-gray-700 leading-relaxed text-sm sm:text-base"
                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 sm:mt-16 bg-linear-to-r from-[#006400] to-[#008000] rounded-xl p-8 sm:p-10 text-center text-white">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Still Have Questions?
          </h2>
          <p
            className="text-white/90 mb-6 text-sm sm:text-base"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Can't find the answer you're looking for? Please get in touch with
            our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#006400] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
