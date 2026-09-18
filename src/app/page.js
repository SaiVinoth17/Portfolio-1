import React from "react";
import GlobeScrollDemo from "@/components/ui/landing-page";
import ManifestoSection from "@/components/home/ManifestoSection";
import FoundersSection from "@/components/home/FoundersSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import JourneyTimelineSection from "@/components/home/JourneyTimelineSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";

import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Aevion Studio — Futuristic Technology & AI Studio | Sai Rio & Edison",
  description:
    "Aevion is an independent AI & experimental technology studio founded by Sai Rio and Edison. Conceived, architected, and engineered from scratch by Sai Rio. Engineering autonomous AI, high-throughput systems, and next-generation web architectures.",
  path: "/",
  keywords: [
    "Aevion Studio",
    "Sai Rio",
    "Sai Vinoth",
    "Edison",
    "Nilgiris Explorers",
    "The Gaming Kingdom",
    "House of Petalss",
    "Aevion Studio OS",
    "AI Software Studio",
    "Futuristic Technology Lab",
  ],
});

export default function Page() {
  return (
    <main className="w-full bg-[#030306] text-white selection:bg-emerald-500 selection:text-black">
      {/* Scroll-globe hero replacing previous AirlockHero + RippleDistortionSection */}
      <GlobeScrollDemo />

      {/* Manifesto: Turning Ambitious Ideas Into Real Technology */}
      <ManifestoSection />

      {/* Equal Founders: Sai Rio & Edison Dual Nexus */}
      <FoundersSection />

      {/* Editorial Case Studies & Systems */}
      <SelectedWorkSection />

      {/* Building In Public / Timeline Continuum */}
      <JourneyTimelineSection />

      {/* Deep Systems Capabilities Matrix */}
      <CapabilitiesSection />
    </main>
  );
}
