import React from "react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  description: string;
  linkText: string;
  imageUrl: string;
  imageAlt: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  linkText,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1398px] mx-auto gap-0">
      {/* Left Side - Content */}
      <div className="w-full lg:w-[699px] h-[340px] bg-[#124384] text-white p-8 lg:p-12 flex flex-col justify-center lg:rounded-r-none rounded-t-[30px] lg:rounded-l-[30px] lg:rounded-tl-[30px] lg:rounded-bl-[30px]">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed mb-6 lg:mb-8 opacity-90">
          {description}
        </p>
        <a
          href="#"
          className="text-sm md:text-base font-medium hover:underline inline-block"
        >
          {linkText}
        </a>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-[699px] h-[340px] relative overflow-hidden rounded-b-[30px] lg:rounded-l-none lg:rounded-r-[30px] lg:rounded-tr-[30px] lg:rounded-br-[30px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 699px"
        />
      </div>
    </div>
  );
};

export const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      title: "Why Learn Cybersecurity?",
      description:
        "Lorem Ipsum Is Simply Dummy Text. Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Gallery Of Type And Scrambled It To Make A Type Specimen Book.",
      linkText: "To read",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      imageAlt: "Cybersecurity professionals collaborating",
    },
    // Add more activities as needed
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-100">
      {/* Title */}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl text-center mb-12 md:mb-16 lg:mb-20 capitalize leading-none"
        style={{
          fontFamily: "Times New Roman, serif",
          fontWeight: 400,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          letterSpacing: "0px",
        }}
      >
        Our Activities
      </h2>

      {/* Activity Cards */}
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            linkText={activity.linkText}
            imageUrl={activity.imageUrl}
            imageAlt={activity.imageAlt}
          />
        ))}
      </div>
    </section>
  );
};
