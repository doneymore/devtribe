"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon,
} from "lucide-react";

interface PostImage {
  imageUrl: string;
  imageAlt: string;
  link: string;
}

interface CarouselSection {
  title: string;
  description?: string;
  link: string;
  images: PostImage[];
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-6 mt-8 md:mt-12 px-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center rounded-[20px] border-[3px] transition-all duration-200 ${
          canGoPrevious
            ? "border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        style={{
          width: "clamp(100px, 25vw, 137px)",
          height: "53px",
          padding: "11px 8px",
          gap: "10px",
        }}
      >
        <ChevronLeft size={16} className="sm:inline block" />
        <span className="font-medium text-xs sm:text-sm hidden sm:inline">
          Previous
        </span>
        <span className="font-medium text-xs sm:hidden">Prev</span>
      </button>

      <span className="text-blue-600 font-medium px-2 sm:px-4 text-sm sm:text-base whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center justify-center rounded-[20px] border-[3px] transition-all duration-200 ${
          canGoNext
            ? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        style={{
          width: "clamp(90px, 22vw, 123px)",
          height: "53px",
          padding: "11px 8px",
        }}
      >
        <span className="font-medium text-xs sm:text-sm hidden sm:inline">
          Next
        </span>
        <span className="font-medium text-xs sm:hidden">Next</span>
        <ChevronRight size={16} className="sm:inline block" />
      </button>
    </div>
  );
};

interface ScrollingCarouselProps {
  // Title Configuration
  showTitle?: boolean;
  title?: string;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  titleAlignment?: "left" | "center" | "right";

  // Content Configuration
  sections?: CarouselSection[];
  sectionsPerPage?: number;
  autoScrollInterval?: number;

  // Spacing & Layout
  className?: string;
  sectionClassName?: string;
  marginTop?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingX?: string;
  backgroundColor?: string;

  // Card Styling
  cardBorderRadius?: string;

  // Link styling
  showLinkIcon?: boolean;
  linkIconColor?: string;
}

const ScrollingCarousel: React.FC<ScrollingCarouselProps> = ({
  // Title props
  showTitle = true,
  title = "Our Activities",
  titleClassName = "",
  titleStyle = {},
  titleAlignment = "center",

  // Content props
  sections,
  sectionsPerPage = 3,
  autoScrollInterval = 4000,

  // Spacing props
  className = "",
  sectionClassName = "",
  marginTop = "",
  marginBottom = "",
  paddingTop = "py-8 md:py-12 lg:py-16",
  paddingBottom = "pb-8 md:pb-12",
  paddingX = "px-4 md:px-6 lg:px-8",
  backgroundColor = "bg-gray-200",

  // Card styling
  cardBorderRadius = "rounded-[15px] md:rounded-[20px]",

  // Link styling
  showLinkIcon = true,
  linkIconColor = "text-blue-600",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndices, setCarouselIndices] = useState<{
    [key: number]: number;
  }>({});
  const [hoveredCarousel, setHoveredCarousel] = useState<number | null>(null);

  const carouselSections = sections || [];
  const totalPages = Math.ceil(carouselSections.length / sectionsPerPage);

  const getCurrentPageSections = () => {
    const startIndex = (currentPage - 1) * sectionsPerPage;
    const endIndex = startIndex + sectionsPerPage;
    return carouselSections.slice(startIndex, endIndex);
  };

  const currentSections = getCurrentPageSections();

  // Initialize carousel indices for current sections
  useEffect(() => {
    const initialIndices: { [key: number]: number } = {};
    currentSections.forEach((_, index) => {
      initialIndices[index] = 0;
    });
    setCarouselIndices(initialIndices);
  }, [currentPage]);

  // Auto-scroll for each carousel - moves by 3 images at a time
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    currentSections.forEach((section, index) => {
      if (hoveredCarousel === index || section.images.length <= 3) return;

      const interval = setInterval(() => {
        setCarouselIndices((prev) => {
          const currentIndex = prev[index] || 0;
          const maxIndex = section.images.length - 3;
          const nextIndex = currentIndex + 3 > maxIndex ? 0 : currentIndex + 3;

          return {
            ...prev,
            [index]: nextIndex,
          };
        });
      }, autoScrollInterval);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [hoveredCarousel, autoScrollInterval, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const titleAlignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[titleAlignment];

  const defaultTitleStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    ...titleStyle,
  };

  const sectionStyles = `
    ${paddingTop} 
    ${paddingBottom} 
    ${marginTop} 
    ${marginBottom} 
    ${backgroundColor} 
    w-full 
    ${sectionClassName}
  `.trim();

  // If no sections, don't render anything
  if (carouselSections.length === 0) {
    return null;
  }

  return (
    <section className={`${sectionStyles} ${className}`}>
      <div className={paddingX}>
        {/* Title */}
        {showTitle && (
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 ${titleAlignmentClass} ${titleClassName}`}
            style={defaultTitleStyle}
          >
            {title}
          </h2>
        )}

        {/* Carousel Sections */}
        <div className="space-y-8 md:space-y-12">
          {currentSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Title */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0D1651] transition-colors mb-2">
                {section.title}
              </h3>
              
              {/* Section Description */}
              {section.description && (
                <p className="text-sm md:text-base text-gray-600 mt-2 mb-4">
                  {section.description}
                </p>
              )}

              {/* Scrolling Carousel */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredCarousel(sectionIndex)}
                onMouseLeave={() => setHoveredCarousel(null)}
              >
                {/* Images Grid - Show 3 at once */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {section.images
                    .slice(
                      carouselIndices[sectionIndex] || 0,
                      (carouselIndices[sectionIndex] || 0) + 3
                    )
                    .map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`relative overflow-hidden ${cardBorderRadius} bg-gray-300 hover:shadow-lg transition-shadow duration-300 aspect-[4/3]`}
                      >
                        {image.imageUrl ? (
                          image.imageUrl.startsWith('data:image') ? (
                            // Use regular img tag for base64 images
                            <img
                              src={image.imageUrl}
                              alt={image.imageAlt}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            // Use Next.js Image for external URLs
                            <Image
                              src={image.imageUrl}
                              alt={image.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* Carousel Indicator Dots */}
                {section.images.length > 3 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({
                      length: Math.ceil(section.images.length / 3),
                    }).map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`
                          h-2 rounded-full transition-all duration-300
                          ${
                            Math.floor(
                              (carouselIndices[sectionIndex] || 0) / 3
                            ) === dotIndex
                              ? "w-8 bg-blue-600"
                              : "w-2 bg-gray-400"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            canGoPrevious={currentPage > 1}
            canGoNext={currentPage < totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>
    </section>
  );
};

export default ScrollingCarousel;