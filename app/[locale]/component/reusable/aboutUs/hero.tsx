import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  logoSrc?: string;
  quote?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=485&h=441&fit=crop",
  imageAlt = "Professional portrait",
  logoSrc = "/logo.png",
  quote = "Lorem ipsum dolor sit amet...",
}) => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Left Side - Image */}
          <div className="flex-shrink-0 w-full lg:w-[485px] h-auto">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={485}
              height={441}
              className="rounded-lg object-cover shadow-xl w-full h-auto"
              priority
            />
          </div>

          {/* Right Side - Quote */}
          <div className="flex-1 mt-8 lg:mt-0">
            <blockquote
              className="text-[20px] sm:text-[22px] lg:text-[24px] text-blue-900 font-serif leading-[1.6]"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              "{quote}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
