import React from "react";

interface WhoWeAreProps {
  title?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

const WhoWeAreSection: React.FC<WhoWeAreProps> = ({
  title = "Who we are",
  description,
  imageUrl,
  imageAlt = "Who we are image",
}) => {
  return (
    <section className="bg-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-[#124384] rounded-[30px] p-8 flex flex-col lg:flex-row gap-8 items-center">
        {/* IMAGE (LOGO FROM BASE64) */}
        <div className="w-full lg:w-1/3 flex justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="max-w-[260px] w-full object-contain rounded-xl bg-white p-4"
            />
          ) : (
            <div className="w-[260px] h-[260px] bg-white/20 rounded-xl" />
          )}
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-white text-3xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-white leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
