import React from "react";
import AevionHero from "@/components/home/AevionHero";
import ManifestoSection from "@/components/home/ManifestoSection";
import FoundersSection from "@/components/home/FoundersSection";
import RippleDistortionSection from "@/components/home/RippleDistortionSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import JourneyTimelineSection from "@/components/home/JourneyTimelineSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";

export const metadata = {
  title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
  description:
    "Aevion is an AI & experimental technology studio founded by Sai Rio and Edison. Two builders. One vision. Technology without limits.",
};

export default function Page() {
  return (
    <main className="w-full bg-[#030306] text-white selection:bg-emerald-500 selection:text-black">
      {/* Flagship Interactive Futuristic Hero */}
      <AevionHero />

      {/* Interactive WebGL Ripple Distortion Shader Laboratory */}
      <RippleDistortionSection />

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
