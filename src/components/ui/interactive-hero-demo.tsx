"use client";

import React from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { InteractiveHero } from "@/components/ui/interactive-hero-backgrounds";

// The ThemeProvider wrapper component
function ThemeProvider({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const InteractiveHeroDemo = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <InteractiveHero
            brandName="21st"
            heroTitle="Interactive Hero Backgrounds"
            heroDescription="Engage users with dynamic, physics-based animations that respond to their every move. Built with React, Three.js, and shadcn/ui."
            emailPlaceholder="Enter your email"
            // Custom ballpit animation properties
            ballpitConfig={{
                count: 150,
                gravity: 0.5,
                friction: 0.99,
                minSize: 0.4,
                maxSize: 0.9,
                lightIntensity: 4,
            }}
        />
    </ThemeProvider>
  );
};

export default InteractiveHeroDemo;
