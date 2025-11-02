"use client";

import React from "react";
import Image from "next/image";

interface WhoWeAreProps {
  // Content Configuration
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";

  // Background Color
  backgroundColor?: string;
  
  // Border & Spacing
  borderRadius?: string;
  padding?: string;
  
  // Container Styling
  containerClassName?: string;
  sectionClassName?: string;
  
  // Text Colors
  titleColor?: string;
  descriptionColor?: string;
}

const WhoWeAreSection: React.FC<WhoWeAreProps> = ({
  // Content props
  title = "Who we are",
  description = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure",
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  imageAlt = "Professional portrait",
  imagePosition = "left",
  
  // Styling props
  backgroundColor = "#124384",
  borderRadius = "rounded-[30px]",
  padding = "p-3 md:p-4 lg:p-6",
  
  // Container props
  containerClassName = "",
  sectionClassName = "",
  
  // Text colors
  titleColor = "text-white",
  descriptionColor = "text-white",
}) => {
  return (
    <section className={`w-full bg-gray-200 pt-8 md:pt-12 lg:pt-16 pb-2 md:pb-3 lg:pb-4 px-4 sm:px-6 lg:px-8 ${sectionClassName}`}>
      <div className="max-w-7xl mx-auto">
        <div 
          className={`${borderRadius} ${padding} ${containerClassName} w-full`}
          style={{ backgroundColor }}
        >
          <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-3 md:gap-4 lg:gap-6 items-center`}>
            {/* Image Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative w-full aspect-[3/4] rounded-[15px] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            </div>

            {/* Text Content Section */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
              {/* Title */}
              <h2 
                className={`${titleColor} mb-2 md:mb-3`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  lineHeight: '1',
                  letterSpacing: '0px',
                  textAlign: 'center',
                }}
              >
                {title}
              </h2>

              {/* Description */}
              <p 
                className={`${descriptionColor}`}
                style={{
                  fontFamily: 'Neuton, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(16px, 2.5vw, 24px)',
                  lineHeight: '1.4',
                  letterSpacing: '0px',
                  textTransform: 'capitalize',
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;