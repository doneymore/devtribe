"use client";
import { explore } from "@/public/assests/image";
import Image from "next/image";
import React from "react";

interface KnowledgeJourneySectionProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const KnowledgeJourneySection: React.FC<
  KnowledgeJourneySectionProps
> = ({
  title,
  description,
  buttonText,
  imageSrc,
  imageAlt = "Laptop displaying content",
  onButtonClick,
  className = "",
}) => {
  return (
    <section className={`bg-secondary-50 py-16 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content - 60% width */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1 text-center lg:text-left">
            {/* Title with exact specifications */}
            <h1
              className="font-gurajada text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-normal text-blue-900 capitalize mb-6"
              style={{
                fontSize: "clamp(2rem, 8vw, 96px)",
                lineHeight: "0.9375", // 90px/96px = 0.9375
                letterSpacing: "0px",
              }}
            >
              {title}
            </h1>

            {/* Description with exact specifications */}
            <p
              className="font-gurajada text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#6A6868]  leading-tight mb-10"
              style={{
                fontSize: "clamp(1rem, 3vw, 32px)",
                lineHeight: "0.9375", // 30px/32px = 0.9375
                letterSpacing: "0px",
              }}
            >
              {description}
            </p>

            {/* Pill Button */}
            <button
              onClick={onButtonClick}
              className="bg-blue-900 text-white px-8 py-3 rounded-full font-light text-base hover:bg-blue-800 active:bg-blue-950 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {buttonText}
            </button>
          </div>

          {/* Right Image - 40% width */}
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src={explore}
                alt={imageAlt}
                className="w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-auto"
                style={{
                  width: "clamp(300px, 40vw, 795px)",
                  height: "clamp(235px, 31vw, 626px)",
                  borderRadius: "clamp(120px, 15vw, 276px)",
                  opacity: 1,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
