import React from "react";
import Image from "next/image";
import { hero1 } from "@/public/assests/image";
import { Button } from "./buttons";

interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
  subtitle1?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title = "",
  subtitle = "",
  description = "",
  subtitle1 = "",
  buttonText = "Login",
  buttonHref = "#",
  imageUrl = "",
  onButtonClick,
  className = "",
}) => {
  return (
    <section className={`bg-secondary-50 py-12 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[500px] gap-8 lg:gap-12">
          {/* Left Content - 40% */}
          <div className="w-full lg:w-2/5 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Title */}

            <div className="space-y-0">
              <h1
                className="text-[#0E508B] leading-none font-inter"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 5vw + 1rem, 6.25rem)", // More granular scaling: 32px to 100px
                  lineHeight: "clamp(2rem, 5vw + 1rem, 6.25rem)",
                  letterSpacing: "0px",
                  textAlign: "left",
                }}
              >
                {title}
              </h1>
              <h1
                className="text-[#0E508B] leading-none font-inter"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 5vw + 1rem, 6.25rem)", // More granular scaling: 32px to 100px
                  lineHeight: "clamp(2rem, 5vw + 1rem, 6.25rem)",
                  letterSpacing: "0px",
                  textAlign: "left",
                }}
              >
                {subtitle}
              </h1>
            </div>
            {/* Subtitle */}
            <p
              className="text-[#6A6868] mb-6 font-lora"
              style={{
                fontWeight: 400,
                fontSize: "clamp(1rem, 3vw, 24px)", // Responsive from 16px to 24px
                // lineHeight: "clamp(1.25rem, 3.125vw, 1.5625rem)", // Responsive from 20px to 25px
                letterSpacing: "0px",
                textAlign: "justify",
              }}
            >
              {subtitle1}
            </p>

            {/* Description */}
            <p
              className="text-[#6A6868] mb-8 font-lora"
              style={{
                fontWeight: 400,
                fontSize: "clamp(1rem, 3vw, 24px)",

                textAlign: "justify",
              }}
            >
              {description}
            </p>
          </div>

          {/* Right Image - 60% */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Image
                src={hero1}
                alt="Secneedle cybersecurity illustration"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
