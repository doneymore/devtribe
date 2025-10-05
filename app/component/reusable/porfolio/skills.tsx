"use client";

import React, { useState } from "react";

interface SkillItemProps {
  icon: React.ReactNode;
  label: string;
}

export const SkillItem: React.FC<SkillItemProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-sm">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p
        className="text-center text-4xl text-[#124384] font-light" 
        style={{
          fontFamily: "Gurajada, serif",
        
          lineHeight: "1.3",
          letterSpacing: "0px",
          color: "#1a1a1a",
        }}
      >
        {label}
      </p>
    </div>
  );
};

interface SkillsSectionProps {
  title?: string;
  skills?: Array<{ icon: React.ReactNode; label: string }>;
  className?: string;
}

// Main Skills Content Component (without title - for use in SectionWrapper)
export const SkillsContent: React.FC<Omit<SkillsSectionProps, "title">> = ({
  skills = [
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="#1e3a8a" />
          <path d="M32 12 L40 28 L32 24 L24 28 Z" fill="white" />
          <circle cx="32" cy="36" r="8" fill="white" />
        </svg>
      ),
      label: "Cybersecurity",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="12" y="12" width="40" height="40" rx="4" fill="#1e3a8a" />
          <rect x="20" y="20" width="10" height="10" fill="white" />
          <rect x="34" y="20" width="10" height="10" fill="white" />
          <rect x="20" y="34" width="10" height="10" fill="white" />
          <path d="M34 39 L44 34 L44 44 Z" fill="white" />
        </svg>
      ),
      label: "Teaching",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="24" cy="24" r="10" fill="#1e3a8a" />
          <circle cx="44" cy="24" r="10" fill="#1e3a8a" />
          <path
            d="M16 44 Q24 40 32 44 Q40 40 48 44 L48 52 L16 52 Z"
            fill="#1e3a8a"
          />
        </svg>
      ),
      label: "Communication",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="12" y="16" width="40" height="32" rx="4" fill="#1e3a8a" />
          <path
            d="M20 24 L28 32 L42 20"
            stroke="white"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      ),
      label: "Problem Solving",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="12" y="12" width="40" height="40" rx="4" fill="#f0db4f" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fill="#323330"
            fontSize="28"
            fontWeight="bold"
          >
            JS
          </text>
        </svg>
      ),
      label: "JavaScript",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <rect x="12" y="12" width="40" height="40" fill="#00adef" />
          <path
            d="M28 28 L36 28 L36 36 L28 36 Z M36 28 L44 28 L44 36 L36 36 Z M28 36 L36 36 L36 44 L28 44 Z M36 36 L44 36 L44 44 L36 44 Z"
            fill="white"
          />
        </svg>
      ),
      label: "C#",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="16"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="16"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
            transform="rotate(60 32 32)"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="28"
            ry="16"
            fill="none"
            stroke="#00d9ff"
            strokeWidth="3"
            transform="rotate(120 32 32)"
          />
          <circle cx="32" cy="32" r="6" fill="#00d9ff" />
        </svg>
      ),
      label: "Forensic",
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="#1e3a8a" />
          <circle
            cx="32"
            cy="32"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="32"
            r="12"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx="32" cy="32" r="4" fill="white" />
          <line
            x1="32"
            y1="12"
            x2="32"
            y2="20"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="32"
            y1="44"
            x2="32"
            y2="52"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="32"
            x2="20"
            y2="32"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="44"
            y1="32"
            x2="52"
            y2="32"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      ),
      label: "Incident Response",
    },
  ],
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 16; // 4 rows × 4 columns
  const totalPages = Math.ceil(skills.length / itemsPerPage);

  const visibleSkills = skills.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="py-8"
        style={{
          background: "#F3F0F0",
          borderRadius: "32px",
        }}
      >
        {/* Skills Grid with max width and centered */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleSkills.map((skill, index) => (
              <SkillItem
                key={currentPage * itemsPerPage + index}
                icon={skill.icon}
                label={skill.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
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
  );
};

// Full standalone Skills Section (with title - for standalone use)
export const SkillsSection: React.FC<SkillsSectionProps> = ({
  title = "Skills",
  skills,
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 16; // 4 rows × 4 columns
  const totalPages = Math.ceil((skills?.length || 0) / itemsPerPage);

  const visibleSkills = skills?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="py-10"
        style={{
          background: "#F3F0F0",
          borderRadius: "32px",
        }}
      >
        {/* Content container with max width and centered */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          {/* Skills Title */}
          <h2
            className="mb-10"
            style={{
              fontFamily: "Gurajada, serif",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: "1.1",
              letterSpacing: "0px",
              color: "#1a1a1a",
            }}
          >
            {title}
          </h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleSkills?.map((skill, index) => (
              <SkillItem
                key={currentPage * itemsPerPage + index}
                icon={skill.icon}
                label={skill.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
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
  );
};
