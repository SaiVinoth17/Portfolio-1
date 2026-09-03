import React from "react";
import Image from "next/image";

export interface AevionLogoProps {
  variant?: "full" | "mark" | "compact";
  className?: string;
  alt?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

/**
 * Official Aevion Studio Logo Component
 * Uses the supplied transparent PNG assets directly without CSS filters, recoloring, or distortion.
 */
export default function AevionLogo({
  variant = "full",
  className = "h-10 w-auto object-contain",
  alt = "Aevion Studio",
  priority = true,
  style,
  width,
  height,
}: AevionLogoProps) {
  const isMark = variant === "mark" || variant === "compact";
  const src = isMark ? "/images/aevion-mark.png" : "/images/aevion-logo.png";
  
  // Natural aspect ratios:
  // Full: 1024 x 682 (~1.501)
  // Mark: 470 x 365 (~1.288)
  const defaultWidth = isMark ? 470 : 1024;
  const defaultHeight = isMark ? 365 : 682;

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      priority={priority}
      className={className}
      style={{
        objectFit: "contain",
        ...style,
      }}
    />
  );
}
