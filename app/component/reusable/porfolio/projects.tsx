"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardData {
  projectId: number;
  title: string;
  description: string;
  imageSrc?: string;
  projectUrl?: string;
}

interface ProjectsCarouselProps {
  projects?: ProjectCardData[];
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects = [] }) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleCards = 4;

  // Default fallback image if no image is provided
  const defaultImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop";

  const handlePrev = (): void => {
    setStartIndex((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = (): void => {
    setStartIndex((prev) => Math.min(prev + 2, projects.length - 2));
  };

  // Show message if no projects
  if (projects.length === 0) {
    return (
      <div className="bg-[#F3F0F0] py-12 rounded-[32px]">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No projects available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F0F0] py-12 rounded-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
        {projects.slice(startIndex, startIndex + visibleCards).map((project) => {
          const hasValidUrl = project.projectUrl !== null && project.projectUrl !== undefined && project.projectUrl.trim() !== '';
          
          return (
            <div
              key={project.projectId}
              className="bg-[#F3F4F7] rounded-[30px] w-full max-w-[593px] h-[600px] flex flex-col justify-between p-6 shadow-md mx-auto"
            >
              {/* Image */}
              <div className="relative w-full h-[300px]">
                <Image
                  src={project.imageSrc || defaultImage}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
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
                  {project.title}
                </h3>
                <p className="text-gray-600 max-w-[500px] mx-auto">
                  {project.description}
                </p>
              </div>

              {/* Button at Bottom */}
              <div className="mt-auto pt-6 text-center">
                {hasValidUrl ? (
                  <Link
                    href={project.projectUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                    View Project
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded-full cursor-not-allowed opacity-50"
                  >
                    No Link Available
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {projects.length > 2 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="text-2xl px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 transition"
            aria-label="Previous projects"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex >= projects.length - 2}
            className="text-2xl px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 transition"
            aria-label="Next projects"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsCarousel;