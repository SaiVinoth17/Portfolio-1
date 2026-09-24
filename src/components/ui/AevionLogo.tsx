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
  priority = false,
  style,
  width,
  height,
}: AevionLogoProps) {
  const isMark = variant === "mark" || variant === "compact";
  const src = isMark ? "/images/aevion-mark-sm.png" : "/images/aevion-logo-sm.png";
  
  // Native 2x dimensions for crisp display at 66x44 and 48x37
  const defaultWidth = isMark ? 96 : 132;
  const defaultHeight = isMark ? 75 : 88;

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
