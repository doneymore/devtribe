"use client";

import React from "react";
import Image from "next/image";

interface WhereWeAreHeadedProps {
  // Content Configuration
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;

  // Spacing & Layout
  className?: string;
  sectionClassName?: string;
  marginTop?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingBottom?: string;

  // Text Styling
  titleClassName?: string;
  descriptionClassName?: string;
  titleColor?: string;
  descriptionColor?: string;

  // Image Styling
  imageClassName?: string;
  imageBorderRadius?: string;
}

const WhereWeAreHeaded: React.FC<WhereWeAreHeadedProps> = ({
  // Content props
  title = "Where we are headed",
  description = "Neque Porro Quisquam Est Qui Dolorem Ipsum Quia Dolor Sit Amet, Consectetur, Adipisci Velit..",
  imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  imageAlt = "Business presentation",

  // Spacing props
  className = "",
  sectionClassName = "",
  marginTop = "",
  marginBottom = "",
  paddingTop = "pt-8 md:pt-12 lg:pt-16",
  paddingBottom = "pb-8 md:pb-12 lg:pb-16",

  // Text styling
  titleClassName = "",
  descriptionClassName = "",
  titleColor = "text-[#124384]",
  descriptionColor = "text-[#124384]",

  // Image styling
  imageClassName = "",
  imageBorderRadius = "rounded-[20px]",
}) => {
  return (
    <section className={`bg-gray-200 ${paddingTop} ${paddingBottom} ${marginTop} ${marginBottom} px-4 sm:px-6 lg:px-8 w-full ${sectionClassName} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2
          className={`
            ${titleColor}
            text-center
            mb-3 md:mb-4 lg:mb-6
            ${titleClassName}
          `}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: "1.2",
            letterSpacing: "0px",
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className={`
            ${descriptionColor}
            text-center
            mb-6 md:mb-8 lg:mb-10
            max-w-4xl
            mx-auto
            ${descriptionClassName}
          `}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(16px, 2.5vw, 20px)",
            lineHeight: "1.6",
            letterSpacing: "0px",
          }}
        >
          {description}
        </p>

        {/* Image */}
        <div className={`relative w-full ${imageClassName}`}>
          <div
            className={`relative w-full overflow-hidden ${imageBorderRadius}`}
            style={{
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereWeAreHeaded;