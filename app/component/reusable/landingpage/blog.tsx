"use client";
import { blog } from "@/public/assests/image";
import React from "react";

interface BlogHeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const BlogHeroSection: React.FC<BlogHeroSectionProps> = ({
  title,
  description,
  buttonText,
  backgroundImage = blog,
  onButtonClick,
  className = "",
}) => {
  return (
    <section
      className={`relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] py-16 lg:py-20 ${className}`}
      style={{
        backgroundImage: `url(${
          typeof backgroundImage === "string"
            ? backgroundImage
            : backgroundImage?.src || backgroundImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Container - No overlay, clean background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-5xl mx-auto">
          {/* Title - Fully Responsive */}
          <h1
            className="font-sans text-white mb-6 md:mb-8 font-normal"
            style={{
              fontSize: "clamp(1.75rem, 5vw + 1rem, 4rem)",
              lineHeight: "1.1",
              letterSpacing: "0.02em",
              textDecoration: "underline",
              textUnderlineOffset: "0.2em",
              textDecorationThickness: "2px",
            }}
          >
            {title}
          </h1>

          {/* Description - Fully Responsive */}
          <p
            className="text-white mb-10 md:mb-12 font-normal max-w-4xl mx-auto px-4"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "clamp(1rem, 2vw + 0.5rem, 2rem)",
              lineHeight: "1.6",
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            {description}
          </p>

          {/* Subscribe Button - Responsive */}
          <button
            onClick={onButtonClick}
            className="
              bg-transparent text-white border-2 border-white 
              px-6 py-3 md:px-8 md:py-4 
              font-medium text-base md:text-lg 
              hover:bg-white hover:text-blue-900 
              transition-all duration-300 ease-in-out 
              focus:outline-none focus:ring-4 focus:ring-white/30 
              transform hover:scale-105 active:scale-95
              min-w-[120px] md:min-w-[150px]
            "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};
