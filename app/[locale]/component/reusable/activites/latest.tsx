"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface PostImage {
  imageUrl: string;
  imageAlt: string;
  link: string;
}

interface CarouselSection {
  title: string;
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

  const defaultSections: CarouselSection[] = [
    {
      title: "Hands-On Training, Real-World Examples",
      link: "/activities/hands-on-training",
      images: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
          imageAlt: "Group training session",
          link: "/activities/training-1",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
          imageAlt: "Classroom learning",
          link: "/activities/training-2",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
          imageAlt: "Professional presentation",
          link: "/activities/training-3",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
          imageAlt: "Team workshop",
          link: "/activities/training-4",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1551836026-d5c55ac5d4c5?w=800&q=80",
          imageAlt: "Learning session",
          link: "/activities/training-5",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
          imageAlt: "Study group",
          link: "/activities/training-6",
        },
      ],
    },
    {
      title: "Build A Career In Cybersecurity",
      link: "/activities/build-career",
      images: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
          imageAlt: "Professional woman",
          link: "/activities/career-1",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
          imageAlt: "Team collaboration",
          link: "/activities/career-2",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
          imageAlt: "Business meeting",
          link: "/activities/career-3",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1581094794322-737c6ddee8b1?w=800&q=80",
          imageAlt: "Career development",
          link: "/activities/career-4",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
          imageAlt: "Professional growth",
          link: "/activities/career-5",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
          imageAlt: "Career path",
          link: "/activities/career-6",
        },
      ],
    },
    {
      title: "Understand Hackers, Stay Ahead Of Them",
      link: "/activities/understand-hackers",
      images: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
          imageAlt: "Security analysis",
          link: "/activities/hacker-1",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
          imageAlt: "Cybersecurity work",
          link: "/activities/hacker-2",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
          imageAlt: "Team meeting",
          link: "/activities/hacker-3",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1563013541-2e0e51d3415c?w=800&q=80",
          imageAlt: "Security monitoring",
          link: "/activities/hacker-4",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
          imageAlt: "Threat analysis",
          link: "/activities/hacker-5",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
          imageAlt: "Security research",
          link: "/activities/hacker-6",
        },
      ],
    },
    {
      title: "Network Security Fundamentals",
      link: "/activities/network-security",
      images: [
        {
          imageUrl:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          imageAlt: "Network security",
          link: "/activities/network-1",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
          imageAlt: "Security protocols",
          link: "/activities/network-2",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
          imageAlt: "Technology innovation",
          link: "/activities/network-3",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
          imageAlt: "Coding work",
          link: "/activities/network-4",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
          imageAlt: "Programming",
          link: "/activities/network-5",
        },
        {
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
          imageAlt: "Web development",
          link: "/activities/network-6",
        },
      ],
    },
  ];

  const carouselSections = sections || defaultSections;
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

  return (
    <section className={`${sectionStyles} ${className}`}>
      <div className={paddingX}>
        {/* Carousel Sections */}
        <div className="space-y-8 md:space-y-12">
          {currentSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Title with Link Icon */}
              {/* <Link
                href={section.link}
                className="inline-flex items-center gap-2 mb-4 md:mb-6 group"
              > */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0D1651] group-hover:text-blue-600 transition-colors">
                {section.title}
              </h3>
              {/* {showLinkIcon && (
                  <ExternalLink
                    className={`w-4 h-4 md:w-5 md:h-5 ${linkIconColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                )} */}
              {/* </Link> */}

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
                      // <Link href={image.link} className="group">
                      <div
                        key={imgIndex}
                        className={`relative overflow-hidden ${cardBorderRadius} bg-gray-300 hover:shadow-lg transition-shadow duration-300 aspect-[4/3]`}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      // </Link>
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
