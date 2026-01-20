import React from "react";
import NewsDetail from "@/components/news/NewsDetail";
import StatsSection from "@/components/homepage/StatsSection";

// Next.js dynamic page for news detail
export default function NewsDetailPage() {
    return (
        <main>
            <NewsDetail />
            <StatsSection />
        </main>
    );
}
