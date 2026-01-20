"use client";

import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import { apiPost } from "@/lib/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const data = await apiPost<any>('/contact', formData, false);

      setSubmitStatus({
        type: 'success',
        message: data.message || 'Thank you for your message! We will get back to you soon.',
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Image with Contact Info Card */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            {/* Background with Pattern */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-[#006400] via-[#008000] to-[#006400] relative">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-96">
              <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                {/* Green Triangle Accent */}
                <div className="absolute -left-4 top-8 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[20px] border-r-[#006400]"></div>

                {/* Contact Items */}
                <div className="space-y-6">
                  {/* Mailing Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#006400] rounded-full flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-gray-900 mb-1"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        Mailing Address
                      </h3>
                      <p
                        className="text-gray-700 text-sm sm:text-base"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        38, Agadez Crescent, Wuse II, FCT-Abuja, Nigeria
                      </p>
                    </div>
                  </div>

                  {/* Quick Contacts */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#006400] rounded-full flex items-center justify-center shrink-0">
                      <FaPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-gray-900 mb-1"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        Quick Contacts (9am - 5pm)
                      </h3>
                      <div
                        className="text-gray-700 text-sm sm:text-base space-y-1"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        <a
                          href="tel:+2348147692468"
                          className="block hover:text-[#006400] transition-colors"
                        >
                          +234 (8147692468)
                        </a>
                        <a
                          href="tel:+2349061268054"
                          className="block hover:text-[#006400] transition-colors"
                        >
                          +234 (9061268054)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Support Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#006400] rounded-full flex items-center justify-center shrink-0">
                      <FaEnvelope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-gray-900 mb-1"
                        style={{
                          fontFamily: "var(--font-merriweather), serif",
                        }}
                      >
                        Support Email
                      </h3>
                      <a
                        href="mailto:info@nptf.gov.ng"
                        className="text-gray-700 text-sm sm:text-base hover:text-[#006400] transition-colors"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        info@nptf.gov.ng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="flex items-center">
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Leave Us A Message
              </h2>

              {/* Success/Error Message */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      Your Phone No
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                      style={{
                        fontFamily: "var(--font-work-sans), sans-serif",
                      }}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                  >
                    Write Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all resize-y"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#006400] hover:bg-[#004d00] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "var(--font-work-sans), sans-serif",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
