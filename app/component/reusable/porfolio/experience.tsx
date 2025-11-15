// app/component/reusable/porfolio/experience.tsx
"use client";

import React, { useState } from "react";

interface ExperienceItem {
  experienceId: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

interface ExperienceCardProps {
  item: ExperienceItem;
  onClick: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left w-full"
    >
      <h3
        className="mb-2"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(20px, 4vw, 32px)",
          lineHeight: "1.25",
          letterSpacing: "0px",
          color: "#1a3a5c",
        }}
      >
        {item.title}
      </h3>
      <p
        className="mb-1"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(14px, 2vw, 16px)",
          lineHeight: "1.4",
          color: "#333",
        }}
      >
        {item.company} | {item.location}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(12px, 1.5vw, 14px)",
          lineHeight: "1.4",
          color: "#666",
        }}
      >
        {item.period}
      </p>
    </button>
  );
};

interface ExperienceModalProps {
  item: ExperienceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "#DBE6F5",
          borderRadius: "40px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 lg:p-12">
          <h2
            className="mb-4 pr-12"
            style={{
              fontFamily: "Rowdies, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 5vw, 36px)",
              lineHeight: "1.2",
              letterSpacing: "0px",
              color: "#1a3a5c",
            }}
          >
            {item.title}
          </h2>

          <p
            className="mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(16px, 3vw, 20px)",
              lineHeight: "1.4",
              color: "#333",
            }}
          >
            {item.company}
          </p>

          <p
            className="mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 18px)",
              lineHeight: "1.4",
              color: "#555",
            }}
          >
            {item.location}
          </p>

          <p
            className="mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: "1.4",
              color: "#666",
            }}
          >
            {item.period}
          </p>

          {item.description && item.description.length > 0 && (
            <div className="space-y-4">
              {item.description.map((desc, index) => (
                <div key={index} className="flex gap-3">
                  <span
                    className="flex-shrink-0 mt-2"
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "#1a3a5c",
                      borderRadius: "50%",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 2vw, 16px)",
                      lineHeight: "1.6",
                      color: "#333",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ExperienceSectionProps {
  experiences?: ExperienceItem[];
  title?: string;
  className?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title = "Experience",
  experiences = [],
  className = "",
}) => {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(experiences.length / itemsPerPage);

  const visibleExperiences = experiences.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCardClick = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedExperience(null), 300);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Show loading or empty state
  if (!experiences || experiences.length === 0) {
    return (
      <div
        className={`w-full py-12 ${className}`}
        style={{
          background: "#F3F4F7",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <h2
            className="mb-8 lg:mb-12"
            style={{
              fontFamily: "Rowdies, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 6vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "0px",
              color: "#1a3a5c",
            }}
          >
            {title}
          </h2>
          <p className="text-center text-gray-500">No experiences found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`w-full py-12 ${className}`}
        style={{
          background: "#F3F4F7",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          {/* Section Title */}
          <h2
            className="mb-8 lg:mb-12"
            style={{
              fontFamily: "Rowdies, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 6vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "0px",
              color: "#1a3a5c",
            }}
          >
            {title}
          </h2>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {visibleExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.experienceId || currentPage * itemsPerPage + index}
                item={experience}
                onClick={() => handleCardClick(experience)}
              />
            ))}
          </div>

          {/* Carousel Navigation */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={goToPrevPage}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Previous page"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a3a5c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={goToNextPage}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Next page"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a3a5c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ExperienceModal
        item={selectedExperience}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ExperienceSection;