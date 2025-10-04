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
        className="flex-1 flex flex-col p-6 sm:p-8 lg:px-16 lg:py-12"
        style={{
          background: "#FFFFFF",
          minHeight: "60vh",
        }}
      >
        {/* About Me Title */}
        <h3
          className="mb-6 lg:mb-8"
          style={{
            fontFamily: "Neuton, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: "1.2",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#000000",
          }}
        >
          About Me
        </h3>

        {/* Content Container with max width and centered */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Left Side - Avatar (40% on large screens) */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-start flex-shrink-0">
              <div
                className="relative"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #E5E5E5",
                }}
              >
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={`${name} avatar`}
                    fill
                    sizes="180px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Avatar</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Content (60% on large screens) */}
            <div className="w-full lg:w-3/5 flex flex-col justify-center">
              <p
                style={{
                  fontFamily: "Neuton, serif",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 2vw, 18px)",
                  lineHeight: "1.6",
                  letterSpacing: "0px",
                  textAlign: "left",
                  color: "#333333",
                }}
              >
                {aboutText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutSectionSec };
