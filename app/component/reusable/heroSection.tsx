"use client";
import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "outline";
  imageSrc: string | any; // Allow Next.js imported images
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
    <section className={`bg-gray-100 py-16 lg:py-20 ${className}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 ">
            <h1 className=" font-gurajada text-7xl tracking-wide md:text-5xl lg:text-6xl font-bold text-shades-azul_text leading-tight mb-4">
              {title}
            </h1>
            <p className="text-[48px]  font-orelega md:text-2xl text-gray-700 font-[400] mb-8">
              {subtitle}
            </p>
            <p className="text-[15px] font-inter md:text-lg text-[#0D0D0D] leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
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

          {/* Right Image */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="w-full h-auto max-w-lg mx-auto lg:max-w-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
