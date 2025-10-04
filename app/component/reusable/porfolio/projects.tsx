"use client";
import { blog } from "@/public/assests/image";
import Image from "next/image";
import { useState } from "react";

interface CardData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description: "Cybersecurity interface and concepts.",
    imageSrc: `${blog.src}`,
  },
  {
    id: 2,
    title: "Types of Cyber Security Courses",
    description:
      "SOC Analyst, Ethical Hacking, InfoSec, Forensics, Cloud, Network, Application Security.",
    imageSrc: "/images/course-list.jpg",
  },
  {
    id: 3,
    title: "Cybersecurity Training",
    description: "Explore Indeed’s breakdown of training essentials.",
    imageSrc: "/images/training-include.jpg",
  },
  {
    id: 4,
    title: "Top Cyber Security Course",
    description: "With job guarantee and hands-on learning.",
    imageSrc: "/images/job-guarantee.jpg",
  },
];

const ProjectsCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleCards = 4;

  const handlePrev = (): void => {
    setStartIndex((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = (): void => {
    setStartIndex((prev) => Math.min(prev + 2, cardData.length - 2));
  };

  return (
    <div className="bg-[#F3F0F0] py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
        {cardData.slice(startIndex, startIndex + visibleCards).map((card) => (
          <div
            key={card.id}
            className="bg-[#F3F4F7] rounded-[30px] w-full max-w-[593px] h-[600px] flex flex-col justify-between p-6 shadow-md mx-auto"
          >
            {/* Image */}
            <div className="relative w-full h-[300px]">
              <Image
                src={card.imageSrc}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>

            {/* Title and Description */}
            <div className="mt-6 text-center">
              <h3
                className="capitalize text-[#000] mb-2"
                style={{
                  fontFamily: "Neuton, serif",
                  fontWeight: 300,
                  fontSize: "50px",
                  lineHeight: "60px",
                  letterSpacing: "0px",
                  textAlign: "center",
                }}
              >
                {card.title}
              </h3>
              <p className="text-gray-600 max-w-[500px] mx-auto">
                {card.description}
              </p>
            </div>

            {/* Button at Bottom */}
            <div className="mt-auto pt-6 text-center">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="text-2xl px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex >= cardData.length - 2}
          className="text-2xl px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
