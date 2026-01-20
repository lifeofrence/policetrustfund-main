"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus, FaDownload } from "react-icons/fa";

interface SidebarItem {
  id: string;
  label: string;
  subItems?: string[];
}

interface DownloadItem {
  id: number;
  name: string;
  fileUrl: string;
}

const DownloadsSection = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "nptf-act",
    "nptf-manual",
  ]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Download NPTF Act");

  const sidebarItems: SidebarItem[] = [
    {
      id: "nptf-act",
      label: "NPTF Act",
      subItems: ["Download NPTF Act"],
    },
    {
      id: "nptf-manual",
      label: "NPTF Manual",
      subItems: ["Download NPTF Manual"],
    },
  ];

  // Map categories to their download items
  const downloadsByCategory: Record<string, DownloadItem[]> = {
    "Download NPTF Act": [
      {
        id: 1,
        name: "NPTF Act",
        fileUrl: "https://nptf.gov.ng/forms/nptf_act.pdf",
      },
    ],
    "Download NPTF Manual": [
      {
        id: 2,
        name: "NPTF Manual",
        fileUrl: "https://nptf.gov.ng/forms/nptf_manual.pdf",
      },
    ],
  };

  // Get download items for the selected category
  const downloadItems = downloadsByCategory[selectedCategory] || [];

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  return (
    <section className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-4">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors duration-200 ${
                        isExpanded(item.id)
                          ? "bg-green-200 text-gray-900"
                          : "text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.subItems ? (
                        isExpanded(item.id) ? (
                          <FaMinus className="w-3 h-3" />
                        ) : (
                          <FaPlus className="w-3 h-3" />
                        )
                      ) : null}
                    </button>
                    {item.subItems && isExpanded(item.id) && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.subItems.map((subItem, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedCategory(subItem)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
                              selectedCategory === subItem
                                ? "bg-green-200 text-gray-900 font-semibold"
                                : "text-gray-700 hover:bg-gray-200"
                            }`}
                            style={{
                              fontFamily: "var(--font-work-sans), sans-serif",
                            }}
                          >
                            {subItem}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <h1
              className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900"
              style={{ fontFamily: "var(--font-merriweather), serif" }}
            >
              {selectedCategory.replace("Download ", "")}
            </h1>

            <div className="space-y-4">
              {downloadItems.length > 0 ? (
                downloadItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 flex items-center gap-4 cursor-pointer group"
                  >
                    {/* Download Icon */}
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#006400] rounded-lg flex items-center justify-center group-hover:bg-[#004d00] transition-colors duration-300">
                      <FaDownload className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    {/* File Name */}
                    <div className="flex-1">
                      <h3
                        className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-[#006400] transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-work-sans), sans-serif",
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "var(--font-work-sans), sans-serif",
                    }}
                  >
                    No downloads available for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
