"use client";

import React, { useState } from "react";
import { FaStar, FaPaperPlane } from "react-icons/fa";

const TestimonialForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        organization: "",
        content: "",
        rating: 5,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRatingChange = (rating: number) => {
        setFormData((prev) => ({
            ...prev,
            rating,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const API_BASE_URL =
                process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
            const response = await fetch(`${API_BASE_URL}/testimonials`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message:
                        data.message ||
                        "Thank you for your testimonial! It will be reviewed and published soon.",
                });
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    position: "",
                    organization: "",
                    content: "",
                    rating: 5,
                });
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.message || "Failed to submit testimonial. Please try again.",
                });
            }
        } catch (error) {
            console.error("Testimonial form error:", error);
            setSubmitStatus({
                type: "error",
                message: "An error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-1 bg-[#006400] rounded-full mx-auto mb-4"></div>
                        <h2
                            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                            style={{ fontFamily: "var(--font-merriweather), serif" }}
                        >
                            Share Your Experience
                        </h2>
                        <p
                            className="text-gray-600 text-base sm:text-lg"
                            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                        >
                            We value your feedback! Share your experience working with the
                            Nigeria Police Trust Fund.
                        </p>
                    </div>

                    {/* Success/Error Message */}
                    {submitStatus.type && (
                        <div
                            className={`mb-6 p-4 rounded-lg ${submitStatus.type === "success"
                                    ? "bg-green-50 border border-green-200 text-green-800"
                                    : "bg-red-50 border border-red-200 text-red-800"
                                }`}
                            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                >
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                >
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Position and Organization */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                >
                                    Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                    placeholder="Your position/title"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="organization"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                >
                                    Organization
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                    placeholder="Your organization"
                                />
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2"
                                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                            >
                                Rating *
                            </label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <FaStar
                                            className={`w-8 h-8 ${star <= formData.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                                <span
                                    className="ml-2 text-gray-600"
                                    style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                >
                                    {formData.rating} {formData.rating === 1 ? "star" : "stars"}
                                </span>
                            </div>
                        </div>

                        {/* Testimonial Content */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                            >
                                Your Testimonial *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006400] focus:border-[#006400] outline-none transition-all resize-y"
                                style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                                placeholder="Share your experience with us..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#006400] hover:bg-[#004d00] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
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
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane className="w-5 h-5" />
                                    <span>Submit Testimonial</span>
                                </>
                            )}
                        </button>

                        {/* Note */}
                        <p
                            className="text-sm text-gray-500 text-center"
                            style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
                        >
                            Your testimonial will be reviewed by our team before being published.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TestimonialForm;
