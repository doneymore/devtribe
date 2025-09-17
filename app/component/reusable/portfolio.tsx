"use client";
import { profile } from "@/public/assests/image";
import Image from "next/image";
import React from "react";

interface AboutSectionProps {
  greeting?: string;
  name: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc?: string;
  imageAlt?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  greeting = "Hi",
  name,
  title,
  description,
  buttonText,
  imageSrc,
  imageAlt = "Profile picture",
  onButtonClick,
  className = "",
}) => {
  return (
    <section className={`bg-secondary-50 py-16 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Image - 40% width on large screens */}
          <div className="w-full lg:w-2/5 order-1 lg:order-1">
            <div className="relative flex justify-center lg:justify-start">
              <Image
                src={profile}
                alt={imageAlt}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto object-cover rounded-lg "
              />
            </div>
          </div>

          {/* Right Content - 60% width on large screens */}
          <div className="w-full lg:w-3/5 order-2 lg:order-2 text-center lg:text-left leading-tight">
            {/* Greeting */}
            <h2 className="font-gurajada text-5xl sm:text-4xl lg:text-6xl font-semibold text-shades-azul_text mb-2">
              {greeting}
            </h2>

            {/* Name */}
            <h3 className="font-gurajada tracking-normal text-5xl sm:text-4xl lg:text-6xl font-semibold text-[#091248] mb-4">
              I'm {name}
            </h3>

            {/* Title */}
            <h4 className="font-gurajada text-xl sm:text-2xl lg:text-6xl font-semibold text-[#091248] mb-6">
              {title}
            </h4>

            {/* Description */}
            <p className="text-base md:text-lg font-inter text-[#0D0D0D] leading-relaxed mb-8">
              {description}
            </p>

            {/* Button */}
            <button
              onClick={onButtonClick}
              className="bg-blue-900 text-white px-8 py-3 rounded-full font-medium text-base hover:bg-blue-800 active:bg-blue-950 transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
