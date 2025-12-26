// Section wrapper component for reusable sections
interface SectionWrapperProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  children,
  className = "",
}) => {
  return (
    <section id={id} className={`min-h-screen ${className}`}>
      {/* Header with gray background */}
      <div
        className="py-8 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-black"
            style={{
              fontFamily: "Gurajada, serif",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "30px",
              letterSpacing: "0px",
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white">
        {children ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="text-gray-600 text-lg">
              {title} component content will be rendered here
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { SectionWrapper };
