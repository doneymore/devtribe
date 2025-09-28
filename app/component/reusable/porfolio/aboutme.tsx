import React from "react";
import Image from "next/image";

interface AboutSectionProps {
  name?: string;
  title?: string;
  aboutText?: string; // Make sure this exists
  avatarSrc?: string;
  className?: string;
}

const AboutSectionSec: React.FC<AboutSectionProps> = ({
  name = "Daniel Ben",
  title = "Cybersecurity Professional",
  aboutText = "Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Cubilia Curae; Donec Velit Neque, Auctor Sit Amet Aliquam Vel, Ullamcorper Sit Amet Ligula. Curabitur Non Nulla Sit Amet Nisl Ac Lectus. Nulla Quis Lorem Ut Libero Malesuada Feugiat. Curabitur Aliquet Quam Id Dui Posuere Blandit. Cras Ultricies Ligula Sed Magna Dictum Porta. Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Donec Velit Neque.",
  avatarSrc,
  className = "",
}) => {
  // Default avatar as SVG
  const DefaultAvatar = () => (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{ borderRadius: "40px" }}
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="#4A90E2" />

      {/* Face */}
      <circle cx="100" cy="85" r="35" fill="#F4C2A1" />

      {/* Hair */}
      <path
        d="M65 60 Q100 40 135 60 Q140 70 135 80 Q130 85 120 85 L80 85 Q70 85 65 80 Q60 70 65 60"
        fill="#8B4513"
      />

      {/* Eyes */}
      <circle cx="88" cy="80" r="3" fill="#000" />
      <circle cx="112" cy="80" r="3" fill="#000" />

      {/* Nose */}
      <path d="M100 85 L97 95 L103 95 Z" fill="#E8A882" />

      {/* Mouth */}
      <path
        d="M92 105 Q100 115 108 105"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />

      {/* Body/Shirt */}
      <path d="M70 120 Q100 110 130 120 L140 200 L60 200 Z" fill="#8B0000" />

      {/* Shirt collar */}
      <path
        d="M85 120 Q100 125 115 120 Q110 130 100 135 Q90 130 85 120"
        fill="#DAA520"
      />
    </svg>
  );

  return (
    <div className={`w-full min-h-screen flex flex-col ${className}`}>
      {/* Top Section - 40% */}
      <div
        className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(90deg, #97C3FD 0%, #124384 53.37%, #0D3A74 100%)",
          minHeight: "40vh",
        }}
      >
        <div className="text-center">
          {/* Main Name */}
          <h1
            className="mb-4 sm:mb-6"
            style={{
              fontFamily: "Neuton, serif",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 128px)",
              lineHeight: "100%",
              letterSpacing: "0px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {name}
          </h1>

          {/* Title */}
          <h2
            style={{
              fontFamily: "Neuton, serif",
              fontWeight: 400,
              fontSize: "clamp(20px, 4vw, 40px)",
              lineHeight: "100%",
              letterSpacing: "0px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Bottom Section - 60% */}
      <div
        className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 lg:p-12"
        style={{
          background: "#0D1651",
          minHeight: "60vh",
        }}
      >
        {/* Left Side - Avatar (30% on desktop, full width on mobile) */}
        <div className="w-full lg:w-[20%] flex justify-center lg:justify-start mb-8 lg:mb-0">
          <div
            className="relative"
            style={{
              width: "clamp(250px, 25vw, 329px)",
              height: "clamp(262px, 26vw, 345px)",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#FFFFFF",
              borderRadius: "40px",
              overflow: "hidden",
            }}
          >
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={`${name} avatar`}
                fill
                sizes="(max-width: 768px) 250px, (max-width: 1024px) 25vw, 329px"
                className="object-cover"
                style={{ borderRadius: "38px" }}
                priority
              />
            ) : (
              <DefaultAvatar />
            )}
          </div>
        </div>

        {/* Right Side - Content (70% on desktop, full width on mobile) */}
        <div className="w-full lg:w-[80%] lg:pl-8 xl:pl-12 flex flex-col justify-center">
          {/* About Me Header */}
          <h3
            className="mb-6 lg:mb-8"
            style={{
              fontFamily: "Neuton, serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 6vw, 64px)",
              lineHeight: "100%",
              letterSpacing: "0px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#FFFFFF",
            }}
          >
            About Me
          </h3>

          {/* About Text - Fixed the double paragraph issue */}
          <p
            style={{
              fontFamily: "Neuton, serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 2.5vw, 24px)",
              lineHeight: "40px",
              letterSpacing: "0px",
              textAlign: "center",
              textTransform: "capitalize",
              color: "#FFF  FFF",
            }}
          >
            {aboutText}
          </p>
        </div>
      </div>
    </div>
  );
};

export { AboutSectionSec };
