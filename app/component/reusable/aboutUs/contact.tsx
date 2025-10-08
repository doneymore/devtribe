interface SectionContent {
  heading: string;
  content: string;
}

interface AboutSectionProps {
  title?: string;
  mainText?: string;
  sections?: SectionContent[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title = "About Us",
  mainText = "",
  sections = [],
}) => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 mb-8 sm:mb-12"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h2>

        {/* Main Text */}
        {mainText && (
          <div
            className="text-base sm:text-lg leading-relaxed text-gray-800 mb-8 sm:mb-12"
            style={{
              fontFamily: "Georgia, serif",
              lineHeight: "1.8em",
            }}
          >
            {mainText}
          </div>
        )}

        {/* Sections */}
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {section.heading}
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed text-gray-800"
                style={{
                  fontFamily: "Georgia, serif",
                  lineHeight: "1.8em",
                }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};