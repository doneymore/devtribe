import React from "react";

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
  borderRadius = "rounded-[30px] md:rounded-[40px]",
  padding = "p-6 md:p-8 lg:p-10 xl:p-12",

  // Container props
  containerClassName = "",
  sectionClassName = "",

  // Text colors
  titleColor = "text-white",
  descriptionColor = "text-white",
}) => {
  return (
    <section
      className={`w-full bg-gray-200 py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 ${sectionClassName}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`${borderRadius} ${padding} ${containerClassName} w-full`}
          style={{ backgroundColor }}
        >
          <div
            className={`flex flex-col ${
              imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center`}
          >
            {/* Image Section */}
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 flex-shrink-0">
              <div className="relative w-full aspect-[3/4] rounded-[20px] md:rounded-[25px] overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content Section */}
            <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col justify-center space-y-4 md:space-y-6">
              {/* Title */}
              <h2
                className={`${titleColor}`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)",
                  lineHeight: "1.2",
                  letterSpacing: "0px",
                  textAlign: "left",
                }}
              >
                {title}
              </h2>

              {/* Description */}
              <p
                className={`${descriptionColor} opacity-95`}
                style={{
                  fontFamily: "Neuton, serif",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.5vw + 0.25rem, 1.5rem)",
                  lineHeight: "1.6",
                  letterSpacing: "0.01em",
                  textTransform: "capitalize",
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

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <WhoWeAreSection />
    </div>
  );
}
