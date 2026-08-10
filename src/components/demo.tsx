"use client";

import IntroAnimation from "@/components/ui/scroll-morph-hero";

export default function Demo() {
    return (
        <div data-lenis-prevent="true" className="w-full h-[800px] border rounded-lg overflow-hidden relative">
            <IntroAnimation />
        </div>
    );
}
