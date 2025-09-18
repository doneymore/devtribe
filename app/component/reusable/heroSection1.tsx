import React from "react";
import Image from "next/image";
import { hero1 } from "@/public/assests/image";
import { Button } from "./buttons";

interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title = "Welcome to",
  subtitle = "Secneedle",
  description = "Secneedle is a carefully organised online directory website for the learning of cyber security. It's an all-in-one niche source for people searching for cyber security products, courses, resources, or any other providers in the cyber security sector.",
  buttonText = "Login",
  buttonHref = "#",
  imageUrl = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
  onButtonClick,
  className = "",
}) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  return (
    <section className={`bg-secondary-50 py-12 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[500px] gap-8 lg:gap-12">
          {/* Left Content - 40% */}
          <div className="w-full lg:w-2/5 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Title */}
            <div className="space-y-2">
              <h1
                className="text-[#0E508B] leading-tight"
                style={{
                  fontFamily: "Impact, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.5rem, 5vw + 1rem, 6.875rem)", // Better mobile scaling
                  lineHeight: "clamp(1.6rem, 5vw + 1rem, 7.1875rem)", // Proportional line height
                  letterSpacing: "0px",
                  textAlign: "left", // Changed from justify for better mobile readability
                }}
              >
                {title}
              </h1>
              <h1
                className="text-[#0E508B] leading-tight"
                style={{
                  fontFamily: "Impact, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 8vw, 6.875rem)",
                  lineHeight: "clamp(2.5rem, 8vw, 7.1875rem)",
                  letterSpacing: "0px",
                  textAlign: "justify",
                }}
              >
                {subtitle}
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-[#6A6868] mb-6"
              style={{
                fontFamily: "Gurajada, serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 4vw, 2rem)", // Responsive from 16px to 32px
                lineHeight: "clamp(1.2rem, 4vw, 1.875rem)", // Responsive from 19.2px to 30px
                letterSpacing: "0px",
                textAlign: "justify",
              }}
            >
              Thank you for stopping by. Nice to have you here.
            </p>

            {/* Description */}
            <p
              className="text-[#6A6868] mb-8"
              style={{
                fontFamily: "Gurajada, serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 4vw, 2rem)", // Responsive description
                lineHeight: "clamp(1.2rem, 4vw, 1.875rem)",
                letterSpacing: "0px",
                textAlign: "justify",
              }}
            >
              {description}
            </p>

            {/* Button */}

            <div className="flex justify-center lg:justify-start">
              <Button
                text={buttonText}
                onClick={onButtonClick}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-nav text-white font-medium text-lg rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          {/* Right Image - 60% */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Image
                src={hero1}
                alt="Secneedle cybersecurity illustration"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
