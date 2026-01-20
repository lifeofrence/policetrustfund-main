"use client";

import React from "react";
import Link from "next/link";
// Importing icons from 'react-icons/fa' (FontAwesome 5)
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaArrowUp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0B1120] text-slate-300 relative overflow-hidden">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* COLUMN 1: Brand & Intro */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Logo Placeholder */}
            <Image
              src="/logo-dark.png"
              alt="Nigerian Coat of Arms"
              width={40}
              height={40}
              className="object-contain"
            />

            <p
              className="text-slate-400 leading-relaxed text-sm max-w-sm"
              style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
            >
              You can subscribe to our periodic newsletter for our latest news
              on our recent events and career openings.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaYoutube, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                >
                  <Icon className="text-slate-400 group-hover:text-white text-lg" />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Explore */}
          <div className="lg:col-span-2 space-y-6">
            <h3
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Explore
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: "About Us", href: "/about/who-we-are" },
                { label: "Service List", href: "/what-we-do/services" },
                { label: "Meet The Team", href: "/about/management-team" },
                { label: "Recent News", href: "/news" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Our Services */}
          <div className="lg:col-span-3 space-y-6">
            <h3
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              Our Services
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                {
                  label: "Training And Development",
                  href: "/what-we-do/training",
                },
                {
                  label: "Procurement Of Equipment",
                  href: "/what-we-do/procurement",
                },
                {
                  label: "Infrastructure Development",
                  href: "/what-we-do/infrastructure",
                },
                {
                  label: "Welfare and Healthcare",
                  href: "/what-we-do/welfare",
                },
                {
                  label: "Research and Development",
                  href: "/what-we-do/research",
                },
                {
                  label: "Logistic and operational support",
                  href: "/what-we-do/logistic",
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-8">
            {/* Newsletter Section */}
            <div className="space-y-4">
              <h3
                className="text-white text-2xl font-semibold"
                style={{ fontFamily: "var(--font-merriweather), serif" }}
              >
                Subscribe to our newsletter
              </h3>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded p-4 pr-12 text-sm focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-500 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 transition-colors">
                  <FaPaperPlane size={18} />
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 border-t border-slate-800 pt-6">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-blue-500" />
                <p style={{ fontFamily: "var(--font-work-sans), sans-serif" }}>
                  38, Agadez Crescent, Wuse II, FCT-Abuja, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <FaEnvelope className="shrink-0 text-blue-500" />
                <a
                  href="mailto:info@nptf.gov.ng"
                  className="hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  info@nptf.gov.ng
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <FaPhoneAlt className="shrink-0 text-blue-500" />
                <span
                  style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                >
                  +234 (8147692468)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Yellow Bar */}
      <div className="w-full bg-yellow-300  text-slate-900 py-4 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium mb-4">
            <p style={{ fontFamily: "var(--font-work-sans), sans-serif" }}>
              © Copyright 2025 Nigeria Police Trust Fund.
            </p>
            <div className="flex items-center gap-6">
              <span></span>
              {/* Mobile Back to top */}
              <button
                onClick={scrollToTop}
                className="lg:hidden flex items-center gap-2 hover:opacity-75"
                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
              >
                TOP <FaArrowUp />
              </button>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button (Included in original design) */}
        <a
          href="#"
          className="absolute right-4 -top-8 bg-green-500 hover:bg-green-600 text-white p-3 rounded-md shadow-lg transition-transform hover:-translate-y-1 lg:hidden"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>

      {/* Desktop Floating "Go Top" & WhatsApp */}
      <div className="hidden lg:flex absolute right-0 bottom-32 flex-col items-center gap-2 z-10">
        {/* Floating WhatsApp for Desktop */}
        <a
          href="#"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-l-md shadow-lg transition-transform hover:-translate-x-1 mb-2"
        >
          <FaWhatsapp size={24} />
        </a>

        {/* Go Top Button */}
        <button
          onClick={scrollToTop}
          className="bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 py-4 px-2 rounded-l-md writing-mode-vertical flex flex-col items-center gap-2 transition-all border-r-4 border-yellow-400"
          style={{ writingMode: "vertical-rl" }}
        >
          <FaArrowUp className="rotate-0 mb-2" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Go Top
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
