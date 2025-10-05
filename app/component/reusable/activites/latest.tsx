"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface CarouselItem {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  hoverText: string;
}

interface LatestCarouselProps {
  // Title Configuration
  showTitle?: boolean;
  title?: string;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  titleAlignment?: "left" | "center" | "right";

  // Content Configuration
  items?: CarouselItem[];
  autoScrollInterval?: number;
  showNavigationArrows?: boolean;
  showNavigationDots?: boolean;

  // Spacing & Layout
  className?: string;
  sectionClassName?: string;
  containerClassName?: string;
  marginTop?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingX?: string;
  backgroundColor?: string;

  // Card Styling
  cardClassName?: string;
  cardBorderRadius?: string;

  // Hover Overlay Color
  hoverOverlayColor?: string;
}

const LatestCarousel: React.FC<LatestCarouselProps> = ({
  // Title props
  showTitle = true,
  title = "Latest",
  titleClassName = "",
  titleStyle = {},
  titleAlignment = "left",

  // Content props
  items,
  autoScrollInterval = 3000,
  showNavigationArrows = true,
  showNavigationDots = true,

  // Spacing props
  className = "",
  sectionClassName = "",
  containerClassName = "",
  marginTop = "",
  marginBottom = "",
  paddingTop = "py-8 md:py-12 lg:py-16 xl:py-20",
  paddingBottom = "",
  paddingX = "px-4 md:px-6 lg:px-8",
  backgroundColor = "bg-gray-100",

  // Card styling
  cardClassName = "",
  cardBorderRadius = "15px md:rounded-[20px]",

  // Hover overlay
  hoverOverlayColor = "#124384",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const defaultCarouselItems: CarouselItem[] = [
    {
      title: "Coding, Real-World",
      description: "Consectetur Adipiscing Et Dolore Magna Aliqua",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      imageAlt: "Students learning together",
      link: "/activities/coding-real-world",
      hoverText: "Explore Real-World Coding",
    },
    {
      title: "Interactive Learning",
      description: "Hands-on Experience with Technology",
      imageUrl:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
      imageAlt: "Students in classroom",
      link: "/activities/interactive-learning",
      hoverText: "Discover Interactive Learning",
    },
    {
      title: "Professional Development",
      description: "Building Skills for the Future",
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      imageAlt: "Business presentation",
      link: "/activities/professional-development",
      hoverText: "Learn Professional Skills",
    },
    {
      title: "Team Collaboration",
      description: "Working Together to Achieve Goals",
      imageUrl:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
      imageAlt: "Team collaboration",
      link: "/activities/team-collaboration",
      hoverText: "Join Our Team",
    },
    {
      title: "Innovation & Technology",
      description: "Embracing the Future of Learning",
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      imageAlt: "Technology innovation",
      link: "/activities/innovation",
      hoverText: "Explore Innovation",
    },
  ];

  const carouselItems = items || defaultCarouselItems;

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isHovered, carouselItems.length, autoScrollInterval]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector(".carousel-card")
          ?.clientWidth || 430;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const scrollAmount = currentIndex * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const titleAlignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[titleAlignment];

  const defaultTitleStyle: React.CSSProperties = {
    fontFamily: "Times New Roman, serif",
    fontWeight: 400,
    letterSpacing: "0px",
    ...titleStyle,
  };

  const sectionStyles = `
    ${paddingTop} 
    ${paddingBottom} 
    ${marginTop} 
    ${marginBottom} 
    ${backgroundColor} 
    w-full 
    overflow-hidden 
    ${sectionClassName}
  `.trim();

  return (
    <section className={`${sectionStyles} ${className}`}>
      {/* Title - Optional and Customizable */}
      {showTitle && (
        <div className={paddingX}>
          <h2
            className={`
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              mb-6 md:mb-8 lg:mb-12 
              capitalize 
              leading-none 
              ${titleAlignmentClass}
              ${titleClassName}
            `}
            style={defaultTitleStyle}
          >
            {title}
          </h2>
        </div>
      )}

      {/* Carousel Container - Full Width */}
      <div className={`relative w-full ${containerClassName}`}>
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth ${paddingX} pb-4`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`
                carousel-card 
                flex-shrink-0 
                relative 
                group 
                cursor-pointer 
                w-[280px] h-[270px] 
                sm:w-[340px] sm:h-[328px] 
                md:w-[380px] md:h-[366px] 
                lg:w-[430px] lg:h-[414px] 
                rounded-[${cardBorderRadius}]
                ${cardClassName}
              `}
            >
              {/* Image */}
              <div
                className={`w-full h-full relative overflow-hidden rounded-[${cardBorderRadius}]`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 430px"
                  priority={index === 0}
                />

                {/* Default Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

                {/* Hover Overlay with Link */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6"
                  style={{ backgroundColor: `${hoverOverlayColor}f2` }} // f2 = 95% opacity
                >
                  <Link
                    href={item.link}
                    className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center hover:underline underline-offset-4 decoration-2 transition-all"
                  >
                    {item.hoverText}
                  </Link>
                  <span className="text-white/80 text-sm mt-3 hover:text-white transition-colors">
                    Click to learn more →
                  </span>
                </div>

                {/* Default Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {showNavigationDots && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8 px-4">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 md:w-8"
                    : "bg-gray-400 hover:bg-gray-600 w-2"
                }`}
                style={
                  index === currentIndex
                    ? { backgroundColor: hoverOverlayColor }
                    : {}
                }
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {showNavigationArrows && (
          <>
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + carouselItems.length) % carouselItems.length
                )
              }
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
                style={{ color: hoverOverlayColor }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
              }
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                style={{ color: hoverOverlayColor }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default LatestCarousel;
