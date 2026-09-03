import React from 'react';

export interface DepthCarouselItem {
  image: string;
  alt?: string;
  title?: string;
  slug?: string;
  category?: string;
}

export interface DepthCarouselProps {
  items?: (string | DepthCarouselItem)[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: 'left' | 'right';
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: DepthCarouselItem) => void;
  onItemClick?: (index: number, item: DepthCarouselItem) => void;
  className?: string;
}

declare const DepthCarousel: React.FC<DepthCarouselProps>;
export default DepthCarousel;
