"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";


interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "outline";
  imageSrc: string | StaticImageData; // Allow Next.js imported images
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  onButtonClick?: () => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonVariant = "primary",
  imageSrc,
  imageAlt,
  imageWidth = 600,
  imageHeight = 400,
  onButtonClick,
  className = "",
}) => {
  const buttonClasses = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950",
    secondary: "bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-700",
    outline:
      "bg-transparent text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white",
  };

  return (
    <section className={`bg-secondary-50 py-16 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content - 40% width on large screens */}
          <div className="w-full lg:w-2/5 text-center lg:text-left order-2 lg:order-1">
            <h1 className="font-gurajada text-4xl md:text-5xl lg:text-6xl font-bold text-shades-azul_text leading-tight mb-4">
              {title}
            </h1>
            <p className="text-2xl md:text-3xl font-orelega text-gray-700 font-normal mb-6">
              {subtitle}
            </p>
            <p className="text-base md:text-lg font-inter text-[#0D0D0D] leading-relaxed mb-8">
              {description}
            </p>
            <button
              onClick={onButtonClick}
              className={`
            ${buttonClasses[buttonVariant]}
            px-8 py-3 rounded-full font-medium text-lg
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-blue-200
            shadow-lg hover:shadow-xl
            transform hover:scale-105 active:scale-95
          `}
            >
              {buttonText}
            </button>
          </div>

          {/* Image Container - 60% width on large screens */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
